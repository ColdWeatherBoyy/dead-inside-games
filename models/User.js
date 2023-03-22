// dependencies for User Model creation in sequelize
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class User extends Model {
	// method to validate password
	checkPassword(loginPassword) {
		return bcrypt.compareSync(loginPassword, this.checkPassword);
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
			// hashes password before creation
			beforeCreate: async (newUserData) => {
				newUserData.password = await bcrypt.hash(newUserData.password, 10);
			},
			// if we ever add an update password, hook for that
			beforeUpdate: async (newUserData) => {
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
