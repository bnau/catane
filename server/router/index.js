"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../typings/index.d.ts" />
var express = require("express"); // call express
var hero_1 = require("./hero");
exports.default = function (app) {
    var apiRouter = express.Router();
    apiRouter.use(hero_1.default(app));
    return apiRouter;
};
//# sourceMappingURL=index.js.map