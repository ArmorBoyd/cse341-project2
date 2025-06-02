const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongodb = require('./connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); 

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Swagger docs route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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