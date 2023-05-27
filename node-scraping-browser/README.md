# Node Typescript Starter

This project contains a minimal starter for Node.js project with Typescript, ESLint and Prettier

## Prerequisites
- Node.js 16+
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
Open the .env file and set the scraping browser credentials

- Scrape the top 50 songs on SoundCloud
```bash
yarn soundcloud
```

- Scrape the homes for sale on Zillow
```bash
yarn zillow
```

The application will be launched by [Nodemon](https://nodemon.com) so it's will restart automatically on file change
