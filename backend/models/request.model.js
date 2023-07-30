const db = require("../db/db");
const {
  insertRequest,
  getRequest,
  updateRequest,
} = require("../db/queries/request.queries");

class Request {
  static createRequest(tableId, type, next) {
    db.query(insertRequest, [tableId, type], (err, results) => {
      if (err) {
        next({
          status: 400,
          message: "Error creating a new request",
          kind: "cannot_create",
        });
        return;
      }
      next(null, results);
    });
  }

  static getRequest(status, next) {
    db.query(getRequest, status, (err, results) => {
      if (err) {
        next({
          status: 400,
          message: "Error getting requests",
          kind: "cannot_get",
        });
        return;
      }
      let result = JSON.parse(JSON.stringify(results));
      result.forEach((request, index) => {
        const time = new Date(request.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        result[index] = { ...request, timestamp: time };
      });
      next(null, result);
    });
  }

  static updateRequest(id, next) {
    db.query(updateRequest, ["Completed", id], (err, results) => {
      if (err) {
        next({
          status: 400,
          message: "Error updating request",
          kind: "cannot_update",
        });
        return;
      }
      let result = JSON.stringify(results);
      next(null, result);
    });
  }
}
module.exports = { Request };
