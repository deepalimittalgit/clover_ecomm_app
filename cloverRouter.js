const express = require('express');
const router = express.Router();
const Clover = require("clover-ecomm-sdk");

require('dotenv').config();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const API_KEY = process.env.API_KEY;
const ENVIRONMENT = process.env.ENVIRONMENT;

console.log(API_KEY + "ACCESSTOKEN-" + ACCESS_TOKEN);
const cloverInst = new Clover(ACCESS_TOKEN, {
    environment: ENVIRONMENT,
});

// define the routes
router.post("/createToken", (req, res) => {
    try {
        console.log("card = ", req.body.card);
        console.log("apiKey = ", API_KEY);
        cloverInst.tokens.create({
            card: req.body.card,
            'apiKey': API_KEY,
        }).then((tokenObj) => {
            res.send(tokenObj);
        }).catch(err => {
            debugger;
            console.log('Getting error type in Token Test - ', err);
        });
    } catch (err) {
        res.send(err);
    }
});

router.post("/createCharge", (req, res) => {
    try {
        cloverInst.charges.create({
            source: req.body.source,
            amount: 2500,
            currency: 'usd',
            capture: 'true',
        }).then((chargeResponse) => {
            res.send(chargeResponse);
        }).catch(err => {
            debugger;
            console.log('Getting error in Charge API - ', err);
        });
    } catch (err) {
        res.send(err);
    }
});

router.post("/createCustomer", (req, res) => {
    try {
        cloverInst.customers.create({
            source: req.body.source,
            email: req.body.email,
        }).then((customerObj) => {
            res.send(customerObj);
        }).catch(err => {
            console.log('Getting error in Customer Creation - ', err);
        });
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;
