// controllers/userController.js
const userModel = require("../models/userModel");

const getUsers = (req, res) => {
    const users = userModel.getAllUsers();
    console.log("Sending json", users);

    res.json(users);
};

const getUserById = (req, res) => {
    const userId = parseInt(req.params.id);
    const user = userModel.getUserById(userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
};

const createUser = (req, res) => {
    const { username } = req.body;
    const newUser = userModel.createUser(username);
    res.status(201).json(newUser);
};

const updateUser = (req, res) => {
    const userId = parseInt(req.params.id);
    const { username } = req.body;

    const updatedUser = userModel.updateUser(userId, username);
    if (updatedUser) {
        res.json(updatedUser);
    } else {
        res.status(404).json({ message: "User not found" });
    }
};

const deleteUser = (req, res) => {
    const userId = parseInt(req.params.id);

    const deletedUser = userModel.deleteUser(userId);
    if (deletedUser) {
        res.json({ message: "User deleted successfully", deletedUser });
    } else {
        res.status(404).json({ message: "User not found" });
    }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
