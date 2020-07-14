module.exports = getAsin = (url) => {
  let asin = "";
  let index = url.indexOf("/dp/");
  if (index !== -1) {
    const index2 = index + 14;
    asin = url.slice(index + 4, index2);
  } else {
    index = url.indexOf("/gp/");
    if (index !== -1) {
      const index2 = index + 22;
      asin = url.slice(index + 12, index + 22);
    }
  }
  return asin;
};
