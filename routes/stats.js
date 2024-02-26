// routes/stats.js
const express = require("express");
const router = express.Router();
const statsController = require("../controllers/statsController");

router.get("/", statsController.getGameStats);
router.get("/:userId", statsController.getUserStats);
router.post("/", statsController.createStat);
router.put("/:id", statsController.updateStat);
router.delete("/:id", statsController.deleteStat);

module.exports = router;
