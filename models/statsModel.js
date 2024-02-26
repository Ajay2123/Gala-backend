// models/statsModel.js
const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "../data/stats.json");

let stats = loadStats();

function loadStats() {
    try {
        const data = fs.readFileSync(dataFilePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        // If the file does not exist or there's an error reading it, return an empty array
        return [];
    }
}

function saveStats() {
    try {
        const data = JSON.stringify(stats, null, 2);
        fs.writeFileSync(dataFilePath, data, "utf-8");
    } catch (error) {
        console.error("Error saving stats:", error.message);
    }
}

class Stats {
    constructor(userId, gameId, score) {
        this.userId = userId;
        this.gameId = gameId;
        this.score = score;
    }
}

const getUserStats = (userId) => stats.filter((stat) => stat.userId === userId);
const getGameStats = (gameId) => stats.filter((stat) => stat.gameId === gameId);
const createStat = (userId, gameId, score) => {
    const newStat = new Stats(userId, gameId, score);
    stats.push(newStat);
    saveStats();
    return newStat;
};

const updateStat = (userId, gameId, score) => {
    const statToUpdate = stats.find(
        (stat) => stat.userId === userId && stat.gameId === gameId
    );
    if (statToUpdate) {
        statToUpdate.score = score;
        saveStats();
    }
    return statToUpdate;
};

const deleteStat = (userId, gameId) => {
    const index = stats.findIndex(
        (stat) => stat.userId === userId && stat.gameId === gameId
    );
    if (index !== -1) {
        const deletedStat = stats.splice(index, 1)[0];
        saveStats();
        return deletedStat;
    }
    return null;
};

module.exports = {
    getUserStats,
    getGameStats,
    createStat,
    updateStat,
    deleteStat,
};
