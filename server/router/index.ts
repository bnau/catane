/// <reference path="../../typings/index.d.ts" />
import * as express from 'express';		// call express
import heroRouter from './hero';

export default (app: express.Server) => {

	let apiRouter: express.Router = express.Router();

	apiRouter.use(heroRouter(app));

	return apiRouter;
};