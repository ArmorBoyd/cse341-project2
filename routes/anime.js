const express = require('express');

const router = express.Router();

const animeController = require('../controllers/anime');

router.get('/', animeController.getAll);

router.get('/:id', animeController.getSingle);

router.post('/', animeController.createAnime);

router.put('/:id', animeController.updateAnime);

router.delete('/:id', animeController.deleteAnime);

module.exports = router;