const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "Project2 Api",
        descritption: "Project2 Api"
    },
    host: "localhost:3000",
    schemes: ["https", "http"]
};

const outputFile = './swagger.json';

const endpointsFiles = ['./routes/index.js'];

//This will generate a swagger.json file in the root directory
swaggerAutogen(outputFile, endpointsFiles, doc);

