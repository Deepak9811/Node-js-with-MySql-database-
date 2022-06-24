var express = require("express");
var router = express.Router();
const ResponseObj = require("../service/Response.service");
var database = require("../service/Contanst");

router.get("/orders", function (req, res, next) {
  database.query("select * from product ", function (error, results, fields) {
    if (error) {
      // throw error;
      // res.json({results:error.sqlMessage});
      ResponseObj.tableNoteFound(res)
    } else {
      res.json({data:results});
    }

    // console.log('The solution is: ', results[0].solution);
  });
});

router.post("/order", function (req, res, next) {
  let name = req.body.name;
  console.log("name :- ", name);
  let sqlQuery = `insert into product(name) value("${name}") `;
  let newQuery=  `select * from product`
  database.query(sqlQuery,newQuery, function (error, results, fields) {
    if (error) throw error;
    console.log(results)
    res.json(results);
  });
});

router.delete("/delete-orders", function (req, res, next) {
  //   ordersController.DeleteOrder(req, res);
  let id = req.body.id
  console.log(id)
  let query = `delete from product where id=${id}`
  console.log(query)
  database.query(query,function (error,results,fields){
    if(error){
      res.json("error")
    }else{
      res.json(results)
    }
  })
  // ResponseObj.successResponse(res, { username: "Deepak" });
});

module.exports = router;
