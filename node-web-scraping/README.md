# Node Web Scraping

This project shows how to scrape data from a website, store these data retrieved in the database then create and endpoint to expose them to the world.

## Prerequisites
- Node.js 10+
- Yarn or NPM

## Installation
- Install dependencies
```bash
yarn install
```

- Create application configuration
```bash
cp .env.example .env
nano .env
```

- Scrape programming languages from Wikipedia page
```bash
yarn scrape
```

- Start Application
```bash
yarn start
```
Browse `http://localhost:4500/languages` to view languages retrieved by the scraper.

The application will be launched by [Nodemon](https://nodemon.com). It will restart automatically on file change
