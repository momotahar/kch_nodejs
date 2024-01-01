const {
  registration,
  login,
  resetPassword,
  initiatePasswordReset,
  getAllTeams,
  modifyPassword,
} = require("../controllers/user.controller");
const verifyToken = require("../middleware/auth");

const router = require("express").Router();

router.post("/registration", verifyToken, registration);
router.post("/login", login);
router.post("/initiatePasswordReset", initiatePasswordReset);
router.put("/resetPassword", resetPassword);
router.get("/getAllTeams", getAllTeams);
router.post("/modifyPassword", modifyPassword);

module.exports = router;
