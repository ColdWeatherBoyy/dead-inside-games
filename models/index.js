// dependencies needed to create associations
const User = require("./User");
const MinesweeperHighscores = require("./MinesweeperHighscores");

// user/minesweeperhighscores one to many association
MinesweeperHighscores.belongsTo(User, {
	foreignKey: "user_id",
});

User.hasMany(MinesweeperHighscores, {
	foreignKey: "user_id",
	onDelete: "CASCADE",
});

module.exports = { User, MinesweeperHighscores };
