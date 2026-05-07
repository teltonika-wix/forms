import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = process.cwd();
const configPath = path.join(repoRoot, "architecture.config.json");

if (!fs.existsSync(configPath)) {
  console.error("Missing architecture.config.json");
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const baselinePath = path.join(repoRoot, config.baselineFile);
const srcRoot = path.join(repoRoot, config.sourceRoot);

const args = new Set(process.argv.slice(2));
const shouldUpdateBaseline = args.has("--update-baseline");
const shouldFailOnResolved = args.has("--fail-on-resolved");

const sourceFiles = [];
collectFiles(srcRoot, sourceFiles);

const violations = [];

for (const filePath of sourceFiles) {
  const content = fs.readFileSync(filePath, "utf8");
  const imports = extractImports(content);
  const relativeFile = toRepoPath(filePath);

  for (const rule of config.rules) {
    if (rule.type !== "restricted-import-prefix") {
      continue;
    }

    if (!startsWithAny(relativeFile, rule.appliesToPrefixes)) {
      continue;
    }

    if (startsWithAny(relativeFile, rule.excludePrefixes || [])) {
      continue;
    }

    for (const imported of imports) {
      if (!startsWithAny(imported.value, rule.forbiddenImportPrefixes)) {
        continue;
      }

      if (startsWithAny(imported.value, rule.allowedImportPrefixes || [])) {
        continue;
      }

      const key = `${rule.id}|${relativeFile}:${imported.line}|${imported.value}`;
      violations.push({
        key,
        ruleId: rule.id,
        file: relativeFile,
        line: imported.line,
        value: imported.value,
        message: rule.message,
      });
    }
  }
}

violations.sort((a, b) => a.key.localeCompare(b.key));

if (shouldUpdateBaseline) {
  const serialized = `${violations.map((item) => item.key).join("\n")}\n`;
  fs.writeFileSync(baselinePath, serialized);
  console.log(`Updated architecture baseline: ${config.baselineFile}`);
  console.log(`Stored violations: ${violations.length}`);
  process.exit(0);
}

if (!fs.existsSync(baselinePath)) {
  console.error(`Missing baseline file: ${config.baselineFile}`);
  console.error("Run: vp run arch:baseline");
  process.exit(1);
}

const baseline = new Set(
  fs
    .readFileSync(baselinePath, "utf8")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#")),
);

const current = new Set(violations.map((item) => item.key));
const newViolations = violations.filter((item) => !baseline.has(item.key));
const resolvedViolations = [...baseline].filter((item) => !current.has(item));

if (newViolations.length > 0) {
  console.error("Architecture check failed: new violations detected.");
  for (const item of newViolations) {
    console.error(
      `- [${item.ruleId}] ${item.file}:${item.line} imports "${item.value}" (${item.message})`,
    );
  }
  console.error("\nIf this is intentional, review and run: vp run arch:baseline");
  process.exit(1);
}

if (resolvedViolations.length > 0) {
  console.log(`Resolved baseline violations: ${resolvedViolations.length}`);
  if (shouldFailOnResolved) {
    console.error(
      "Baseline is stale. Run `vp run arch:baseline` to keep it in sync.",
    );
    process.exit(1);
  }
}

console.log("Architecture check passed (no new violations).");
console.log(`Tracked baseline violations: ${baseline.size}`);

function collectFiles(dirPath, files) {
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      if (
        entry.name === "node_modules" ||
        entry.name === "dist" ||
        entry.name === ".git"
      ) {
        continue;
      }
      collectFiles(fullPath, files);
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    if (
      fullPath.endsWith(".ts") ||
      fullPath.endsWith(".tsx") ||
      fullPath.endsWith(".js") ||
      fullPath.endsWith(".jsx") ||
      fullPath.endsWith(".vue")
    ) {
      files.push(fullPath);
    }
  }
}

function extractImports(content) {
  const matches = [];
  const patterns = [
    /import[\s\S]*?\sfrom\s*["']([^"']+)["']/g,
    /export[\s\S]*?\sfrom\s*["']([^"']+)["']/g,
    /import\(\s*["']([^"']+)["']\s*\)/g,
  ];

  for (const pattern of patterns) {
    for (const match of content.matchAll(pattern)) {
      const value = match[1];
      const index = match.index ?? 0;
      const line = content.slice(0, index).split("\n").length;
      matches.push({ value, line });
    }
  }

  return matches;
}

function startsWithAny(value, prefixes) {
  return prefixes.some((prefix) => value.startsWith(prefix));
}

function toRepoPath(absolutePath) {
  return path.relative(repoRoot, absolutePath).replaceAll("\\", "/");
}
