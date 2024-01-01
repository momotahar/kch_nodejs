const mongoose = require("mongoose");
// const db = require("../config/db");
const UserModel = require("./user.model");

const { Schema } = mongoose;
const ligneSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: UserModel.modelName,
    },
    ligne: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      // required: true,
      default: null,
    },
    busTram: {
      type: String,
      required: true,
    },
    montee: {
      type: String,
      required: true,
    },
    heureMontee: {
      type: String,
      required: true,
    },
    descente: {
      type: String,
      // required: true,
      default: null,
    },
    heureDescente: {
      type: String,
      // required: true,
      default: null,
    },
    voyageurs: {
      type: Number,
      // required: true,
      default: 0,
    },
    pv: {
      type: Number,
      // required: true,
      default: 0,
    },
    dateJour: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const LigneModel = mongoose.model("lignes", ligneSchema);
module.exports = LigneModel;
