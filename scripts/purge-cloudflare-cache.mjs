import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const loadEnvFile = (filePath) => {
  if (!existsSync(filePath)) {
    return;
  }

  const lines = readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    if (!key || process.env[key] !== undefined) {
      continue;
    }

    const rawValue = trimmed.slice(separatorIndex + 1).trim();
    const normalizedValue =
      (rawValue.startsWith('"') && rawValue.endsWith('"')) ||
      (rawValue.startsWith("'") && rawValue.endsWith("'"))
        ? rawValue.slice(1, -1)
        : rawValue;
    process.env[key] = normalizedValue;
  }
};

loadEnvFile(resolve(process.cwd(), ".env"));

const zoneId = process.env.CLOUDFLARE_ZONE_ID;
const apiToken = process.env.CLOUDFLARE_API_TOKEN;

if (!zoneId) {
  console.error("Missing required env var: CLOUDFLARE_ZONE_ID");
  process.exit(1);
}

if (!apiToken) {
  console.error("Missing required env var: CLOUDFLARE_API_TOKEN");
  process.exit(1);
}

const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiToken}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ purge_everything: true }),
});

let payload;
try {
  payload = await response.json();
} catch {
  payload = null;
}

if (!response.ok || !payload?.success) {
  const message = payload?.errors
    ?.map((error) => error?.message)
    .filter(Boolean)
    .join("; ");
  console.error(`Failed to purge Cloudflare cache${message ? `: ${message}` : "."}`);
  process.exit(1);
}

console.log("Cloudflare cache purged successfully.");
