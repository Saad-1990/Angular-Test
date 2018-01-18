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
 //  |----> ../Server
 //  |-------> ../Server/routes
 //  |------------>../Server/routes/api.js
const api = require('./server/routes/api');


// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Main Entry Point of our app or Home Route for our app that will be delivered on default routes (Our Single Page Application)
// Angular DIST output folder
// ../        (ROOT)
//  |---->../dist/indext.html (Output of Angular app/src)
// Since this will contain our static assest hence this path will remain static.
app.use(express.static(path.join(__dirname, 'dist')));

//Routes to Serve For Static Files
app.use('/css',express.static(path.join(__dirname,'public/static/assets/css')));
app.use('/js',express.static(path.join(__dirname,'public/static/assets/js')));
app.use('/images',express.static(path.join(__dirname,'public/static/assets/images')));

// API location
// For /api route (./server/routes/api) will be called.
app.use('/api', api);


// Send all other requests to the Angular app
app.get('/', (req, res) => {
    //for Socket Test
    res.sendFile(path.join(__dirname, 'dummy.html'));
    //res.sendFile(path.join(__dirname, 'dist/index.html'));
});


//Set Port
const port = process.env.PORT || '8000';
app.set('port', port);


// for Creating Express application the app object will be passed to NODE Http.createServer interface.
const server = http.createServer(app);

// Socket Object for Chat Recieving/Sending {Bi-directional Communication} Messages.
// Sockets are required so that websocket communication from client and server has been made.
// For Tutorial of socket.io on Node.js see following Link along with simple chat client/server application
// https://socket.io/get-started/chat/
const io = require("socket.io")(server);


// Socket.io event whenever a user is connected.
// For Server api of Socket.io visit following link for detailed information
// https://socket.io/docs/server-api/

// io is global Server Object any event occurs on io object will be treated for every user/socket
// socket events are visitors and every visitor may perform their own event on their socket instance 
io.on('connection', function(socket){
    console.log(socket.handshake.query);

    //Case Where a user is connected must be reported to all .
    socket.broadcast.emit('message', socket.id +' Connected');


    //Socket Specific Event Binding.

    // A Single Socket will be treated as a Single visitor/user
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    //The Message recieved from a particular client/socket/visitor
    socket.on('message', function(msg){
       console.log('message: ' + msg);
    });
});

// Server Will be started on the port mentioned above.
server.listen(port, () => console.log(`Running on localhost:${port}`));