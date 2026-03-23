.PHONY: help start build lint

help:
	@echo "Available commands:"
	@echo "  make start  - Run development server"
	@echo "  make build  - Build production bundle"
	@echo "  make lint   - Run ESLint"

start:
	npm run dev

build:
	npm run build

lint:
	npm run lint
