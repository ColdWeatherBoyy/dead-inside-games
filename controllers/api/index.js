const router = require("express").Router();
const userRoutes = require("./userRoutes");
const minesweeperHighscoreRoutes = require("./minesweeperHighscoreRoutes");

router.use("/users", userRoutes);
router.use("/minesweeper", minesweeperHighscoreRoutes);

module.exports = router;
