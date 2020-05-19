const express = require("express");
const cors = require("cors");
const knex = require("knex");
const mysql = require("mysql");

const quarantineCenter = require("./controllers/quarantineCenter");
const currentUser = require("./controllers/currentUser");
const managePatients = require("./controllers/managePatients");
const manageStaffs = require("./controllers/manageStaffs");
const manageRequests = require("./controllers/manageRequest");
const manageUsers = require("./controllers/manageUsers");
const password = require("../password");

const app = express();

app.use(express.json());
app.use(cors());

const db = knex({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: password.password(),
    database: "databaseProject",
  },
});

const con = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: password.password(),
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

app.get("/centerType", (req, res) => {
  quarantineCenter.handleCenterType(req, res, db);
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

app.get("/patient", (req, res) => {
  managePatients.handlePatient(req, res, db);
});

app.post("/newPatient", (req, res) => {
  managePatients.handleNewPatient(req, res, db);
  update();
});

app.post("/editPatient", (req, res) => {
  managePatients.handleEditPatient(req, res, db);
  update();
});

app.post("/deletePatient", (req, res) => {
  managePatients.handleDeletePatient(req, res, db);
  update();
});

app.get("/staffrole", (req, res) => {
  manageStaffs.handlerole(req, res, db);
});
app.get("/staff", (req, res) => {
  manageStaffs.handleStaff(req, res, db);
});

app.post("/newStaff", (req, res) => {
  manageStaffs.handleNewStaff(req, res, db);
  update();
});

app.post("/editStaff", (req, res) => {
  manageStaffs.handleEditStaff(req, res, db);
  update();
});

app.post("/deleteStaff", (req, res) => {
  manageStaffs.handleDeleteStaff(req, res, db);
  update();
});

app.get("/test", (req, res) => {
  db("user").then((data) => {
    res.json(data);
  });
});

app.get("/request", (req, res) => {
  manageRequests.handleRequest(req, res, db);
});

app.post("/newRequest", (req, res) => {
  manageRequests.handleNewRequest(req, res, db);
});

app.post("/requestActions", (req, res) => {
  manageRequests.handleRequestActions(req, res, db);
});

app.post("/deleteRequest", (req, res) => {
  manageRequests.handleDeleteRequest(req, res, db);
});

app.get("/user", (req, res) => {
  manageUsers.handleUser(req, res, db);
});

app.post("/newUser", (req, res) => {
  manageUsers.handleNewUser(req, res, db);
});

app.post("/editUser", (req, res) => {
  manageUsers.handleEditUser(req, res, db);
});

app.post("/deleteUser", (req, res) => {
  manageUsers.handleDeleteUser(req, res, db);
});

app.get("/userrole", (req, res) => {
  db("user_role")
    .select()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json("cant'get center types");
    });
});

app.post("/getcenteruser", (req, res) => {
  const { user_id } = req.body;
  db("center")
    .where("user_id", Number(user_id))
    .select()
    .then((data) => res.json(data[0]))
    .catch((err) => {
      res.status(400).json("cant'get center types");
    });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is listening to port ${process.env.PORT}`);
});
