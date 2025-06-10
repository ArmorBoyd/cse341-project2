const express = require('express');

const router = express.Router();

const songsController = require('../controllers/songs');

const { isAuthenticated } = require('../middleware/authenticate')

router.get('/', songsController.getAll);

router.get('/:id', songsController.getSingle);

router.post('/', isAuthenticated, songsController.createSong);

router.put('/:id', isAuthenticated, songsController.updateSong);

router.delete('/:id', isAuthenticated, songsController.deleteSong);

module.exports = router;

