// controllers/gameController.js
const gameModel = require("../models/gameModel");

const getGames = (req, res) => {
    const games = gameModel.getAllGames();
    res.json(games);
};

const getGameById = (req, res) => {
    const gameId = parseInt(req.params.id);
    const game = gameModel.getGameById(gameId);
    if (game) {
        res.json(game);
    } else {
        res.status(404).json({ message: "Game not found" });
    }
};

const createGame = (req, res) => {
    const { name } = req.body;
    const newGame = gameModel.createGame(name);
    res.status(201).json(newGame);
};

const updateGame = (req, res) => {
    const gameId = parseInt(req.params.id);
    const { name } = req.body;

    const updatedGame = gameModel.updateGame(gameId, name);
    if (updatedGame) {
        res.json(updatedGame);
    } else {
        res.status(404).json({ message: "Game not found" });
    }
};

const deleteGame = (req, res) => {
    const gameId = parseInt(req.params.id);

    const deletedGame = gameModel.deleteGame(gameId);
    if (deletedGame) {
        res.json({ message: "Game deleted successfully", deletedGame });
    } else {
        res.status(404).json({ message: "Game not found" });
    }
};

module.exports = { getGames, getGameById, createGame, updateGame, deleteGame };
