const StatAgentModel = require("../models/statAgent.model");

/**********Add**************/
exports.addStatAgent = async (req, res, next) => {
  try {
    const {
      userId,
      agentId,
      matricule,
      name,
      surname,
      pv,
      qp,
      montant,
      dateJour,
      jour,
    } = req.body;
    const newStatsAgent = StatAgentModel({
      userId,
      agentId,
      matricule,
      name,
      surname,
      pv,
      qp,
      montant,
      dateJour,
      jour,
    });
    await newStatsAgent.save();

    res.status(200).json({
      status: true,
      message: " Statistiques Agent ajoutées avec succès",
      statsAgent: newStatsAgent,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Une erreur s'est produite!" });
  }
};

/**********Update*********/
exports.updateStatAgent = async (req, res, next) => {
  const { pv, qp, montant, dateJour, agentId } = req.body;
  try {
    const updatedData = await StatAgentModel.findOneAndUpdate(
      {
        agentId: agentId, // Use req.params.id if agentId is not provided in the body
        dateJour: dateJour,
      },
      {
        pv: pv,
        qp: qp,
        montant: montant,
      },
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).json({
        status: false,
        message: "Stat Agent not found for the provided agentId and dateJour.",
      });
    }

    res.status(200).json({
      status: true,
      message: "Stat Agent updated successfully",
      success: updatedData,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An error occurred while updating Stat Agent",
    });
  }
};

/**********Get stat agent daily**************/
exports.statAgentDaily = async (req, res, next) => {
  try {
    const stats = await StatAgentModel.aggregate([
      {
        $group: {
          _id: {
            userId: "$userId",
            agentId: "$agentId",
            name: "$name",
            surname: "$surname",
            dateJour: "$dateJour",
            jour: "$jour",
          },
          pvJour: { $sum: "$pv" },
          qpJour: { $sum: "$qp" },
          montantJour: { $sum: "$montant" },
          countJour: { $sum: 1 },
        },
      },
    ]).sort({
      jour: -1,
    });
    res.status(200).json({
      statistics: stats,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "An error occurred!" });
  }
};

exports.statAgentDailyForExcel = async (req, res, next) => {
  try {
    const stats = await StatAgentModel.find({}).sort({
      createdAt: 1,
    });
    res.status(200).json({
      statistics: stats,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "An error occurred!" });
  }
};
/**********Get stat agent weekly **************/
exports.statAgentWeekly = async (req, res, next) => {
  try {
    const stats = await StatAgentModel.aggregate([
      {
        $addFields: {
          semaine: {
            $isoWeek: {
              date: "$createdAt",
              timezone: "Europe/Paris",
            },
          },
        },
      },
      {
        $group: {
          _id: {
            userId: "$userId",
            agentId: "$agentId",
            name: "$name",
            surname: "$surname",
            semaine: "$semaine",
          },
          pvSemaine: { $sum: "$pv" },
          qpSemaine: { $sum: "$qp" },
          montantSemaine: { $sum: "$montant" },
          countSemaine: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
    ]);
    res.status(200).json({
      statistics: stats,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "An error occurred!" });
  }
};

/**********Get stat agent by agentId **************/

exports.getStatAgentById = async (req, res, next) => {
  try {
    const { agentId } = req.body; // Assuming agentId is in the URL path
    const statSingleAgent = await StatAgentModel.find({ agentId: agentId });

    if (!statSingleAgent) {
      return res
        .status(404)
        .json({ status: false, message: "Agent not found" });
    }

    res.status(200).json({ status: true, statSingleAgent: statSingleAgent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "An error occurred!" });
  }
};
