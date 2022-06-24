var express = require("express");
var router = express.Router();
const ResponseObj = require("../service/Response.service");

router.get("/d", function (req, res, next) {
  ResponseObj.successResponse(res, { username: "Deepak" });
});



router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});


module.exports = router;
