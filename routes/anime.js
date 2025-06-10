const express = require('express');

const router = express.Router();

const animeController = require('../controllers/anime');

const { isAuthenticated } = require('../middleware/authenticate')

router.get('/', animeController.getAll);

router.get('/:id', animeController.getSingle);

router.post('/', isAuthenticated, animeController.createAnime);

router.put('/:id', isAuthenticated, animeController.updateAnime);

router.delete('/:id', isAuthenticated, animeController.deleteAnime);

module.exports = router;