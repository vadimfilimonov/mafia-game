.PHONY: help install start build lint deploy

help:
	@echo "Available commands:"
	@echo "  make install - Install dependencies"
	@echo "  make start  - Run development server"
	@echo "  make build  - Build production bundle"
	@echo "  make lint   - Run ESLint"
	@echo "  make deploy - Build and deploy to GitHub Pages"

install:
	npm install

start:
	npm run dev

build:
	npm run build

lint:
	npx stylelint '**/*.css' --fix
	npx eslint . --fix

deploy:
	DEPLOY_TARGET=gh-pages npx vite build
	npx gh-pages -d dist
	DEPLOY_TARGET=surge npx vite build
	cp dist/index.html dist/200.html
	npx surge ./dist mafia-game.surge.sh
