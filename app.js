const express = require("express");
const app = express();
const cors = require("cors")
const transactionsController = require("./controllers/transactionsController.js");

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(`Trigger 1: .use within app.js`);
    next();
});

app.use("/transactions", transactionsController );

app.get("/", (req, res) => {
    res.send(`Budget-App`);
});

app.get("*", (req, res) => {
    res.status(404).json({ error: "Page not found"});
});

module.exports = app;