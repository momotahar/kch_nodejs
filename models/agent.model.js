const mongoose = require("mongoose");
const UserModel = require("./user.model");

// Agent Schema
const { Schema } = mongoose;

const AgentSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: UserModel.modelName,
    },
    name: { type: String, unique: true, required: true },
    surname: { type: String,  required: true },
    matricule: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

// Agent model
const AgentModel = mongoose.model("agent", AgentSchema);

module.exports = AgentModel;
