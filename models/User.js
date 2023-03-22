// dependencies for User Model creation in sequelize
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class User extends Model {
	// method to validate password
	checkPassword(loginPassword) {
		return bcrypt.compareSync(loginPassword, this.password);
	}
}

// specifiy needed columns
User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			// unique users only
			unique: true,
			validate: {
				len: [1],
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				// requires password to have one digit, one lowercase, one uppercase, and be at least 8 charactes long
				is: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}/,
			},
		},
	},
	{
		hooks: {
			// hashes password before creation and lowercases username to make non-case specific
			beforeCreate: async (newUserData) => {
				newUserData.username = await newUserData.username.toLowerCase();
				newUserData.password = await bcrypt.hash(newUserData.password, 10);
			},
			// if we ever add an update password, hook for that (same for lowercase usernames)
			beforeUpdate: async (newUserData) => {
				newUserData.username = await newUserData.username.toLowerCase();
				newUserData.password = await bcrypt.hash(newUserData.password, 10);
			},
		},
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: "user",
	}
);

module.exports = User;
