const getPriceAndName = require("./getPriceAndName");
const db = require("../models");

module.exports = async function updatePrice() {
  try {
    let items = await db.Item.find({});
    for (let item of items) {
      const url = item.url;
      const prices = [];
      let { price } = await getPriceAndName(url);
      if (price) {
        item.current = price;
        prices.push(price);
      }
      await item.save();
    }
    return prices;
  } catch (error) {
    return error;
  }
};
