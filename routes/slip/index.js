const Slip        = require('../../models/slip');
const { Router }  = require('express');


const router = new Router();
module.exports = router;


function payloadHasId(err, req, res, next) {
  if(req.body.id)
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
    res.status(500).send('Internal Error');
  }
});


router.post('/slip', async function(req, res) {
  const { number } = req.body;

  if( number) {
    let id = await Slip.createSlip({ number });
    res.status(201).json({ id });
  } else {
    res.status(400).send('Bad Request');
  }
});


router.get('/slip/:slipid', async function(req, res) {
  const { slipid } = req.params;

  const slip = await Slip.getSlip({ id: parseInt(slipid) });

  if(slip)
    res.status(200).json(slip);
  else
    res.status(404).send('Not Found');
});


router.patch('/slip/:slipid', payloadHasId, async function(req, res) {
  const { slipid } = req.params;
  const { number, current_boat, arrival_date, departure_history } = req.body;

  const slipId = await Slip.updateSlip({
    id: parseInt(slipid),
    number,
    current_boat,
    arrival_date,
    departure_history
  });

  if ( slipId )
    res.status(202).json({ id: slipId });
  else
    res.status(404).send('Not Found');
});


router.delete('/slip/:slipid', async function(req, res) {
  const { slipid } = req.params;
  try {
    await Slip.deleteSlip({ id: parseInt(slipid) })
    res.status(204).send();
  } catch (error) {
    res.status(404).send('Not Found');
  }
});
