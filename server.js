// dependencies/NPM packages
// imports in express with handlebars
const express = require("express");
const exphbs = require("express-handlebars");

// handlebar helpers
const helpers = require("./utils/helpers");
const hbs = exphbs.create({ helpers });

// establishes sessions for express
const session = require("express-session");

// for establishing public folder path
const path = require("path");

// for routes
const routes = require("./controllers");

// imports in .env files if needed
require("dotenv").config();

// sequelize conection
const sequelize = require("./config/connection");

// sequelize session table
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// sets up session object details

const sess = {
	secret: process.env.SESSION_SECRET,
	cookie: { maxAge: 86400000 },
	resave: false,
	saveUninitialized: true,
	secure: false,
	store: new SequelizeStore({
		db: sequelize,
	}),
};

// middleware for sessions
app.use(session(sess));

// handlebars engined initialized
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// middleware for parsing and public folder location
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// middleware for routes
app.use("/", routes);

// initialize sequelize and express listener
sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log("Now listening"));
});
