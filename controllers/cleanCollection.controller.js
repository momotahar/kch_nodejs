const LigneModel = require("../models/ligne.model");

// Clean collection function
exports.cleanCollection = async (req, res, next) => {
  try {
    // Delete all documents in the collection
    const result = await LigneModel.deleteMany({});
    res.status(200).json({
      status: true,
      message: "Les lignes sont supprimées avec succès",
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Une erreur s'est produite!" });
  }
};
