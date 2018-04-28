const Boat        = require('../../models/boat');
const { Router }  = require('express');
const Slip        = require('../../models/slip');


const router = new Router();
module.exports = router;


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

  try {
    if( number ) {
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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Internal Failure'
    });
  }

});


router.delete('/slip/:slipid', async function(req, res) {
  const { slipid } = req.params;
  try {
    const slip  = await Slip.getSlip({ id: slipid });
    if(!slip) throw Error;

    if (slip.current_boat) {
      const boat = await Boat.getBoat({ id: slip.current_boat });
      if(!boat) throw Error;

      await Boat.depart(boat)
    }

    await Slip.deleteSlip({ id: slipid })
    res.status(202).json({
      message: 'Accepted'
    });
  } catch (error) {
    res.status(404).json({
      error: 'Not Found'
    });
  }
});
