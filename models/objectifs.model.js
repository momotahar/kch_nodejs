const mongoose = require("mongoose");

const { Schema } = mongoose;

const objectifsSchema = new Schema(
  {
    tram: {
      type: Number,
      // required: true,
      default: 0,
    },
    bus483: {
      type: Number,
      // required: true,
      default: 0,
    },
    bus482: {
      type: Number,
      // required: true,
      default: 0,
    },
    bus480: {
      type: Number,
      // required: true,
      default: 0,
    },
    bus282: {
      type: Number,
      // required: true,
      default: 0,
    },
    busLicorne: {
      type: Number,
      // required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const objectifsModel = mongoose.model("objectifs", objectifsSchema);

module.exports = objectifsModel;
