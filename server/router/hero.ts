/// <reference path="../../typings/index.d.ts" />
import {HeroModel, IHeroModel} from '../schema/hero';
import Hero from '../../common/beans/hero';
import * as express from 'express';		// call express

export default (app: express.Server) => {

	let apiRouter = express.Router();

	// on routes that end in /hero
	// ----------------------------------------------------
	apiRouter.route('/hero')

	// create a hero (accessed at POST http://localhost:8080/hero)
		.post((req: express.Request, res: express.Response) => {
		// create a new instance of the hero model

			HeroModel.createHero(req['body'].name).then((hero: IHeroModel) => res.json(<Hero>{name: hero.name, id: hero.id.toString()}));
				// if (err) {
				// 	// duplicate entry
				// 	if (err.code === 11000) {
				// 		return res.json({success: false, message: 'A hero with that heroname already exists. '});
				// 	} else {
				// 		return res.send(err);
				// 	}
				// }
				//
				// // return a message
				// ;
				// });

		})

		// get all the hero (accessed at GET http://localhost:8080/api/hero)
		.get((req: express.Request, res: express.Response) => {

			HeroModel.all().then(heroes => res.json(heroes));

			// hero.find({}, (err, hero) => {
			// 	if (err) {
			// 		res.send(err);
			// 	}
			//
			// 	// return the hero
			// 	res.json(hero);
			// });
		});

	// on routes that end in /hero/:hero_id
	// ----------------------------------------------------
	apiRouter.route('/hero/:hero_id')

	// get the hero with that id
		.get((req: express.Request, res: express.Response) => {
			HeroModel.findHeroById(req.params['hero_id']).then(hero => res.json(hero));
			// hero.findById(req.params['hero_id'], function (err, hero) {
			// 	if (err) {
			// 		res.send(err);
			// 	}
			//
			// 	// return that hero
			// 	res.json(hero);
			// });
		})

		// update the hero with this id
		.put((req: express.Request, res: express.Response) => {
				HeroModel.findHeroById(req.params['hero_id']).then(() => res.json({message: 'hero updated!'}));
				// set the new hero information if it exists in the request
				// 	if (req['body'].name) {
				// 		hero.name = req['body'].name;
				// 	}
				//
				// 	// save the hero
				// 	hero.save((err) => {
				// 		if (err) {
				// 			res.send(err);
				// 		}
				//
				// 		// return a message
				// 		res.json({message: 'hero updated!'});
				// 	});
				//
				// });
				//hero);

			// hero.findById(req.params['hero_id'], function (err, hero) {
			//
			// 	if (err) {
			// 		res.send(err);
			// 	}
			//
			// 	// set the new hero information if it exists in the request
			// 	if (req['body'].name) {
			// 		hero.name = req['body'].name;
			// 	}
			//
			// 	// save the hero
			// 	hero.save((err) => {
			// 		if (err) {
			// 			res.send(err);
			// 		}
			//
			// 		// return a message
			// 		res.json({message: 'hero updated!'});
			// 	});
			//
			// });
		})

		// delete the hero with this id
		.delete((req: express.Request, res: express.Response) => {
			HeroModel.delete(req.params['hero_id']).then(() => res.json({message: 'hero deleted!'}));
			// hero.remove({
			// 	_id: req.params['hero_id']
			// }, (err) => {
			// 	if (err) {
			// 		res.send(err);
			// 	}
			//
			// 	res.json({message: 'Successfully deleted'});
			// });
		});

	return apiRouter;
};
