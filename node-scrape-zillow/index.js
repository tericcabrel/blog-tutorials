/* const unirest = require('unirest');

async function zillow() {
    const target_url = "https://www.zillow.com/homes/for_sale/";

    const zillow_data = await unirest.get(target_url);

    return zillow_data.body;
}

zillow().then((data) => {
    console.log(data);
});*/

const unirest = require('unirest');
const cheerio = require('cheerio');

async function zillow() {
    const target_url="https://www.zillow.com/homes/for_sale/";
    const zillow_data = await unirest.get(target_url);

    const $ = cheerio.load(zillow_data.body);

    if (zillow_data.statusCode === 200) {
        $('.list-card-info').each(function() {
            const price = $(this).find('.list-card-price').text();
            const address = $(this).find('.list-card-addr').text();
            const bedrooms = $(this).find('.list-card-details li:nth-child(1)').text();

            console.log(price, address, bedrooms);
        });
    }
}

zillow();
