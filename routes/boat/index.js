const Boat        = require('../../models/boat');
const { Router }  = require('express');


const router = new Router();
module.exports = router;


function payloadHasId(err, req, res, next) {
  if(req.body.id)
    next();
  else
    next(err);
}


router.get('/boat', async function(req, res) {
  try {
    const boats = await Boat.getAllBoats();
    res.json(boats);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send('Internal Error');
  }
});


router.post('/boat', async function(req, res) {
  const { name, type, length } = req.body;

  if( name && type && length) {
    let id = await Boat.createBoat({ name, type, length });
    res.json({ id });
  } else {
    res.status(400);
    res.send('Bad Request');
  }
});


router.get('/boat/:boatid', async function(req, res) {
  const { boatid } = req.params;

  const boat = await Boat.getBoat({ id: parseInt(boatid) });

  if(boat)
    res.json(boat);
  else
    res.status(404).send('Not Found');
});


router.patch('/boat/:boatid', payloadHasId, async function(req, res) {
  const { boatid } = req.params;
  const { number, current_boat, arrival_date, departure_history } = req.body;

  const boatId = await Boat.updateBoat({
    id: parseInt(boatid),
    name,
    type,
    length,
    at_sea
  });

  if ( boatId )
    res.status(202).json({ id: boatId });
  else
    res.status(404).send('Not Found');
});


router.delete('/boat/:boatid', async function(req, res) {
  const { boatid } = req.params;
  try {
    await Boat.deleteBoat({ id: parseInt(boatid) })
    res.status(204).send();
  } catch (error) {
    res.status(404).send('Not Found');
  }
});
