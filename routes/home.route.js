const { homePage } = require("../controllers/home.controller");
const verifyToken = require("../middleware/auth");

const router = require("express").Router();

router.get("/home", verifyToken, homePage);
module.exports = router;
