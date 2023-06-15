const authController = require('../controllers/authentication');
const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require("express-jwt");


// modified from assignment due to version greater than 7.x
// https://stackoverflow.com/questions/63661915/typeerror-expressjwt-is-not-a-function
const auth = jwt({
    secret: "shhhhhhared-secret",
    audience: "http://myapi/protected",
    issuer: "http://issuer",
    algorithms: ["HS256"],
  });




const tripsController = require('../controllers/trips');



router
    .route('/login')
    .post(authController.login)
    
    ;

router
    .route('/register')
    .post(authController.register)
    
    ;

router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(auth, tripsController.tripsAddTrip)
    
    ;

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindCode)
    .put(auth, tripsController.tripsUpdateTrip)
    
    ;

module.exports = router;