let express = require("express");
let mysql = require("mysql2");
var cors = require("cors");
let app = express();
app.use(express.json());
app.use(cors());

let connection = mysql.createConnection({
  host: "bqav9dyn3cveokc3dv81-mysql.services.clever-cloud.com",
  user: "umqjdbkyemylrjdo",
  password: "MNZEIXg7cV3vBjwhu9nD",
  database: "bqav9dyn3cveokc3dv81",
});

connection.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }
  //   console.log(res);
  console.log("Connected to the MySQL server.");
});

app.get("/users", function (req, res) {
  connection.query("select * from users", function (err, result, fields) {
    console.log(err);
    console.log(result);
    console.log(fields);
    res.send(result);
  });
});

app.get("/users/:id", (req, res) => {
  const elem = req.params;
  connection.query("select * from users", function (err, result, fields) {
    console.log(result);
    for (let i = 0; i < result.length; i++) {
      if (elem.id == result[i].id) {
        res.send(result[i]);
      }
    }
  });
});

app.delete("/users/:id", (req, res) => {
  const elem = req.params.id;

  connection.query(
    `DELETE FROM users WHERE id=${elem}`,
    function (err, result, fields) {
      console.log(result);
      res.send(result);
    }
  );
});

app.post("/users/", (req, res) => {
  let obj = req.body;
  console.log(obj);
  connection.query(
    `INSERT INTO users (id, ad, soyad, password, address)
    VALUES ("${obj.id}", "${obj.ad}", "${obj.soyad}", "${obj.password}", "${obj.address}")`,
    function (err, result, fields) {
      res.send(result);
    }
  );
});

app.listen(process.env.PORT || 3000);
