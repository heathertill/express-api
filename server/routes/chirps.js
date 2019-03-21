// This file handles all of the api routes for the chirps resource

const express = require('express');
const chirpsStore = require('../chirpstore')
const fs = require('fs');
let router = express.Router();


router.get('/:id?', (req, res) => {
    let id = req.params.id
    
        
    if (id) {
        res.json(chirpsStore.GetChirp(id));  //sets the right content header
    } else {
        res.send(chirpsStore.GetChirps());
    }
});


router.post('/', (req, res) => {
    chirpsStore.CreateChirp(req.body);
    res.send(chirpsStore.GetChirps());
    res.sendStatus(200)
})

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let chirp = req.body;

   
    if (id) {
        chirpsStore.UpdateChirp(id, chirp);
        res.sendStatus(200);
    } else {
        chirpsStore.CreateChirp(req.body);
        res.sendStatus(200);
    }
})

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    chirpsStore.DeleteChirp(id);
    res.sendStatus(200);
})



module.exports = router;