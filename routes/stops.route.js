const { getStops } = require("../controllers/stops.controller");

const router = require("express").Router();

router.get("/getStops", getStops);

module.exports = router;
