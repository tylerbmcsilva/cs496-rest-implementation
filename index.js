'use strict';

const bodyParser  = require('body-parser');
const Datastore   = require('@google-cloud/datastore');
const express     = require('express');


const app = express();
app.enable('trust proxy');
app.use(bodyParser);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`);
  console.log('Press Ctrl+C to quit.');
})
