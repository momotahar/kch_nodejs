const AgentModel = require("../models/agent.model");

/**********Add**************/
exports.addAgent = async (req, res, next) => {
  try {
    const { userId, name, surname, matricule } = req.body;

    const newAgent = AgentModel({
      userId,
      name,
      surname,
      matricule,
    });
    await newAgent.save();

    res.status(200).json({
      status: true,
      message: "Agent ajouté avec succès",
      success: newAgent,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Une erreur s'est produite!" });
  }
};
/**********GetAll*************/
exports.getAllTeamAgents = async (req, res, next) => {
  try {
    const { equipeId } = req.body;
    const allTeamAgents = await AgentModel.find({ userId: equipeId });
    res.status(200).json({ status: true, allTeamAgents: allTeamAgents });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Une erreur s'est produite!" });
  }
};
/**********GetSingle*********/
exports.getSingleAgent = async (req, res, next) => {
  try {
    const { agentId } = req.body;
    const singleAgent = await AgentModel.findById({ _id: agentId });
    res.status(200).json({ status: true, singleAgent: singleAgent });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Une erreur s'est produite!" });
  }
};
/**********Update*********/
exports.updateAgent = async (req, res, next) => {
  try {
    const updatedData = await AgentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      status: true,
      message: "Agent mise à jour avec succès",
      success: updatedData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Une erreur s'est produite!" });
  }
};
/**********Delete*********/
exports.deleteAgent = async (req, res, next) => {
  try {
    const result = await AgentModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: true,
      message: "L'agent est supprimé avec succès",
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Une erreur s'est produite!" });
  }
};
