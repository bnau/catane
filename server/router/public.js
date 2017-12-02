"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../typings/index.d.ts" />
var express = require("express"); // call express
exports.default = function (app) {
    var apiRouter = express.Router();
    // on routes that end in /hero
    // ----------------------------------------------------
    apiRouter.route('/public')
        .get(function (req, res) {
        console.log('test');
        res.sendFile(__dirname + '/../../public/src/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
    return apiRouter;
};
