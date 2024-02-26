// controllers/statsController.js
const statsModel = require("../models/statsModel");

const getUserStats = (req, res) => {
    const userId = parseInt(req.params.userId);
    const userStats = statsModel.getUserStats(userId);
    res.json(userStats);
};

const getGameStats = (req, res) => {
    const gameId = parseInt(req.params.gameId);
    const gameStats = statsModel.getGameStats(gameId);
    res.json(gameStats);
};

const createStat = (req, res) => {
    const { userId, gameId, score } = req.body;
    const newStat = statsModel.createStat(userId, gameId, score);
    res.status(201).json(newStat);
};

const updateStat = (req, res) => {
    const { userId, gameId, score } = req.body;
    const updatedStat = statsModel.updateStat(userId, gameId, score);
    if (updatedStat) {
        res.json(updatedStat);
    } else {
        res.status(404).json({ message: "Stat not found" });
    }
};

const deleteStat = (req, res) => {
    const { userId, gameId } = req.body;

    const deletedStat = statsModel.deleteStat(userId, gameId);
    if (deletedStat) {
        res.json({ message: "Stat deleted successfully", deletedStat });
    } else {
        res.status(404).json({ message: "Stat not found" });
    }
};

module.exports = {
    getUserStats,
    getGameStats,
    createStat,
    updateStat,
    deleteStat,
};
