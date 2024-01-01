const mongoose = require("mongoose");
// const db = require("../config/db");

const { Schema } = mongoose;
const stopsSchema = new Schema(
  {
    tram: { String },
    480: { String },
    482: { String },
    483: { String },
    282: { String },
    licorne: { String },
  },
  { timestamps: true }
);

const stopsModel = mongoose.model("stops", stopsSchema);
module.exports = stopsModel;
