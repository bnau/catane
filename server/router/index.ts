/// <reference path="../../typings/index.d.ts" />
import * as express from 'express';		// call express
import heroRouter from './hero';
import publicRouter from './public';
import jwt from 'jsonwebtoken';
import config     from '../config';

export let publics = (app: express.Server) => {

	let apiRouter: express.Router = express.Router();

	apiRouter.use(publicRouter(app));

	return apiRouter;

};

export default (app: express.Server) => {

	let apiRouter: express.Router = express.Router();

// route middleware to verify a token
	app.use('/api*', function(req, res, next) {

		// check header or url parameters or post parameters for token
		let token = req.body.token || req.param('token') || req.headers['x-access-token'];

		// decode token
		if (token) {

			// verifies secret and checks exp
			jwt.verify(token, config.superSecret, function(err, decoded) {
				if (err) {
					return res.status(403).send({ success: false, message: 'Failed to authenticate token.' });
				} else {
					// if everything is good, save to request for use in other routes
					req.decoded = decoded;

					next();

				}
			});

		} else {

			// if there is no token
			// return an HTTP response of 403 (access forbidden) and an error message
			return res.status(403).send({ success: false, message: 'No token provided.'
			});

		}

		// next() used to be here
	});

	apiRouter.use(heroRouter(app));

	return apiRouter;
};
