const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongodb = require('./db/connect');
const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.error(err);
    } else {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
});