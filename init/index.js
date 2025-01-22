const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listings.js");

main()
  .then((res) => {
    console.log("Connection Success!!!!");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(
    "mongodb+srv://saqibimtiaz616:Qureshi1@cluster0.pfp8d.mongodb.net/wanderlush"
  );
}

const init = async () => {
  await Listing.deleteMany({});
  console.log("Deleted");
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "6789dae31909dec0e4a4cd0f",
  }));
  await Listing.insertMany(initData.data);
  console.log("Data initialized");
};
init();
