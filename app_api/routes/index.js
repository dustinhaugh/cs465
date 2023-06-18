require('dotenv').config();

// const JWT_SECRET = process.env.JWT_SECRET;
const express = require('express');
const router = express.Router();

// this is an updated form of jwt because it version 7 or above
const { expressjwt: jwt } = require("express-jwt");

const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256']
});

const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');

router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);
    
router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(auth, tripsController.tripsAddTrip);  // create a single trip

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindCode)
    .put(auth, tripsController.tripsUpdateTrip);  // update a trip

module.exports = router;





