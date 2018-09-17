/// <reference path="../../typings/index.d.ts" />
import jwt from 'jsonwebtoken';
import {UserRepository, UserModel, IUserModel} from '../schema/user';
import * as express from 'express';
import config from '../config';
import User from '../../common/beans/user';

function getToken(err, user: IUserModel, req: express.Request, res: express.Response) {
	if (err) {
		throw err;
	}

	// no user with that username was found
	if (!user) {
		res.json({success: false, message: 'Authentication failed. User not found.'});
	} else if (user) {

		// check if password matches
		let validPassword = user.comparePassword(req['body'].password);
		if (!validPassword) {
			res.json({success: false, message: 'Authentication failed. Wrong password.'});
		} else {

			// if user is found and password is right
			// create a token
			let token = jwt.sign({
				name: user.name
			}, config.superSecret, {
				expiresIn: '12h'// expires inhours
			});

			// return the information including token as JSON
			res.json({
				success: true,
				message: 'Enjoy your token!',
				token: token
			});
		}

	}
}

export default (app: express.Server) => {

	let apiRouter = express.Router();


	apiRouter.route('/user')// on routes that end in /user
	// ----------------------------------------------------
		.post((req: express.Request, res: express.Response) => {
			let repo = new UserRepository();
			repo.find({name: req['body'].name}).select('name username password').exec((err, user: IUserModel) => {
				getToken(err, user, req, res);
			});
		})
		.put((req: express.Request, res: express.Response) => {
			let user = <User>{
				...req['body']
			};

			UserModel.createUser(user);
			UserModel.findByName(req['body'].name).exec((err, userSaved: IUserModel) => {
				getToken(err, userSaved, req, res);

			});
		});

	return apiRouter;
};
