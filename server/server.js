const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes');
const path = require('path');

const client = path.join(__dirname, '../client');

let app = express();

app.use(express.urlencoded({ extend: false }));  // use with .ajax parses the body content
app.use(express.json());  //use w/ fetch post, parses json content posted to api. Can use this content like a js object
app.use(cors());
app.use(express.static(client));
app.use('/api', apiRouter);  //register routes -- all routes will be prefixed with /api






app.listen(3000, () => console.log('Listening on 3000!'))