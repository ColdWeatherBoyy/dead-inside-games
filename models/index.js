// dependencies needed to create associations
const User = require("./User");
const MinesweeperHighscores = require("./MinesweeperHighscores");

// user/minesweeperhighscores one to many association
User.hasMany(BlogPost, {
	foreignKey: "user_id",
	onDelete: "CASCADE",
});

MinesweeperHighscores.belongsTo(User, {
	foreignKey: "user_id",
});

module.exports = { User, MinesweeperHighscores };
