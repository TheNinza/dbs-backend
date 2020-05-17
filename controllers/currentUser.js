const handleLogin = (req, res, db) => {
  const { user } = req.body;
  db("users")
    .join("user_role", "users.user_role_id", "user_role.user_role_id")
    .select()
    .where("user_role_name", "=", `${user}`)
    .then((data) => {
      console.log(data);
      if (data.length) res.json(data[0]);
      else res.status(400).json("No Such User");
    })
    .catch((err) => {
      console.log(err);
      res.status;
    });
};

const handleEditProfile = (req, res, db) => {
  const { user_id, user_name, user_email, user_phone, user_role_id } = req.body;

  try {
    if (user_name.length) {
      db("users")
        .where("user_id", "=", Number(user_id))
        .update("user_name", `${user_name}`)
        .then((data) => {
          if (data !== 1) {
            throw "error";
          }
        })
        .catch((err) => {
          throw err;
        });
    }

    if (user_email.length) {
      db("users")
        .where("user_id", "=", Number(user_id))
        .update("user_email", `${user_email}`)
        .then((data) => {
          if (data !== 1) {
            throw "error";
          }
        })
        .catch((err) => {
          throw err;
        });
    }

    if (user_phone.length) {
      db("users")
        .where("user_id", "=", Number(user_id))
        .update("user_phone", Number(user_phone))
        .then((data) => {
          if (data !== 1) {
            throw "error";
          }
        })
        .catch((err) => {
          throw err;
        });
    }

    if (user_role_id.length) {
      db("users")
        .where("user_id", "=", Number(user_id))
        .update("user_role_id", Number(user_role_id))
        .then((data) => {
          if (data !== 1) {
            throw "error";
          }
        })
        .catch((err) => {
          throw err;
        });
    }
    db("users")
      .where("user_id", Number(user_id))
      .then((data) => res.json(data[0]))
      .catch((err) => res.status(400).json(err));
  } catch (err) {
    console.log(err);
    return res.status(400).json("Unable to Update");
  }
};

module.exports = { handleLogin, handleEditProfile };
