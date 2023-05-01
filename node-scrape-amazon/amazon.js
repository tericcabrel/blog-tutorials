const cheerio = require('cheerio')
const unirest = require('unirest');

async function amazon(){
    const amazon_url = "https://www.amazon.com/dp/B0BSHF7WHW";
    const head = {
        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
    };
    const data = await unirest.get(amazon_url).headers(head);

    const $ = cheerio.load(data.body);
    const result = {};

    $('h1#title').each((i,el) => {
        result.title = $(el).text().trim();
    });

    $('span.a-price').each((i,el) => {
        result.price = $(el).find('span').first().text();
    });

    return { message: result };
}


amazon().then((data) => {
    console.log(data.message);
});
