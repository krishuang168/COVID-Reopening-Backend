const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const restaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: false,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    tempStoreHours: {
      type: String,
      required: false,
    },
    maps: {
      type: String,
      required: true,
    },
    dineIn: {
      type: Boolean,
      required: true,
      default: false,
    },
    uberEats: {
      type: Boolean,
      required: true,
      default: false,
    },
    toGo: {
      type: Boolean,
      required: true,
      default: true,
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
