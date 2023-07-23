const insertRequest = `
INSERT INTO requests(tableId, type)
VALUES (?, ?)
`;

const getRequest = `
SELECT * FROM requests
WHERE status = ?
ORDER BY timestamp
`;

const updateRequest = `
UPDATE requests
SET status = ?
WHERE id = ?
`;

module.exports = {
  insertRequest,
  getRequest,
  updateRequest,
};
