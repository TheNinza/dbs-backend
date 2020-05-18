const handleUser = (req, res, db) => {
  db("user")
    .join("user_role", "user_role.user_role_id", "user.user_role_id")
    .then((data) => res.json(data))
    .catch((err) => {
      res.status(400).json("Can't get user");
      console.log(err);
    });
};

const handleNewUser = (req, res, db) => {
  const { user_name, user_email, user_phone, user_role_id } = req.body;
  db("user")
    .insert({
      user_name: user_name,

      user_email: user_email,

      user_phone: user_phone,
      user_role_id: Number(user_role_id),
    })
    .then((data) => {
      db("user")
        .where("user_id", data[0])
        .then((value) => {
          res.json(value[0]);
        })
        .catch((err) => {
          res.json(err);
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
};

const handleEditUser = (req, res, db) => {
  const {
    user_name,

    user_email,
    user_phone,
    user_id,
    user_role_id,
  } = req.body;

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
        .catch((err) => res.status(400).json("unable to update"));
    }

    if (user_email.length) {
      db("user")
        .where("user_id", "=", Number(user_id))
        .update("user_email", `${user_email}`)
        .then((data) => {
          if (data !== 1) {
            throw "error";
          }
        });
    }

    if (user_phone.length) {
      db("user")
        .where("user_id", Number(user_id))
        .update("user_phone", `${user_phone}`)
        .then((data) => {
          if (data !== 1) {
            res.status(400).json("No such user");
            throw "error";
          }
        })
        .catch((err) => res.status(400).json("unable to update"));
    }

    if (user_role_id.length) {
      db("user")
        .where("user_id", "=", Number(user_id))
        .update("user_role_id", Number(user_role_id))
        .then((data) => {
          if (data !== 1) {
            throw "error";
          }
        });
    }

    db("user")
      .where("user_id", Number(user_id))
      .then((data) => res.json(data[0]))
      .catch((err) => res.status(400).json(err));
  } catch (err) {
    console.log("catch", err);
    return res.status(400).json("Unable to Update");
  }
};

const handleDeleteUser = (req, res, db) => {
  const { user_id } = req.body;

  db("user")
    .where("user_id", Number(user_id))
    .del()
    .then((data) => {
      console.log("deleteuser:", data);
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(error);
    });
};

module.exports = {
  handleUser,
  handleNewUser,
  handleEditUser,
  handleDeleteUser,
};
