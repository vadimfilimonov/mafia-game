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
	DEPLOY_TARGET=gh-pages npx vite build
	npx gh-pages -d dist
	DEPLOY_TARGET=surge npx vite build
	cp dist/index.html dist/200.html
	npx surge ./dist mafia-game.surge.sh
