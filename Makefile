.PHONY: help start build lint deploy

help:
	@echo "Available commands:"
	@echo "  make start  - Run development server"
	@echo "  make build  - Build production bundle"
	@echo "  make lint   - Run ESLint"
	@echo "  make deploy - Build and deploy to GitHub Pages"

start:
	npm run dev

build:
	npm run build

lint:
	npm run lint

deploy:
	npm run deploy
