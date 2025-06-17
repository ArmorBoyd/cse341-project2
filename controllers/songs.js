const mongodb = require('../connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Songs']
    try {
        const songs = await mongodb
            .getDb()
            .db()
            .collection('songs')
            .find();

        songs.toArray().then((list) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(list);
        }).catch((err) => {
            res.status(500).json({ message: err });
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Songs']
    if (ObjectId.isValid(req.params.id)) {
        const songId = new ObjectId(req.params.id);
        const song = await mongodb
            .getDb()
            .db()
            .collection('songs')
            .find({ _id: songId });

        try {
            song.toArray().then((list) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(list[0]);
            });
        } catch (err) {
            res.status(400).json({ message: err });
        }
    } else {
        res.status(400).json("Invalid ID entered. Please try again.");
    }
};

const createSong = async (req, res) => {
    //#swagger.tags=['Songs']
    // Create body to hold data
    const newSong = {
        Title: req.body.Title,
        Artist: req.body.Artist,
        Year: req.body.Year,
        Album: req.body.Album
    };

    try {
        const response = await mongodb
            .getDb()
            .db()
            .collection('songs')
            .insertOne(newSong);

        if (response.acknowledged) {
            console.log(response.insertedId);
            res.status(201).json(response);
        }
    } catch (error) {
        res
            .status(500)
            .json({ error: error.message || 'An error occurred. Please try again.' });
    }
};

const updateSong = async (req, res) => {
    //#swagger.tags=['Songs']
    if (ObjectId.isValid(req.params.id)) {
        const songId = new ObjectId(req.params.id);

        // Create body to hold data
        const updatedSong = {
            Title: req.body.Title,
            Artist: req.body.Artist,
            Year: req.body.Year,
            Album: req.body.Album
        };

        try {
            const response = await mongodb
                .getDb()
                .db()
                .collection('songs')
                .replaceOne({ _id: songId }, updatedSong);

            if (response.modifiedCount > 0) {
                res.status(200).json(response);
            } else {
                res.status(500).json(response.error || 'An error occurred. Please try again.');
            }
        } catch (error) {
            res
                .status(500)
                .json({ error: error.message || 'An error occurred. Please try again.' });
        }
    } else {
        res.status(400).json('Invalid ID entered. Please try again.');
    }
};

const deleteSong = async (req, res) => {
    //#swagger.tags=['Songs']
    if (ObjectId.isValid(req.params.id)) {
        const songId = new ObjectId(req.params.id);

        try {
            const response = await mongodb
                .getDb()
                .db()
                .collection('songs')
                .deleteOne({ _id: songId });

            if (response.deletedCount > 0) {
                res.status(200).json(response);
            } else {
                res
                    .status(500)
                    .json(response.error || 'Unable to delete song. Please try again.');
            }
        } catch (error) {
            res
                .status(500)
                .json({ error: error.message || 'Unable to delete song. Please try again.' });
        }
    } else {
        res.status(400).json('Invalid ID entered. Please try again.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createSong,
    updateSong,
    deleteSong,
};