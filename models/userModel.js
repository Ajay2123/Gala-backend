// models/userModel.js
const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../data/users.json");

class User {
    constructor(id, username) {
        this.id = id;
        this.username = username;
    }
}

const readUsersFromFile = () => {
    try {
        const fileData = fs.readFileSync(usersFilePath, "utf8");
        return JSON.parse(fileData);
    } catch (error) {
        return [];
    }
};

const writeUsersToFile = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), "utf8");
};

const getUserById = (id) => {
    const users = readUsersFromFile();
    return users.find((user) => user.id === id);
};

const getAllUsers = () => {
    return readUsersFromFile();
};

const createUser = (username) => {
    const users = readUsersFromFile();
    const id = users.length + 1;
    const newUser = new User(id, username);
    users.push(newUser);
    writeUsersToFile(users);
    return newUser;
};

const updateUser = (id, username) => {
    const users = readUsersFromFile();
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
        users[index].username = username;
        writeUsersToFile(users);
        return users[index];
    }
    return null;
};

const deleteUser = (id) => {
    const users = readUsersFromFile();
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
        const deletedUser = users.splice(index, 1)[0];
        writeUsersToFile(users);
        return deletedUser;
    }
    return null;
};

module.exports = {
    getUserById,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
};
