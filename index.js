'use strict';
const Datastore   = require('@google-cloud/datastore');
const express     = require('express');


const app = express();
app.enable('trust proxy');


app.use(require('./routes'));


app.get('/', (req, res) => {
  res.send('Hello World!');
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`);
  console.log('Press Ctrl+C to quit.');
})
