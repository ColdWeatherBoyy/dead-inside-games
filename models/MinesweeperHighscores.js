// dependencies for highscores model
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// establishes new Model by extending Model
class MinesweeperHighscores extends Model {}

MinesweeperHighscores.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		score: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "user",
				key: "id",
			},
		},
	},
	{
		sequelize,
		timestamps: true,
		freezeTableName: true,
		underscored: true,
		modelName: "msHighscores",
	}
);

module.exports = MinesweeperHighscores;
