var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
// const assert = require("assert");
const bodyParser = require("body-parser");
// var jsonparser = bodyParser.json();
var mysql = require("mysql");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

var indexRouter = require("./routes/index");
var PostData = require("./routes/post");

const upload = require("express-fileupload");

var app = express();
app.use(express.static("./image"));
// Then you can set a middleware for express-fileupload

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const baseUrl = "";
app.use(cors({ origin: "*" }));
app.use(upload());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: "application/*+json" }));

app.use("/", indexRouter);
app.use("/",PostData)

// // Mysql Connect
// const host = "localhost";
// const user = "root";
// const pass = "";
// const databaseName = "nodetest";

// var connection = mysql.createConnection({
//   host: host,
//   user: user,
//   password: pass,
//   database: databaseName,
// });

// connection.connect(function (error) {
//   if (error) throw error;
//   console.log("MySql connected");
// });


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
