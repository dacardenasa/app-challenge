require("./database");
const express = require('express');
const path = require('path');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Bootstrap 4 y librerías necesarias
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use("/js", express.static(__dirname + "/node_modules/jquery/dist"));
app.use("/js", express.static(__dirname + "/node_modules/popper.js/dist"));
app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js"));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.all("*", function (req, res) {
  res.redirect("/");
});

module.exports = app;
