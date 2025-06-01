const mongodb = require('../connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Songs']
    const result = await mongodb.getDb().db().collection('songs').find();
    result.toArray().then((songs) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(songs);
    }).catch((err) => {
        res.status(500).json({ message: err.message });
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Songs']
    const songId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('songs').find({ _id: songId });
    result.toArray().then((songs) => {
        if (!songs.length) {
            res.status(404).json({ message: 'Song not found.' });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(songs[0]);
        }
    }).catch((err) => {
        res.status(500).json({ message: err.message });
    });
};

const createSong = async (req, res) => {
    //#swagger.tags=['Songs']
    const song = {
        Title: req.body.Title,
        Artist: req.body.Artist,
        "Year Released": req.body["Year Released"],
        Album: req.body.Album
    };
    const response = await mongodb.getDb().db().collection('songs').insertOne(song);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the song.');
    }
};

const updateSong = async (req, res) => {
    //#swagger.tags=['Songs']
    const songId = new ObjectId(req.params.id);
    const song = {
        Title: req.body.Title,
        Artist: req.body.Artist,
        "Year Released": req.body["Year Released"],
        Album: req.body.Album
    };
    const response = await mongodb.getDb().db().collection('songs').replaceOne({ _id: songId }, song);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else if (response.matchedCount === 0) {
        res.status(404).json({ message: 'Song not found.' });
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the song.');
    }
};

const deleteSong = async (req, res) => {
    //#swagger.tags=['Songs']
    const songId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('songs').deleteOne({ _id: songId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else if (response.deletedCount === 0) {
        res.status(404).json({ message: 'Song not found.' });
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the song.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createSong,
    updateSong,
    deleteSong,
};