const express = require("express");
const dataRoute = express.Router();
const dataArray = require("../models/data");

dataRoute.use((req, res, next) => {
    console.log(`Trigger 2: .use within data controller`);
    next();
});

//GET all
dataRoute.get("/", (req, res) => {
    res.json(dataArray);
});
//GET :/index
dataRoute.get("/:index", (req, res) => {
    const { index } = req.params;
     if (dataArray[index]) {
         res.send(dataArray[index]);
     }else {
         res.redirect("/");
     }
});

//POST
dataRoute.post("/",(req,res) => {
    dataArray.push(req.body);
    res.json(dataArray[dataArray.length-1]);
});

//DELETE /:index
dataRoute.delete("/:index", (req, res) => {
    //
});

//PUT

module.exports = dataRoute;