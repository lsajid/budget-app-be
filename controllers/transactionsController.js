const express = require("express");
const transactionsRoute = express.Router();
const transactionsArr = require("../models/data");

transactionsRoute.use((req, res, next) => {
    console.log(`Trigger 2: .use within controller`);
    next();
});

//GET all
transactionsRoute.get("/", (req, res) => {
    res.json(transactionsArr);
});

//GET :/index
transactionsRoute.get("/:index", (req, res) => {
    const { index } = req.params;
     if (transactionsArr[index]) {
         res.send(transactionsArr[index]);
     }else {
        res.status(404).json({ 
            error: "Index not found"
        });
     };
});

//POST
transactionsRoute.post("/",(req,res) => {
    transactionsArr.push(req.body);
    res.json(transactionsArr[transactionsArr.length-1]);
});

//DELETE /:index returns array
transactionsRoute.delete("/:index", (req, res) => {
    const { index } = req.params;

    if(transactionsArr[index]) {
        let remove = transactionsArr.splice(index, 1);
        res.json(remove);
    } else {
        res.status(404).json({error: "Not found"})
    };
});

//PUT /:index
transactionsRoute.put("/:index", (req, res) => {
    const { index } = req.params;
    let { date, name, amount, from } = req.body;
    
    if(!transactionsArr[index]) {
        res.status(404).json({
            error: "Index DNE"
        });
        return;
    }
    if( date && name && amount && from ) {
        transactionsArr[index] = {
            date, name, amount, from
        };
        res.json(transactionsArr[index]);
    } else {
        res.status(422).json({
            error: "Put Request not completed"
        });
    }
});

module.exports = transactionsRoute;