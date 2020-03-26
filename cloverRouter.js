const express = require('express');
const router = express.Router();
const Clover = require("clover-ecomm-sdk");

require('dotenv').config();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const API_KEY = process.env.API_KEY;
const ENVIRONMENT = process.env.ENVIRONMENT;

const cloverInst = new Clover(ACCESS_TOKEN, {
    environment: ENVIRONMENT,
});

// define the routes
router.post("/createToken", (req, res) => {
    try {
        cloverInst.tokens.create({
            card: req.body.card,
            'apiKey': API_KEY,
        }).then((tokenObj) => {
            res.send(tokenObj);
        }).catch(err => {
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
