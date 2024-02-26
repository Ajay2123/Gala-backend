// app.js
const express = require("express");
const bodyParser = require("body-parser");
const usersRoutes = require("./routes/users");
const gamesRoutes = require("./routes/games");
const statsRoutes = require("./routes/stats");

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

app.use("/users", usersRoutes);
app.use("/games", gamesRoutes);
app.use("/stats", statsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
