const express = require("express");
const cors = require("cors");
const knex = require("knex");
const mysql = require("mysql");

const quarantineCenter = require("./controllers/quarantineCenter");
const currentUser = require("./controllers/currentUser");

const app = express();

app.use(express.json());
app.use(cors());

const db = knex({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "#No12sql#",
    database: "databaseProject",
  },
});

const con = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "#No12sql#",
  database: "databaseProject",
});

const update = () => {
  con.query(
    "update center set number_staffs = ( select count(*) from staff where staff.center_id = center.center_id);",
    (err, results, fields) => {
      if (err) console.log(err);
      else {
        console.log(results);
      }
    }
  );

  con.query(
    "update center set number_patients = ( select count(*) from patient where patient.center_id = center.center_id)",
    (err, results, fields) => {
      if (err) res.status(400).json(err);
      else {
        console.log(results);
      }
    }
  );
};

app.get("/", (req, res) => {
  res.json("it is working");
});

app.post("/login", (req, res) => {
  currentUser.handleLogin(req, res, db);
});

app.put("/editProfile", (req, res) => {
  currentUser.handleEditProfile(req, res, db);
});

app.put("/editCenter", (req, res) => {
  quarantineCenter.handleEditCenter(req, res, db);
});

app.get("/center", (req, res) => {
  update();
  quarantineCenter.handleCenter(req, res, db);
});

app.post("/newCenter", (req, res) => {
  quarantineCenter.handleNewCenter(req, res, db);
});

app.post("/deleteCenter", (req, res) => {
  quarantineCenter.handleDeleteCenter(req, res, db);
});

app.post("/centerStaff", (req, res) => {
  quarantineCenter.handleCenterStaff(req, res, db);
});

app.post("/centerPatient", (req, res) => {
  quarantineCenter.handleCenterPatient(req, res, db);
});

app.get("/test", (req, res) => {
  db("users").then((data) => {
    res.json(data);
  });
});

app.listen(3000, () => {
  console.log("App is listening to port 3000");
});
