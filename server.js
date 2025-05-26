const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World!');
    });

app.listen(process.env.port || 2000);
console.log('Web server is running on port ' + (process.env.port || 2000));;