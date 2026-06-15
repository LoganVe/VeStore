const fs = require("fs");

const USD_RATE = 0.14;

const rawData = JSON.parse(
  fs.readFileSync("./raw-data.json", "utf8")
);

const veArchiveData = rawData.map(item => ({
  id: item.id,

  title: item.title,

  brand: "Carol Christian Poell",

  price: item.price,

  priceUSD: +(item.price * USD_RATE).toFixed(2),

  currency: item.currency || "CNY",

  image: item.pictureUrl
    ? item.pictureUrl.replace("http://", "https://")
    : null,

  seller: item.seller?.name || "Unknown",

  sellerAvatar: item.seller?.avatarUrl || null,

  location: item.city || "Unknown",

  freeShipping: !!item.freeShipping,

  postedAt: item.postedAt,

  url: item.url,

  isAuction: !!item.isAuction,

  hasVideo: !!item.hasVideo
}));

fs.writeFileSync(
  "./data.json",
  JSON.stringify(veArchiveData, null, 2)
);

console.log(
  `Converted ${veArchiveData.length} listings`
);
