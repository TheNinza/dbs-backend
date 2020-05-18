const handleStaff = (req, res, db) => {
  db("staff")
    .join("center", "center.center_id", "staff.center_id")
    .join("staff_role", "staff_role.role_id", "staff.role_id")
    .then((data) => res.json(data))
    .catch((err) => {
      res.status(400).json("Can't get staffs");
      console.log(err);
    });
};

const handlerole = (req, res, db) => {
  db("staff_role")
    .select()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json("cant'get center types");
    });
};

const handleNewStaff = (req, res, db) => {
  const {
    staff_name,
    staff_contact_number,
    role_id,
    working_hours,
    center_id,
  } = req.body;
  db("staff")
    .insert({
      staff_name: staff_name,
      staff_contact_number: staff_contact_number,
      role_id: Number(role_id),
      working_hours: working_hours,
      center_id: Number(center_id),
    })
    .then((data) => {
      db("staff")
        .where("staff_id", data[0])
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

const handleEditStaff = (req, res, db) => {
  const {
    staff_name,
    staff_contact_number,
    role_id,
    working_hours,
    staff_id,
    center_id,
  } = req.body;

  try {
    if (staff_name.length) {
      db("staff")
        .where("staff_id", "=", Number(staff_id))
        .update("staff_name", `${staff_name}`)
        .then((data) => {
          if (data !== 1) {
            throw "error";
          }
        })
        .catch((err) => res.status(400).json("unable to update"));
    }

    if (staff_contact_number.length) {
      db("staff")
        .where("staff_id", "=", Number(staff_id))
        .update("staff_contact_number", Number(staff_contact_number))
        .then((data) => {
          if (data !== 1) {
            throw "error";
          }
        });
    }

    if (role_id.length) {
      db("staff")
        .where("staff_id", "=", Number(staff_id))
        .update("role_id", Number(role_id))
        .then((data) => {
          if (data !== 1) {
            throw "error";
          }
        });
    }

    if (working_hours.length) {
      db("staff")
        .where("staff_id", Number(staff_id))
        .update("working_hours", `${working_hours}`)
        .then((data) => {
          if (data !== 1) {
            res.status(400).json("No such user");
            throw "error";
          }
        })
        .catch((err) => res.status(400).json("unable to update"));
    }

    if (center_id.length) {
      db("staff")
        .where("staff_id", "=", Number(staff_id))
        .update("center_id", Number(center_id))
        .then((data) => {
          if (data !== 1) {
            throw "error";
          }
        });
    }

    db("staff")
      .where("staff_id", Number(staff_id))
      .then((data) => res.json(data[0]))
      .catch((err) => res.status(400).json(err));
  } catch (err) {
    console.log("catch", err);
    return res.status(400).json("Unable to Update");
  }
};

const handleDeleteStaff = (req, res, db) => {
  const { staff_id } = req.body;

  db("staff")
    .where("staff_id", Number(staff_id))
    .del()
    .then((data) => {
      console.log("deletestaff:", data);
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(error);
    });
};

module.exports = {
  handleStaff,
  handleNewStaff,
  handleEditStaff,
  handleDeleteStaff,
  handlerole,
};
