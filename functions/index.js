const functions = require("firebase-functions");
var app = require("../app")
exports.app = functions.https.onRequest(app);
