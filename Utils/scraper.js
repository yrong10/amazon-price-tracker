const getAsin = require("./getAsin");
const getPriceAndName = require("./getPriceAndName");

module.exports = async function getDetails(url) {
  try {
    const asin = getAsin(url);
    const { name, price } = await getPriceAndName(url);

    return { name, url, asin, price };
  } catch (error) {
    return error;
  }
};
