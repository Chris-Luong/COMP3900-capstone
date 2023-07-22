const { Request } = require("../models/request.model");

createRequest = (req, res) => {
  const { tableId, type } = req.body;
  Request.createRequest(tableId, type, (err, result) => {
    if (err) {
      return res.status(err.status).json({ message: err.message });
    }
    if (!result) {
      return res.status(404).json({ message: "Cannot create request" });
    }
    // emit WebSocket event for waiter staff to listen
    const data = {
      type: "newRequest",
      message: "Refresh page. New request available!",
    };
    req.wss.clients.forEach((client) => {
      client.send(JSON.stringify(data));
    });
    return res.status(200).json({ message: "Request created" });
  });
};

getRequest = (req, res) => {
  const status = req.query.status;
  Request.getRequest(status, (err, result) => {
    if (err) {
      return res.status(err.status).json({ message: err.message });
    }
    if (!result) {
      return res.status(404).json({ message: "Cannot get request" });
    }
    return res.status(200).json(result);
  });
};

updateRequest = (req, res) => {
  const id = req.query.id;
  Request.updateRequest(id, (err, result) => {
    if (err) {
      return res.status(err.status).json({ message: err.message });
    }
    if (!result) {
      return res.status(404).json({ message: "Cannot update request" });
    }
    return res.status(200).json({ message: "Request updated" });
  });
};

module.exports = {
  createRequest,
  getRequest,
  updateRequest,
};
