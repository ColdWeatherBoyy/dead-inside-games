const router = require("express").Router();
const userRoutes = require("./UserRoutes");
const minesweeperHighscoreRoutes = require("./minesweeperHighscoreRoutes");

router.use("/users", userRoutes);
router.use("/minesweeper/highscore", minesweeperHighscoreRoutes);

module.exports = router;
