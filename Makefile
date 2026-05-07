SHELL := /bin/sh

.PHONY: help setup install check test test-run test-watch build dev preview arch-check arch-baseline

help:
	@echo "Available targets:"
	@echo "  make setup         - install deps and run baseline checks"
	@echo "  make install       - install deps"
	@echo "  make check         - format/lint/type-check"
	@echo "  make test          - run tests"
	@echo "  make test-run      - run tests once"
	@echo "  make test-watch    - run tests in watch mode"
	@echo "  make build         - build project"
	@echo "  make dev           - start dev server"
	@echo "  make preview       - preview production build"
	@echo "  make arch-check    - run architecture checks"
	@echo "  make arch-baseline - update architecture baseline"

setup: install check test
	@echo "Setup completed successfully."

install:
	vp install

check:
	vp check

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
