const handleRequest = (req, res, db) => {
  db("service_request")
    .join("req_status", "service_request.status_id", "req_status.status_id")
    .join("center", "service_request.center_id", "center.center_id")
    .leftJoin("user", "service_request.user_id", "user.user_id")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json("cannot get services");
      console.log(err);
    });
};

const handleNewRequest = (req, res, db) => {
  const { center_id, request_description } = req.body;
  db("service_request")
    .insert({
      request_description: `${request_description}`,
      center_id: Number(center_id),
    })
    .then((data) => {
      db("service_request")
        .where("request_id", data[0])
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

const handleRequestActions = (req, res, db) => {
  const { request_id, user_id, status_id } = req.body;
  db("service_request")
    .where("request_id", Number(request_id))
    .update({
      status_id: Number(status_id),
      user_id: Number(user_id),
    })
    .then((data) => {
      console.log("process_req", data);
      res.json(data);
    })
    .catch((err) => console.log(err));
};

const handleDeleteRequest = (req, res, db) => {
  const { request_id } = req.body;

  db("service_request")
    .where("request_id", Number(request_id))
    .del()
    .then((data) => {
      console.log("deleterequest:", data);
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(error);
    });
};

module.exports = {
  handleRequest,
  handleNewRequest,
  handleRequestActions,
  handleDeleteRequest,
};
