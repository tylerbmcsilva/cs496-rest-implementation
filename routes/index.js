const { Router }  = require('express');

const router = new Router();
module.exports = router;

router.use(require('./boat'));
router.use(require('./slip'));
