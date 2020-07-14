const axios = require("axios");
const cheerio = require("cheerio");

const { userAgent } = require("../config/key");

module.exports = async function getPriceAndName(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent": userAgent,
      },
    });
    const html = response.data;
    const $ = cheerio.load(html);

    let name = $("#productTitle").text();
    name = name.replace(/(\n)/gm, "");

    let price =
      $("#priceblock_dealprice").text() ||
      $("#priceblock_saleprice").text() ||
      $("#priceblock_ourprice").text();
    price = parseFloat(price.slice(1).replace(",", ""));
    return { name, price };
  } catch (error) {
    return error;
  }
};
