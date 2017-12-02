"use strict";
/// <reference path="../typings/index.d.ts" />
// BASE SETUP
// ======================================
Object.defineProperty(exports, "__esModule", { value: true });
// CALL THE PACKAGES --------------------
var express = require("express"); // call express
var app = express(); // define our app using express
var bodyParser = require("body-parser"); // get body-parser
var morgan = require("morgan"); // used to see requests
var mongoose = require("mongoose");
var config_1 = require("./config");
var router_1 = require("./router");
// APP CONFIGURATION ==================
// ====================================
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// configure our app to handle CORS requests
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});
// log all requests to the console
app.use(morgan('dev'));
// connect to our database (hosted on modulus.io)
mongoose.connect(config_1.default.database);
// set static files location
// used for requests that our frontend will make
app.use(express.static(__dirname + '/../public'));
app.use(express.static(__dirname + '/../common'));
app.use('/node_modules', express.static(__dirname + '/../node_modules'));
// ROUTES FOR OUR API =================
// ====================================
// API ROUTES ------------------------
var apiRoute = router_1.default(app);
app.use('/api', apiRoute);
app.all('/*', function (req, res) {
    res.sendFile('index.html', { root: __dirname + '/../public' }); // load the single view file (angular will handle the page changes on the front-end)
});
// START THE SERVER
// ====================================
app.listen(config_1.default.port);
console.log('Magic happens on port ' + config_1.default.port);
//# sourceMappingURL=server.js.map