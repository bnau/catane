import * as mongoose from 'mongoose';
import {Schema} from 'mongoose';
import * as Promise from 'bluebird';
import {RepositoryBase} from '../dao/util';

export interface IHeroModel extends mongoose.Document {
    name: string;
}

let heroSchema: Schema = new Schema({
	name: {
		type: String,
		required: true
	}
});

export let HeroSchema = mongoose.model<IHeroModel>('hero', heroSchema, 'heroes', true);

export class HeroModel {

	private _heroModel: IHeroModel;

	static createHero(data: Object): PromiseLike<IHeroModel> {
		let p = new Promise((resolve, reject) => {

			let repo = new HeroRepository();

			let hero = <IHeroModel>{
				...data
			};

			return repo.create(hero, (err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(res);
				}
			});

		});

		return p;

	}

	static findHero(name: string): PromiseLike<IHeroModel> {
		let p = new Promise((resolve, reject) => {
			let repo = new HeroRepository();

			repo.find({ name }).select('name').sort({ createdAt: -1 }).limit(1).exec((err, res) => {
				if (err) {
					reject(err);
				} else {
					if (res.length) {
						resolve(res[0]);
					} else {
						resolve(null);
					}
				}
			});
		});

		return p;
	}

	static findHeroById(id: string): PromiseLike<IHeroModel> {
		let p = new Promise((resolve, reject) => {
			let repo = new HeroRepository();

			repo.findById(id, (err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(res);
				}
			}).select('name');
		});

		return p;
	}

	static update(id: string, name: string): PromiseLike<IHeroModel> {
		let p = new Promise((resolve, reject) => {

			let repo = new HeroRepository();

			let hero = <IHeroModel>{
				name: name
			};

			repo.update(new mongoose.Types.ObjectId(id), hero, (err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(res);
				}
			});

		});

		return p;
	}

	static delete(id: string): PromiseLike<IHeroModel> {
		let p = new Promise((resolve, reject) => {

			let repo = new HeroRepository();

			repo.delete(id, (err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(res);
				}
			});

		});

		return p;
	}

	static all(): PromiseLike<IHeroModel[]> {
		let p = new Promise((resolve, reject) => {

			let repo = new HeroRepository();

			repo.find({}, {}, (err, res) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					resolve(res);
				}
			}).select('name');

		});

		return p;
	}

	get name(): string {
		return this._heroModel.name;
	}

	constructor(heroModel: IHeroModel) {
		this._heroModel = heroModel;
	}

}

Object.seal(HeroModel);


export class HeroRepository extends RepositoryBase<IHeroModel> {
	constructor() {
		super(HeroSchema);
	}
}

Object.seal(HeroRepository);
