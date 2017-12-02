"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var mongoose_1 = require("mongoose");
var Promise = require("bluebird");
var util_1 = require("../dao/util");
var heroSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    }
});
exports.HeroSchema = mongoose.model('hero', heroSchema, 'heroes', true);
var HeroModel = (function () {
    function HeroModel(heroModel) {
        this._heroModel = heroModel;
    }
    HeroModel.createHero = function (data) {
        var p = new Promise(function (resolve, reject) {
            var repo = new HeroRepository();
            var hero = __assign({}, data);
            return repo.create(hero, function (err, res) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        });
        return p;
    };
    HeroModel.findHero = function (name) {
        var p = new Promise(function (resolve, reject) {
            var repo = new HeroRepository();
            repo.find({ name: name }).select('name').sort({ createdAt: -1 }).limit(1).exec(function (err, res) {
                if (err) {
                    reject(err);
                }
                else {
                    if (res.length) {
                        resolve(res[0]);
                    }
                    else {
                        resolve(null);
                    }
                }
            });
        });
        return p;
    };
    HeroModel.findHeroById = function (id) {
        var p = new Promise(function (resolve, reject) {
            var repo = new HeroRepository();
            repo.findById(id, function (err, res) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            }).select('name');
        });
        return p;
    };
    HeroModel.update = function (id, name) {
        var p = new Promise(function (resolve, reject) {
            var repo = new HeroRepository();
            var hero = {
                name: name
            };
            repo.update(new mongoose.Types.ObjectId(id), hero, function (err, res) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        });
        return p;
    };
    HeroModel.delete = function (id) {
        var p = new Promise(function (resolve, reject) {
            var repo = new HeroRepository();
            repo.delete(id, function (err, res) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        });
        return p;
    };
    HeroModel.all = function () {
        var p = new Promise(function (resolve, reject) {
            var repo = new HeroRepository();
            repo.find({}, {}, function (err, res) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(res);
                }
            }).select('name');
        });
        return p;
    };
    Object.defineProperty(HeroModel.prototype, "name", {
        get: function () {
            return this._heroModel.name;
        },
        enumerable: true,
        configurable: true
    });
    return HeroModel;
}());
exports.HeroModel = HeroModel;
Object.seal(HeroModel);
var HeroRepository = (function (_super) {
    __extends(HeroRepository, _super);
    function HeroRepository() {
        return _super.call(this, exports.HeroSchema) || this;
    }
    return HeroRepository;
}(util_1.RepositoryBase));
exports.HeroRepository = HeroRepository;
Object.seal(HeroRepository);
//# sourceMappingURL=hero.js.map