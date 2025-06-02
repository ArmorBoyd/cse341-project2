const mongodb = require('../connect');
const ObjectId = require('mongodb').ObjectId;

// Validation function for anime
function validateAnime(anime) {
    if (!anime.Title || typeof anime.Title !== 'string') return 'Title is required.';
    if (!anime['Year Released'] || typeof anime['Year Released'] !== 'string') return 'Year Released is required.';
    return null;
}

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDb().db().collection('Anime').find();
        const animeList = await result.toArray();
        res.status(200).json(animeList);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingle = async (req, res) => {
    try {
        const animeId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db().collection('Anime').find({ _id: animeId });
        const animeList = await result.toArray();
        if (!animeList.length) return res.status(404).json({ message: 'Anime not found.' });
        res.status(200).json(animeList[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createAnime = async (req, res) => {
    try {
        const anime = req.body;
        const validationError = validateAnime(anime);
        if (validationError) {
            return res.status(400).json({ message: validationError });
        }
        const response = await mongodb.getDb().db().collection('Anime').insertOne(anime);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json({ message: 'Failed to create anime.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateAnime = async (req, res) => {
    try {
        const animeId = new ObjectId(req.params.id);
        const anime = req.body;
        const validationError = validateAnime(anime);
        if (validationError) {
            return res.status(400).json({ message: validationError });
        }
        const response = await mongodb.getDb().db().collection('Anime').replaceOne({ _id: animeId }, anime);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Anime not found or no changes made.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteAnime = async (req, res) => {
    try {
        const animeId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().db().collection('Anime').deleteOne({ _id: animeId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Anime not found.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createAnime,
    updateAnime,
    deleteAnime
};