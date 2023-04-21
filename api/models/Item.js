const mongoose = require("mongoose");

const itemDataSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    quantity: Number,
    description: String,
  },
  { collection: "item_data", versionKey: false }
);

const ItemData = mongoose.model("ItemData", itemDataSchema, "item_data");
module.exports = ItemData;
