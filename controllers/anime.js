const mongodb = require('../connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Anime']
    const result = await mongodb.getDb().db().collection('Anime').find();
    result.toArray().then((animeList) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(animeList);
    }).catch((err) => {
        res.status(500).json({ message: err.message });
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Anime']
    const animeId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('Anime').find({ _id: animeId });
    result.toArray().then((animeList) => {
        if (!animeList.length) {
            res.status(404).json({ message: 'Anime not found.' });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(animeList[0]);
        }
    }).catch((err) => {
        res.status(500).json({ message: err.message });
    });
};

const createAnime = async (req, res) => {
    //#swagger.tags=['Anime']
    const anime = {
        Title: req.body.Title,
        Year: req.body.Year,
        
    };
    const response = await mongodb.getDb().db().collection('Anime').insertOne(anime);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the anime.');
    }
};

const updateAnime = async (req, res) => {
    //#swagger.tags=['Anime']
    const animeId = new ObjectId(req.params.id);
    const anime = {
        Title: req.body.Title,
        Year: req.body.Year,
        
    };
    const response = await mongodb.getDb().db().collection('Anime').replaceOne({ _id: animeId }, anime);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else if (response.matchedCount === 0) {
        res.status(404).json({ message: 'Anime not found.' });
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the anime.');
    }
};

const deleteAnime = async (req, res) => {
    //#swagger.tags=['Anime']
    const animeId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('Anime').deleteOne({ _id: animeId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else if (response.deletedCount === 0) {
        res.status(404).json({ message: 'Anime not found.' });
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the anime.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createAnime,
    updateAnime,
    deleteAnime,
};