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
        res.status(404).json({ 
            error: "Index not found"
        });
     };
});

//POST
dataRoute.post("/",(req,res) => {
    dataArray.push(req.body);
    res.json(dataArray[dataArray.length-1]);
});

//DELETE /:index returns array
dataRoute.delete("/:index", (req, res) => {
    const { index } = req.params;

    if(dataArray[index]) {
        let remove = dataArray.splice(dataArray[index], 1);
        res.json(remove);
    } else {
        res.status(404).json({error: "Not found"})
    };
});

//PUT /:index
dataRoute.put("/:index", (req, res) => {
    const { index } = req.params;
    let { date, name, amount, from } = req.body;
    
    if(!dataArray[index]) {
        res.status(404).json({
            error: "Index DNE"
        });
        return;
    }
    if( date && name && amount && from ) {
        dataArray[index] = {
            date, name, amount, from
        };
        res.json(dataArray[index]);
    } else {
        res.status(422).json({
            error: "Put Request not completed"
        });
    }
});

module.exports = dataRoute;