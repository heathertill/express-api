// This file handles all of the api routes for the chirps resource

const express = require('express');
const chirpsStore = require('../chirpstore');
let router = express.Router();

router.get('/:id?', (req, res) => {
    let id = req.params.id;

    if (id) {
        res.json(chirpsStore.GetChirp(id)); //sets the right content header
    } else {
        res.send(chirpsStore.GetChirps());
    }
});

router.post('/', (req, res) => {
    chirpsStore.CreateChirp(req.body);
    res.send(chirpsStore.GetChirps());
    // res.sendStatus(200);   **good for real world, not necessary for current purpose
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let chirp = req.body;

    if (id) {
        chirpsStore.UpdateChirp(id, chirp);
        res.send(chirpsStore.GetChirps());
    } else {
        chirpsStore.CreateChirp(req.body);
        res.send(chirpsStore.GetChirps());
    }
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    chirpsStore.DeleteChirp(id);
    res.send(chirpsStore.GetChirps());
});

module.exports = router;
