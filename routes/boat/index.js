const { Router }  = require('express');

const router = new Router();
module.exports = router;

router.get('/boat', (req, res) => {
  res.send('LIST ALL BOATS');
});

router.post('/boat', (req, res) => {
  res.send('NEWLY CREATED BOAT');
});

router.get('/boat/:boatid', (req, res) => {
  res.send('GET SPECIFIC BOAT');
});

router.patch('/boat/:boatid', (req, res) => {
  res.send('PATCH SPECIFIC BOAT');
});

router.delete('/boat/:boatid', (req, res) => {
  res.send('DELETE SPECIFIC BOAT');
});
