require("dotenv").config();

const express = require("express");
const expressHandlebars = require("express-handlebars");
const sequelize = require("./config/connection");
const db = require("./models");

const PORT = process.env.PORT || 3000;
const app = express();
const handlebars = expressHandlebars.create({});

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(require("./controllers"));

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

sequelize.sync().then(() => {
	app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
});
