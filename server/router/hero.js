"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../typings/index.d.ts" />
var hero_1 = require("../models/hero");
var express = require("express"); // call express
exports.default = function (app) {
    var apiRouter = express.Router();
    // on routes that end in /hero
    // ----------------------------------------------------
    apiRouter.route('/hero')
        .post(function (req, res) {
        // create a new instance of the hero model
        hero_1.HeroModel.createHero(req['body'].name).then(function (hero) { return res.json({ name: hero.name, id: hero.id.toString() }); });
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
        .get(function (req, res) {
        hero_1.HeroModel.all().then(function (heroes) { return res.json(heroes); });
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
        .get(function (req, res) {
        hero_1.HeroModel.findHeroById(req.params['hero_id']).then(function (hero) { return res.json(hero); });
        // hero.findById(req.params['hero_id'], function (err, hero) {
        // 	if (err) {
        // 		res.send(err);
        // 	}
        //
        // 	// return that hero
        // 	res.json(hero);
        // });
    })
        .put(function (req, res) {
        hero_1.HeroModel.findHeroById(req.params['hero_id']).then(function () { return res.json({ message: 'hero updated!' }); });
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
        .delete(function (req, res) {
        hero_1.HeroModel.delete(req.params['hero_id']).then(function () { return res.json({ message: 'hero deleted!' }); });
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
//# sourceMappingURL=hero.js.map