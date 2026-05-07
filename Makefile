SHELL := /bin/sh

.PHONY: help setup bootstrap install check check-strict fmt-check lint test test-run test-watch build dev preview arch-check arch-baseline

help:
	@echo "Available targets:"
	@echo "  make setup         - run stable project checks"
	@echo "  make bootstrap     - install deps then run setup"
	@echo "  make install       - install deps"
	@echo "  make check         - stable checks (format + tests)"
	@echo "  make check-strict  - full Vite+ check (fmt + lint + type-check)"
	@echo "  make fmt-check     - formatting check"
	@echo "  make lint          - lint only"
	@echo "  make test          - run tests"
	@echo "  make test-run      - run tests once"
	@echo "  make test-watch    - run tests in watch mode"
	@echo "  make build         - build project"
	@echo "  make dev           - start dev server"
	@echo "  make preview       - preview production build"
	@echo "  make arch-check    - run architecture checks"
	@echo "  make arch-baseline - update architecture baseline"

setup: check
	@echo "Setup completed successfully."

bootstrap: install setup

install:
	CI=true vp install

check:
	$(MAKE) fmt-check
	$(MAKE) test-run

check-strict:
	vp check
	vp exec tsc --noEmit -p tsconfig.json

fmt-check:
	vp fmt --check

lint:
	vp lint

test:
	vp test

test-run:
	vp test --run

test-watch:
	vp test --watch

build:
	vp run build

dev:
	vp dev

preview:
	vp preview

arch-check:
	vp run arch:check

arch-baseline:
	vp run arch:baseline
