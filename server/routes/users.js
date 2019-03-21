// This file handles all of the api routes for the users resource

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('users')
})



module.exports = router;



