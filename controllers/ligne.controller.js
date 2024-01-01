const ObjectifsModel = require("../models/objectifs.model");
const LigneModel = require("../models/ligne.model");
const RapportModel = require("../models/rapport.model");

/******** */

exports.addRapport = async (req, res, next) => {
  try {
    const {
      userId,
      dateJour,
      priseService,
      depart,
      pause,
      finService,
      observations,
    } = req.body;

    const newRapport = RapportModel({
      userId,
      dateJour,
      priseService,
      depart,
      pause,
      finService,
      observations,
    });
    await newRapport.save();

    res.status(200).json({
      status: true,
      message: "Rapport ajouté avec succès",
      success: newRapport,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Une erreur s'est produite!" });
  }
};
/***********************/

exports.getRapport = async (req, res, next) => {
  try {
    // Extract userId and dateJour from the query parameters
    const { userId, dateJour } = req.query;

    // Build the filter object based on the provided parameters
    const filter = {};
    if (userId) {
      filter.userId = userId;
    }
    if (dateJour) {
      filter.dateJour = dateJour;
    }

    // Use the filter in the find query
    const rapportData = await RapportModel.find(filter);

    res.status(200).json({ status: true, rapport: rapportData });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Une erreur s'est produite!" });
  }
};
/***********************/
exports.updateRapport = async (req, res, next) => {
  try {
    const updatedData = await RapportModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      status: true,
      message: "Rapport mise à jour avec succès",
      success: updatedData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Une erreur s'est produite!" });
  }
};
/************************/

exports.addObjectifs = async (req, res, next) => {
  try {
    const { tram, bus483, bus482, bus480, bus282, busLicorne } = req.body;

    const newObjectifs = ObjectifsModel({
      tram,
      bus483,
      bus482,
      bus480,
      bus282,
      busLicorne,
    });
    await newObjectifs.save();

    res.status(200).json({
      status: true,
      message: "Objectifs ajoutées avec succès",
      success: newObjectifs,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Une erreur s'est produite!" });
  }
};
/***********************/
exports.getObjectifs = async (req, res, next) => {
  try {
    const objectifsData = await ObjectifsModel.find();

    res.status(200).json({ status: true, objectifs: objectifsData });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Une erreur s'est produite!" });
  }
};
/***********************/
exports.updateObjectifs = async (req, res, next) => {
  try {
    const updatedData = await ObjectifsModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      status: true,
      message: "Objectif mise à jour avec succès",
      success: updatedData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Une erreur s'est produite!" });
  }
};
/************************/
exports.createLigne = async (req, res, next) => {
  try {
    const {
      userId,
      ligne,
      service,
      busTram,
      montee,
      heureMontee,
      descente,
      heureDescente,
      voyageurs,
      pv,
      dateJour,
    } = req.body;

    const newLigne = new LigneModel({
      userId,
      ligne,
      service,
      busTram,
      montee,
      heureMontee,
      descente,
      heureDescente,
      voyageurs,
      pv,
      dateJour,
    });
    await newLigne.save();

    res.status(200).json({
      status: true,
      message: "Une nouvelle ligne est ajoutée avec succès",
      success: newLigne,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Une erreur s'est produite!" });
  }
};
/***********************/
exports.getAllLignes = async (req, res, next) => {
  try {
    const { userId, dateJour } = req.body;
    const lignesData = await LigneModel.find({ userId, dateJour }).sort({
      createdAt: -1,
    });
    res.status(200).json({ status: true, lignes: lignesData });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Une erreur s'est produite!" });
  }
};
/***********************/
exports.fetchLignes = async (req, res, next) => {
  try {
    const lignesData = await LigneModel.find();
    res.status(200).json({ status: true, lignes: lignesData });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Une erreur s'est produite!" });
  }
  /***********************/
};
/***********************/
exports.getSingleLigne = async (req, res, next) => {
  try {
    const { ligneId } = req.body;
    const singleLigne = await LigneModel.findById({ _id: ligneId });
    res.status(200).json({ status: true, singleLigne: singleLigne });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Une erreur s'est produite!" });
  }
};
/***********************/
exports.updateLigne = async (req, res, next) => {
  try {
    const updatedData = await LigneModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      status: true,
      message: "Ligne mise à jour avec succès",
      success: updatedData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Une erreur s'est produite!" });
  }
};
/************************/
exports.deleteLigne = async (req, res, next) => {
  try {
    const result = await LigneModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: true,
      message: "La ligne est supprimée avec succès",
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Une erreur s'est produite!" });
  }
};
/************************/
exports.statAllTeams = async (req, res, next) => {
  try {
    const stat = await LigneModel.aggregate([
      {
        $group: {
          _id: {
            linge: "$ligne",
          },
          pvTotal: { $sum: "$pv" },
          voyageursTotal: { $sum: "$voyageurs" },
          count: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({
      statistiques: stat,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Une erreur s'est produite!" });
  }
};
/************************/
exports.statEachTeamDaily = async (req, res, next) => {
  try {
    const stats = await LigneModel.aggregate([
      {
        $group: {
          _id: {
            userId: "$userId",
            ligne: "$ligne",
            dateJour: "$dateJour",
          },
          pvTotal: { $sum: "$pv" },
          voyageursTotal: { $sum: "$voyageurs" },
          count: { $sum: 1 },
        },
      },
    ]).sort({
      dateJour: -1,
    });

    res.status(200).json({
      statistics: stats,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "An error occurred!" });
  }
};
/************************/
exports.statEachTeamMonthly = async (req, res, next) => {
  try {
    // const { userId, dateJour } = req.body;
    const stats = await LigneModel.aggregate([
      {
        $project: {
          userId: 1,
          ligne: 1,
          dateJour: 1,
          pv: 1,
          voyageurs: 1,
          month: { $month: "$createdAt" }, // Extract the month from dateJour
        },
      },
      {
        $group: {
          _id: {
            userId: "$userId",
            ligne: "$ligne",
            month: "$month", // Group by month
          },
          pvTotal: { $sum: "$pv" },
          voyageursTotal: { $sum: "$voyageurs" },
          count: { $sum: 1 },
        },
      },
    ]).sort({
      "_id.month": -1, // Sort by month in descending order
    });
    res.status(200).json({
      statistics: stats,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "An error occurred!" });
  }
};
/************************/
