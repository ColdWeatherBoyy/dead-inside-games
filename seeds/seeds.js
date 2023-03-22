const sequelize = require("../config/connection");
const { User, MinesweeperHighscores } = require("../models");

// import seed data from json files
const userData = require("./userData.json");
const minesweeperData = require("./minesweeperData.json");

// function to bulk fill in seeds
const seedDatabase = async () => {
	await sequelize.sync({ force: true });

	await User.bulkCreate(userData, {
		individualHooks: true,
		returning: true,
	});

	await MinesweeperHighscores.bulkCreate(minesweeperData, {
		individualHooks: true,
		returning: true,
	});

	process.exit(0);
};

seedDatabase();
