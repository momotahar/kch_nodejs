const { cleanCollection } = require("../controllers/cleanCollection.controller");

const router = require("express").Router();

router.delete("/cleanCollection", cleanCollection);
module.exports = router;
