const handleLogin = (req, res, db) => {
  const { user_role_name, password } = req.body;
  if (password === "1234") {
    db("user")
      .join("user_role", "user.user_role_id", "user_role.user_role_id")
      .select()
      .where("user_role_name", `${user_role_name}`)
      .then((data) => {
        console.log(data);
        if (data.length) res.json(data[0]);
        else res.status(400).json("No Such User");
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json("Can't log in");
      });
  } else {
    res.status(400).json("Can't log in");
  }
};

const handleEditProfile = (req, res, db) => {
  const { user_id, user_name, user_email, user_phone, user_role_id } = req.body;

  try {
    if (user_name.length) {
      db("user")
        .where("user_id", "=", Number(user_id))
        .update("user_name", `${user_name}`)
        .then((data) => {
          if (data !== 1) {
            throw "error";
          }
        })
        .catch((err) => {
          console.log(err);
          console.log(err);
          throw err;
        });
    }

    if (user_email.length) {
      db("user")
        .where("user_id", "=", Number(user_id))
        .update("user_email", `${user_email}`)
        .then((data) => {
          if (data !== 1) {
            throw "error";
          }
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
    }

    if (user_phone.length) {
      db("user")
        .where("user_id", "=", Number(user_id))
        .update("user_phone", Number(user_phone))
        .then((data) => {
          if (data !== 1) {
            throw "error";
          }
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
    }

    db("user")
      .where("user_id", Number(user_id))
      .then((data) => res.json(data[0]))
      .catch((err) => res.status(400).json(err));
  } catch (err) {
    console.log(err);
    return res.status(400).json("Unable to Update");
  }
};

module.exports = { handleLogin, handleEditProfile };
