SHELL := /bin/sh

.PHONY: help setup bootstrap install check check-strict fmt-check lint test test-run test-watch build build-custom-elements build-worker dev dev-worker deploy-worker preview preview-custom-elements arch-check arch-baseline

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
	@echo "  make build-custom-elements - build custom elements bundle"
	@echo "  make build-worker  - build assets for Cloudflare Worker"
	@echo "  make dev           - start dev server"
	@echo "  make dev-worker    - build and run Wrangler local dev"
	@echo "  make deploy-worker - build and deploy to Cloudflare Worker"
	@echo "  make preview       - preview production build"
	@echo "  make preview-custom-elements - open custom elements preview page"
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

build-custom-elements:
	vp run build:custom-elements

build-worker:
	vp run build:worker

dev:
	vp dev

dev-worker:
	vp run dev:worker

deploy-worker:
	vp run deploy:worker

preview:
	vp preview

preview-custom-elements:
	vp run preview:custom-elements

arch-check:
	vp run arch:check

arch-baseline:
	vp run arch:baseline
