//  This pulls in all the different routes and puts them
// in one router and then sends that router back to Server.js

const express = require('express');
const chirpsRouter = require('./chirps');  //chirpsRouter will be equal to whatever was exported in chirps.js
const usersRouter = require('./users')

let router = express.Router();  //creates a new router

router.use('/chirps', chirpsRouter);   //this passes back to the main router
router.use('/users', usersRouter);



module.exports = router;

