const unirest = require('unirest');
const cheerio = require('cheerio');

async function zillow() {
    const target_url = "https://api.scrapingdog.com/scrape?api_key=xxxxxxxxxxxxxxxx&url=https://www.zillow.com/homes/for_sale/&dynamic=false";
    const zillow_data = await unirest.get(target_url);

    const $ = cheerio.load(zillow_data.body);

    if (zillow_data.statusCode === 200) {
        const housesInfo = [];

        $('ul li.with_constellation').each(function () {
            const price = $(this).find('span[data-test="property-card-price"]').text();
            const address = $(this).find('address[data-test="property-card-addr"]').text();

            const bedrooms = [];
            $(this).find('span[data-test="property-card-price"]')
                .parent().next().children('ul').children('li').each(function () {
                    bedrooms.push($(this).text());
                });

            if (!address) {
                return;
            }

            housesInfo.push({
                address,
                bedrooms: bedrooms.join(' - '),
                price,
            })
        });

        console.table(housesInfo);
   }
}

zillow();
