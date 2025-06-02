const router = require('express').Router();

router.use('/songs', require('./songs'));

router.use('/anime', require('./anime'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello World');
});


module.exports = router;