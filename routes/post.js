var express = require("express");
var router = express.Router();
const ResponseObj = require("../service/Response.service");
var database = require("../service/Contanst");
const { query } = require("express");

router.get("/orders", function (req, res, next) {
  let newQuery = `select * from product`;
  // let table = `LIBCON_CMS_User`
  let table = `product`
  database.query(`select * from ${table}`,newQuery, function (error, results, fields) {
    if (error) {
      // throw error;
      res.json({results:error.sqlMessage});
      // ResponseObj.tableNoteFound(res);
    } else {
      res.json({ data: results });
    }
  });
});

router.post("/order", function (req, res, next) {
  let name = req.body.name;
  console.log("name :- ", name);
  let sqlQuery = `insert into product(name) value("${name}") `;
  let newQuery = `select * from product`;
  database.query(sqlQuery, newQuery, function (error, results, fields) {
    // if (error) throw error;
    // console.log(results);
    // res.json(results);

    if (error) {
      // throw error;
      res.json({results:error.sqlMessage});
      // ResponseObj.tableNoteFound(res);
    } else {
      // res.json({ data: results });

      database.query(newQuery, function (error, results, fields) {
        if (error) {
          res.json({error});
        } else {
          res.json({ data: results });
        }
      });
      
    }
  });
});

router.delete("/delete-orders", function (req, res, next) {
  //   ordersController.DeleteOrder(req, res);
  let id = req.body.id;
  let query = `delete from product where id=${id}`;
  database.query(query, function (error, results, fields) {
    if (error) {
      res.json("error");
    } else {
      res.json(results);
    }
  });
  // ResponseObj.successResponse(res, { username: "Deepak" });
});

router.put("/update", function (req, res, next) {
  let id = req.body.id;
  let name = req.body.name;
  let myQuery = `update product set name='${name}' where id=${id}`;
  let newQuery = `select * from product where id=${id}`;
  console.log('my query :- ',myQuery)
  database.query(myQuery,newQuery, function (error, results, fields) {
    if (error) {
      res.json({error});
    } else {
      // res.json(results);
      database.query(newQuery, function (error, results, fields) {
        if (error) {
          res.json({error});
        } else {
          res.json(results);
        }
      });
    }
  });

  
});

module.exports = router;
