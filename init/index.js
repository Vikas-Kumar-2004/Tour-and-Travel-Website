const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust3';

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "66ae60a0abac0f3b43e525a7",
    geometry: obj.geometry || { type: "Point", coordinates: [0, 0] }
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
