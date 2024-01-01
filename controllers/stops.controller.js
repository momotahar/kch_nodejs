const StopsModel = require("../models/stops.model");
exports.getStops = async (req, res, next) => {
  try {
    var stopsData = await StopsModel.find();
    if (stopsData) {
      res.status(200).json({ status: true, success: stopsData });
    }
  } catch (error) {
    res
      .status(400)
      .json({ status: false, message: "Aucun arrêt n'est trouvé " });
  }
};
