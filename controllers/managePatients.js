const handlePatient = (req, res, db) => {
  db("patient")
    .join("center", "center.center_id", "patient.center_id")
    .then((data) => res.json(data))
    .catch((err) => {
      res.status(400).json("Can't get patients");
      console.log(err);
    });
};

const handleNewPatient = (req, res, db) => {
  const {
    patient_name,
    date_of_admission,
    stay_duration,
    patient_address,
    patient_status,
    center_id,
  } = req.body;
  db("patient")
    .insert({
      patient_name: patient_name,
      date_of_admission: date_of_admission,
      patient_address: patient_address,
      stay_duration: Number(stay_duration),
      patient_status: patient_status,
      center_id: Number(center_id),
    })
    .then((data) => {
      db("patient")
        .where("patient_id", data[0])
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

const handleEditPatient = (req, res, db) => {
  const {
    patient_name,
    date_of_admission,
    stay_duration,
    patient_address,
    patient_status,
    patient_id,
    center_id,
  } = req.body;

  try {
    if (patient_name.length) {
      db("patient")
        .where("patient_id", "=", Number(patient_id))
        .update("patient_name", `${patient_name}`)
        .then((data) => {
          if (data !== 1) {
            throw "error";
          }
        })
        .catch((err) => res.status(400).json("unable to update"));
    }

    if (patient_address.length) {
      db("patient")
        .where("patient_id", "=", Number(patient_id))
        .update("patient_address", `${patient_address}`)
        .then((data) => {
          if (data !== 1) {
            throw "error";
          }
        });
    }

    if (date_of_admission.length) {
      db("patient")
        .where("patient_id", "=", Number(patient_id))
        .update("date_of_admission", Number(date_of_admission))
        .then((data) => {
          if (data !== 1) {
            throw "error";
          }
        });
    }

    if (stay_duration.length) {
      db("patient")
        .where("patient_id", "=", Number(patient_id))
        .update("stay_duration", Number(stay_duration))
        .then((data) => {
          if (data !== 1) {
            throw "error";
          }
        });
    }

    if (patient_status.length) {
      db("patient")
        .where("patient_id", Number(patient_id))
        .update("patient_status", `${patient_status}`)
        .then((data) => {
          if (data !== 1) {
            res.status(400).json("No such user");
            throw "error";
          }
        })
        .catch((err) => res.status(400).json("unable to update"));
    }

    if (center_id.length) {
      db("patient")
        .where("patient_id", "=", Number(patient_id))
        .update("center_id", Number(center_id))
        .then((data) => {
          if (data !== 1) {
            throw "error";
          }
        });
    }

    db("patient")
      .where("patient_id", Number(patient_id))
      .then((data) => res.json(data[0]))
      .catch((err) => res.status(400).json(err));
  } catch (err) {
    console.log("catch", err);
    return res.status(400).json("Unable to Update");
  }
};

const handleDeletePatient = (req, res, db) => {
  const { patient_id } = req.body;

  db("patient")
    .where("patient_id", Number(patient_id))
    .del()
    .then((data) => {
      console.log("deletepatient:", data);
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(error);
    });
};

module.exports = {
  handlePatient,
  handleNewPatient,
  handleEditPatient,
  handleDeletePatient,
};
