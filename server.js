const express = require("express");
const cors = require("cors");
const knex = require("knex");

const app = express();

app.use(express.json());
app.use(cors());

const db = knex({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "#No12sql#",
    database: "databaseproject",
  },
});

app.get("/", (req, res) => {
  db.select()
    .from("users")
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});

app.post("/login", (req, res) => {
  const { user } = req.body;
  db("users")
    .join("user_role", "users.user_role_id", "user_role.user_role_id")
    .select()
    .then((data) => console.log(data))
    .catch((err) => {
      console.log(err);
    });
});

app.listen(3000, () => {
  console.log("App is listening to port 3000");
});
