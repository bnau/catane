import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs';
import {RepositoryBase} from '../dao/util';
import {Schema} from 'mongoose';
import User from '../../common/beans/user';
import {_throw} from 'rxjs/observable/throw';

export interface IUserModel extends mongoose.Document {
	name: string;
	passwd: string;
	comparePassword(password);
}

export let userSchema: Schema = new Schema({
	name: {
		type: String,
		required: true,
		index: {
			unique: true
		}
	},
	passwd: {
		type: String,
		required: true,
		select: false
	}

});

// hash the password before the user is saved
userSchema.pre('save', (next) => {
	let user = this;

	// hash the password only if the password has been changed or user is new
	// if (!user.isModified('password')) {
	// 	return next();
	// }

	// generate the salt
	bcrypt.hash(user.password, null, null, function (err, hash) {
		if (err) {
			return next(err);
		}

		// change the password to the hashed version
		user.password = hash;
		next();
	});
});

// method to compare a given password with the database hash
export let UserSchema = mongoose.model<IUserModel>('user', userSchema, 'users', true);

export class UserModel {

	protected _userModel: IUserModel;

	static createUser(data: User): PromiseLike<IUserModel> {
		let p = new Promise((resolve, reject) => {

			let repo = new UserRepository();

			let user = <IUserModel>{
				...data
			};

			repo.create(user, (err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(res);
				}
			});

			return p;

		});

	}

	static findByName(name: string): IUserModel {
		let p = new Promise((resolve, reject) => {
			let repo = new UserRepository();

			repo.findOne({name}, (err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(res);
				}
			});
		})
		return p;
	}

	get name(): string {
		return this._userModel.name;
	}

	constructor(userModel: IUserModel) {
		this._userModel = userModel;
	}

	comparePassword(password): boolean {
		return bcrypt.compareSync(password, this._userModel.passwd);
	}
}

Object.seal(UserModel);


export class UserRepository extends RepositoryBase<IUserModel> {
	constructor() {
		super(UserSchema);
	}
}

Object.seal(UserRepository);
