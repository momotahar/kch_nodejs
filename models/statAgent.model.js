const mongoose = require("mongoose");
const AgentModel = require("./agent.model");
const User = require("./user.model");

// Agent Schema
const { Schema } = mongoose;

const StatAgentSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: User.modelName,
    },
    agentId: {
      type: Schema.Types.ObjectId,
      ref: AgentModel.modelName,
    },
    matricule: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },

    pv: { type: Number, default: 0 },
    qp: { type: Number, default: 0 },
    montant: { type: Number, default: 0 },
    dateJour: { type: String, required: true },
    jour: { type: String, required: true },
  },
  { timestamps: true }
);

// Agent model
const StatAgentModel = mongoose.model("statAgent", StatAgentSchema);

module.exports = StatAgentModel;
