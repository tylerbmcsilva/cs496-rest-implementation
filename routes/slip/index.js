const Slip        = require('../../models/slip');
const { Router }  = require('express');


const router = new Router();
module.exports = router;



function payloadContainsAllKeys(err, req, res, next) {
  const { number, current_boat, arrival_date, departure_history } = req.body;
  if( number && current_boat && arrival_date && departure_history )
    next();
  else
    next(err);
}


router.get('/slip', async function(req, res) {
  try {
    const slips = await Slip.getAllSlips();
    res.json(slips);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Internal Error'
    });
  }
});


router.post('/slip', async function(req, res) {
  const { number } = req.body;

  if( number && await Slip.isUnique({ number }) ) {
    let id = await Slip.createSlip({ number });
    res.status(201).json({ id });
  } else {
    res.status(400).json({
      error: 'Bad Request'
    });
  }
});


router.get('/slip/:slipid', async function(req, res) {
  const { slipid } = req.params;

  const slip = await Slip.getSlip({ id: parseInt(slipid) });

  if(slip)
    res.status(200).json(slip);
  else
    res.status(404).json({
      error: 'Not Found'
    });
});


router.patch('/slip/:slipid', async function(req, res) {
  const { slipid } = req.params;
  const { number, current_boat, arrival_date, departure_history } = req.body;
  let slipId;

  if( number && current_boat && arrival_date && departure_history ) {
    slipId = await Slip.updateSlip({
      id: parseInt(slipid),
      number,
      current_boat,
      arrival_date,
      departure_history
    });
    if ( slipId )
      res.status(202).json({ id: slipId });
    else
      res.status(404).json({
        error: 'Not Found'
      });
  } else
    res.status(400).json({
      error: 'Bad Request'
    });
});


router.delete('/slip/:slipid', async function(req, res) {
  const { slipid } = req.params;
  try {
    await Slip.deleteSlip({ id: parseInt(slipid) })
    res.status(202).json({
      message: 'Accepted'
    });
  } catch (error) {
    res.status(404).json({
      error: 'Not Found'
    });
  }
});
