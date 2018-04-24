'use strict';
const express = require('express');


const app = express();
app.enable('trust proxy');

app.use(express.json({
  type: '*/json'
}));
app.use(require('./routes'));


app.get('/', (req, res) => {
  res.send('HELLO WORLD');
});


app.use(function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
});
app.use(function errorHandler (err, req, res, next) {
  res.status(500)
  res.send(`ERROR: ${err}`);
})




const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`);
  console.log('Press Ctrl+C to quit.');
})
