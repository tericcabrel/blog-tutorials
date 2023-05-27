import dotenv from 'dotenv';
import puppeteer from 'puppeteer-core';

dotenv.config();

(async () => {
  const auth = `${process.env.PROXY_USERNAME}:${process.env.PROXY_PASSWORD}`;
  const browserURL = `wss://${auth}@${process.env.PROXY_HOST}:${process.env.PROXY_PORT}`;

  let browser;

  try {
    browser = await puppeteer.connect({ browserWSEndpoint: browserURL });
    const page = await browser.newPage();

    page.setDefaultNavigationTimeout(2 * 60 * 1000);

    await page.goto('https://www.zillow.com/homes/for_sale');

    const html = await page.content();

    console.log(html);
  } catch (e) {
    console.error('run failed', e);
  } finally {
    await browser?.close();
  }
})();
