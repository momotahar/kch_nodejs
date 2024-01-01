const mongoose = require("mongoose");
// const db = require("../config/db");
const UserModel = require("./user.model");

const { Schema } = mongoose;
const rapportSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: UserModel.modelName,
    },
    dateJour: {
      type: String,
      required: true,
    },
    priseService: {
      type: String,
      required: true,
    },
    depart: {
      type: String,
      required: true,
      // default: null,
    },
    pause: {
      type: String,
      // required: true,
      default: null,
    },
    finService: {
      type: String,
      // required: true,
      default: null,
    },
    observations: {
      type: String,
      // required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const RapportModel = mongoose.model("rapport", rapportSchema);
module.exports = RapportModel;
