// Initialization of  Required Modules.

// Express is used to Create Node Server and handling Routes (Controller Logic of MVC is implemented here)
const express = require("express");

// Body Parser is used to parse Request Url body   
const bodyParser = require('body-parser');

// Path Node Library for File Path Management
const path = require('path');

// Starting HTTP server on Some Port Http Node Library is required.
/*  -- The HTTP interfaces in Node.js are designed to support many features of the protocol which have been traditionally difficult to use. 
    -- In particular, large, possibly chunk-encoded, messages. 
    -- The interface is careful to never buffer entire requests or responses--the user is able to stream data.
    -- https://nodejs.org/api/http.html
*/
const http = require('http');

// assigning Express object to app variable 
// This is going to be our express app variable.
const app = express();

// api object will contain path to our Restfull api routes which will be api.js for example
 // ../      (ROOT)
 // |____ ../Server
 // |________ ../Server/routes
 // |________ ../Server/routes/api.js
const api = require('./server/routes/api');  


// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Main Entry Point of our app or Home Route for our app that will be delivered on default routes (Our Single Page Application)
// Angular DIST output folder
// ../        (ROOT)
// |____../dist/indext.html (Out Put of our Angular App)
// Since this will contain our static assest hence this path will remain static.
app.use(express.static(path.join(__dirname, 'dist')));

// API location
// For /api route (./server/routes/api) will be called.
app.use('/api', api);


// Send all other requests to the Angular app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '8000';
app.set('port', port);


// for Creating Express application the app object will be passed to NODE Http.createServer interface.
const server = http.createServer(app);

// Server Will be started on the port mentioned above.
server.listen(port, () => console.log(`Running on localhost:${port}`));