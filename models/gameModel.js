// models/gameModel.js
const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "../data/games.json");

let games = loadGames();

class Game {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

function loadGames() {
    try {
        const data = fs.readFileSync(dataFilePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        // If the file does not exist or there's an error reading it, return an empty array
        return [];
    }
}

function saveGames() {
    try {
        const data = JSON.stringify(games, null, 2);
        fs.writeFileSync(dataFilePath, data, "utf-8");
    } catch (error) {
        console.error("Error saving games:", error.message);
    }
}

const getGameById = (id) => games.find((game) => game.id === id);
const getAllGames = () => games;
const createGame = (name) => {
    const id = games.length + 1;
    const newGame = new Game(id, name);
    games.push(newGame);
    saveGames();
    return newGame;
};

const updateGame = (id, name) => {
    const game = getGameById(id);
    if (game) {
        game.name = name;
        saveGames();
    }
    return game;
};

const deleteGame = (id) => {
    const index = games.findIndex((game) => game.id === id);
    if (index !== -1) {
        const deletedGame = games.splice(index, 1)[0];
        saveGames();
        return deletedGame;
    }
    return null;
};

module.exports = {
    getGameById,
    getAllGames,
    createGame,
    updateGame,
    deleteGame,
};
