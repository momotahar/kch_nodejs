const {
  addAgent,
  getSingleAgent,
  getAllTeamAgents,
  deleteAgent,
  updateAgent,
} = require("../controllers/agent.controller");
const {
  createLigne,
  fetchLignes,
  getSingleLigne,
  updateLigne,
  deleteLigne,
  statAllTeams,
  statEachTeamDaily,
  statEachTeamMonthly,
  addObjectifs,
  getAllLignes,
  getObjectifs,
  updateObjectifs,
  addRapport,
  getRapport,
  updateRapport,
} = require("../controllers/ligne.controller");
const {
  addStatAgent,
  statAgentDaily,
  statAgentWeekly,
  statAgentDailyForExcel,
  updateStatAgent,
  getStatAgentById,
} = require("../controllers/statAgent.controller");

const router = require("express").Router();

/****************** Ligne **************************/
router.post("/newLigne", createLigne);
router.post("/getAllLignes", getAllLignes);
router.get("/fetchAllLignes", fetchLignes);
router.post("/getSingleLigne", getSingleLigne);
router.put("/updateLigne/:id", updateLigne);
router.delete("/deleteLigne/:id", deleteLigne);
/****************** Objectifs *********************/
router.put("/updateObjectifs/:id", updateObjectifs);
router.get("/getObjectifs", getObjectifs);
router.post("/addObjectifs", addObjectifs);
/****************** Rapport *********************/
router.put("/updateRapport/:id", updateRapport);
router.post("/addRapport", addRapport);
router.get("/getRapport", getRapport);
/****************** Statistics *********************/
router.get("/statAllTeams", statAllTeams);
router.get("/statEachTeamDaily", statEachTeamDaily);
router.get("/statEachTeamMonthly", statEachTeamMonthly);
/****************** Agent *********************/
router.post("/addAgent", addAgent);
router.post("/getSingleAgent", getSingleAgent);
router.post("/getAllTeamAgents", getAllTeamAgents);
router.put("/updateAgent/:id", updateAgent);
router.delete("/deleteAgent/:id", deleteAgent);
/****************** Agent *********************/
router.post("/addStatAgent", addStatAgent);
router.post("/updateStatAgent", updateStatAgent);
router.post("/getStatAgentById", getStatAgentById);
/****************** StatAgent daily ****************/
router.get("/statAgentDaily", statAgentDaily);
router.get("/statAgentDailyForExcel", statAgentDailyForExcel);
/****************** StatAgent weekly ****************/
router.get("/statAgentWeekly", statAgentWeekly);

module.exports = router;
