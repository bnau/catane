/// <reference path="../typings/index.d.ts" />
// BASE SETUP
// ======================================

// CALL THE PACKAGES --------------------
import * as express from 'express';		// call express
let app = express(); 				// define our app using express
import * as bodyParser from 'body-parser'; 	// get body-parser
import * as morgan  from 'morgan'; 		// used to see requests
import * as mongoose from 'mongoose';
import config     from './config';
import router from './router';

// APP CONFIGURATION ==================
// ====================================
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(( req: express.Request,  res: express.Response, next: express.NextFunction) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

// log all requests to the console
app.use(morgan('dev'));

// connect to our database (hosted on modulus.io)
mongoose.connect(config.database);

// set static files location
// used for requests that our frontend will make
app.use(express.static(__dirname + '/../public'));
app.use(express.static(__dirname + '/../common'));
app.use('/node_modules', express.static(__dirname + '/../node_modules'));

// ROUTES FOR OUR API =================
// ====================================

// API ROUTES ------------------------
let apiRoute = router(app);
app.use('/api', apiRoute);

app.all('/*', (req: express.Request, res: express.Response) => {
	res.sendFile('index.html', {root: __dirname + '/../public'}); // load the single view file (angular will handle the page changes on the front-end)
});

// START THE SERVER
// ====================================
app.listen(config.port);
console.log('Magic happens on port ' + config.port);
