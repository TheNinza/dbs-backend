const handleNewCenter = (req, res, db) => {
  const {
    center_name,
    center_address,
    center_contact_number,
    center_type_id,
    user_id,
  } = req.body;

  db("center")
    .insert({
      center_name: center_name,
      center_address: center_address,
      center_contact_number: Number(center_contact_number),
      center_type_id: Number(center_type_id),
    })
    .then((data) => {
      if (user_id.length) {
        db("center")
          .where("center_id", data[0])
          .update("user_id", Number(user_id))
          .catch((err) => console.log("error", err));
      }
      db("center")
        .where("center_id", data[0])
        .then((value) => res.json(value[0]))
        .catch((err) => console.log("error", err));
    })
    .catch((err) => {
      console.log("error", err);
      res.status(400).json(err);
    });
};

const handleCenter = (req, res, db) => {
  db("center")
    .join("center_type", "center.center_type_id", "center_type.center_type_id")
    .leftJoin("user", "center.user_id", "user.user_id")
    .select()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("can't get centers"));
};

const handleCenterType = (req, res, db) => {
  db("center_type")
    .select()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json("cant'get center types");
    });
};

const handleEditCenter = (req, res, db) => {
  const {
    center_id,
    center_name,
    center_address,
    center_contact_number,
    center_type_id,
    user_id,
  } = req.body;

  try {
    if (center_name.length) {
      db("center")
        .where("center_id", "=", Number(center_id))
        .update("center_name", `${center_name}`)
        .then((data) => {
          if (data !== 1) {
            throw "error";
          }
        })
        .catch((err) => res.status(400).json("unable to update"));
    }

    if (center_address.length) {
      db("center")
        .where("center_id", "=", Number(center_id))
        .update("center_address", `${center_address}`)
        .then((data) => {
          if (data !== 1) {
            throw "error";
          }
        });
    }

    if (center_contact_number.length) {
      db("center")
        .where("center_id", "=", Number(center_id))
        .update("center_contact_number", Number(center_contact_number))
        .then((data) => {
          if (data !== 1) {
            throw "error";
          }
        });
    }

    if (center_type_id.length) {
      db("center")
        .where("center_id", "=", Number(center_id))
        .update("center_type_id", Number(center_type_id))
        .then((data) => {
          if (data !== 1) {
            throw "error";
          }
        });
    }

    if (user_id.length) {
      db("center")
        .where("center_id", Number(center_id))
        .update("user_id", Number(user_id))
        .then((data) => {
          if (data !== 1) {
            res.status(400).json("No such user");
            throw "error";
          }
        })
        .catch((err) => res.status(400).json("unable to update"));
    }

    db("center")
      .where("center_id", Number(center_id))
      .then((data) => res.json(data[0]))
      .catch((err) => res.status(400).json(err));
  } catch (err) {
    console.log("catch", err);
    return res.status(400).json("Unable to Update");
  }
};

const handleDeleteCenter = (req, res, db) => {
  const { center_id } = req.body;

  db("center")
    .where("center_id", Number(center_id))
    .del()
    .then((data) => {
      console.log("deleteCenter:", data);
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(error);
    });
};

const handleCenterStaff = (req, res, db) => {
  const { center_id } = req.body;
  db("staff")
    .where("center_id", Number(center_id))
    .then((data) => {
      if (data.length) res.json(data);
      else res.status(400).json("No Staffs");
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const handleCenterPatient = (req, res, db) => {
  const { center_id } = req.body;
  db("patient")
    .where("center_id", Number(center_id))
    .then((data) => {
      if (data.length) res.json(data);
      else res.status(400).json("NoPatients");
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = {
  handleNewCenter,
  handleCenter,
  handleEditCenter,
  handleDeleteCenter,
  handleCenterStaff,
  handleCenterPatient,
  handleCenterType,
};
