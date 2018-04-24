const { Router }  = require('express');

const router = new Router();
module.exports = router;

router.get('/slip', (req, res) => {
  res.send('LIST ALL SLIPS');
});

router.post('/slip', (req, res) => {
  res.send('NEWLY CREATED SLIP');
});

router.get('/slip/:slipid', (req, res) => {
  res.send('GET SPECIFIC SLIP');
});

router.patch('/slip/:slipid', (req, res) => {
  res.send('PATCH SPECIFIC SLIP');
});

router.delete('/slip/:slipid', (req, res) => {
  res.send('DELETE SPECIFIC SLIP');
});
