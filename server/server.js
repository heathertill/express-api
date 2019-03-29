const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes')

let app = express();


app.use(cors());
app.use(express.json());  //parses json content posted to api. Can use this content like a js object
app.use(express.static('client'));
app.use('/api', apiRouter);  //register routes -- all routes will be prefixed with /api





app.listen(3000, () => console.log('Listening on 3000!'))