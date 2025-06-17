const mongodb = require('../connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Anime']
    try {
        const anime = await mongodb
            .getDb()
            .db()
            .collection('Anime')
            .find();

        anime.toArray().then((list) => {
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
    //#swagger.tags=['Anime']
    if (ObjectId.isValid(req.params.id)) {
        const animeId = new ObjectId(req.params.id);
        const anime = await mongodb
            .getDb()
            .db()
            .collection('Anime')
            .find({ _id: animeId });

        try {
            anime.toArray().then((list) => {
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

const createAnime = async (req, res) => {
    //#swagger.tags=['Anime']
    // Create body to hold data
    const newAnime = {
        Title: req.body.Title,
        Year: req.body.Year
    };

    try {
        const response = await mongodb
            .getDb()
            .db()
            .collection('Anime')
            .insertOne(newAnime);

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

const updateAnime = async (req, res) => {
    //#swagger.tags=['Anime']
    if (ObjectId.isValid(req.params.id)) {
        const animeId = new ObjectId(req.params.id);

        // Create body to hold data
        const updatedAnime = {
            Title: req.body.Title,
            Year: req.body.Year
        };

        try {
            const response = await mongodb
                .getDb()
                .db()
                .collection('Anime')
                .replaceOne({ _id: animeId }, updatedAnime);

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

const deleteAnime = async (req, res) => {
    //#swagger.tags=['Anime']
    if (ObjectId.isValid(req.params.id)) {
        const animeId = new ObjectId(req.params.id);

        try {
            const response = await mongodb
                .getDb()
                .db()
                .collection('Anime')
                .deleteOne({ _id: animeId });

            if (response.deletedCount > 0) {
                res.status(200).json(response);
            } else {
                res
                    .status(500)
                    .json(response.error || 'Unable to delete anime. Please try again.');
            }
        } catch (error) {
            res
                .status(500)
                .json({ error: error.message || 'Unable to delete anime. Please try again.' });
        }
    } else {
        res.status(400).json('Invalid ID entered. Please try again.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createAnime,
    updateAnime,
    deleteAnime,
};