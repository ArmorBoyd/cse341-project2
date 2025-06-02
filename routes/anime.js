const express = require('express');

const router = express.Router();

const animeController = require('../controllers/anime');

router.get('/', animeController.getAll);

router.get('/:id', animeController.getSingle);

router.post('/', animeController.createSong);

router.put('/:id', animeController.updateSong);

router.delete('/:id', animeController.deleteSong);

module.exports = router;