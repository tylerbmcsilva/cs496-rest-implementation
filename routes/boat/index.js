const Boat        = require('../../models/boat');
const { Router }  = require('express');
const Slip        = require('../../models/slip');


const router = new Router();
module.exports = router;


router.get('/boat', async function(req, res) {
  try {
    const boats = await Boat.getAllBoats();
    res.json(boats);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: error.message
    });
  }
});


router.post('/boat', async function(req, res) {
  const { name, type, length } = req.body;

  try {
    if( name && type && length && await Boat.isUnique({ name }) ) {
      let id = await Boat.createBoat({ name, type, length });
      res.status(201).json({ id });
    } else {
      res.status(400).json({
        error: 'Bad Request'
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message
    })
  }


});


router.get('/boat/:boatid', async function(req, res) {
  const { boatid } = req.params;
  try {
    const boat = await Boat.getBoat({ id: boatid });

    if(boat)
      res.json(boat);
    else
      throw Error;
  } catch (error) {
    console.log(error);
    res.status(404).json({
      error: 'Not Found'
    });
  }

});


router.patch('/boat/:boatid', async function(req, res) {
  const { boatid } = req.params;
  const { name, type, length, at_sea } = req.body;
  let boatId;

  try {
    const boat  = await Boat.getBoat({ id: boatid });
    if(!boat) throw Error('Not Found');

    if( name !== '' && type !== '' && length !== '' && at_sea !== '' ) {
      boatId = await Boat.updateBoat({
        id: boatid,
        name,
        type,
        length,
        at_sea
      });
      if ( boatId )
        res.status(202).json({ id: boatId });
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
    if(error.message === 'Not Found')
      res.status(404).json({
        error: error.message
      });
    else
      res.status(500).json({
        error: 'Internal Failure'
      });
  }
});


router.delete('/boat/:boatid', async function(req, res) {
  const { boatid } = req.params;
  try {
    const boat  = await Boat.getBoat({ id: boatid });
    if(!boat) throw Error;

    await Slip.deleteBoat({ boatid });
    await Boat.deleteBoat({ id: boatid });

    res.status(202).json({
      message: 'Accepted'
    });
  } catch (error) {
    res.status(404).json({
      error: 'Not Found'
    });
  }
});


router.put('/boat/:boatid/arrive', async function(req, res) {
  const { boatid }  = req.params;

  try {
    const boat  = Boat.getBoat({ id: boatid });
    if( boat.at_sea === false ) Boat.BoatError('Boat already docked');

    const slipId  = await Slip.arriveBoatFirstAvailable({ boatid });
    const boatId  = await Boat.arrive({ id: boatid, ...boat });

    res.status(202).json({
      slip: { id: `${slipId}` },
      boat: { id: `${boatId}` }
    });

  } catch (error) {
    console.error(error);
    if(error.name === 'TypeError')
      res.status(401).json({
        error: 'Unauthorized'
      });
    else if (error.name === 'BoatError')
      res.status(400).json({
        error: error.message
      });
    else
      res.status(400).json({
        error: 'Bad Request'
      });
  }
});


router.put('/boat/:boatid/arrive/:slipid', async function(req, res) {
  const { boatid, slipid }  = req.params;

  try {
    const boat  = Boat.getBoat({ id: boatid });
    if( boat.at_sea === false ) Boat.BoatError('Boat already docked');

    const slipId  = await Slip.arriveBoatForSlip({ boatid, slipid });
    const boatId  = await Boat.arrive({ id: boatid, ...boat });

    res.status(202).json({
      slip: { id: `${slipId}` },
      boat: { id: `${boatId}` }
    });

  } catch (error) {
    console.error(error);
    if(error.name === 'SlipError' || error.name === 'BoatError')
      res.status(401).json({
        error: error.message
      });
    else
      res.status(400).json({
        error: 'Bad Request'
      });
  }
});


router.put('/boat/:boatid/depart', async function(req, res) {
  const { boatid }  = req.params;

  try {
    const boat  = Boat.getBoat({ id: boatid });
    if( boat.at_sea === true ) Boat.BoatError('Boat already at sea');

    const slipId  = await Slip.departBoat({ boatid });
    const boatId  = await Boat.depart({ id: boatid, ...boat });

    res.status(202).json({
      slip: { id: `${slipId}` },
      boat: { id: `${boatId}` }
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      error: 'Unauthorized'
    });
  }
});
