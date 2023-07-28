const findBooking = `SELECT t.id as tableId, t.tableName as tableName, t.capacity as capacity
FROM tables t
LEFT JOIN bookings b ON t.id = b.table_id AND b.date = ? 
AND ((b.start_time <= ? AND b.end_time > ?) 
    OR(b.start_time >= ? AND b.start_time < ?))
WHERE t.capacity >= ? AND b.id IS NULL;`;

const findBookingByAccountId = `
SELECT * from bookings 
WHERE user_id = ? AND date = ?
`;

const viewBookingsByAccountId = `
SELECT b.id as bookId, t.id as tableId, t.capacity as tableCapacity, b.start_time as bookingStart, b.end_time as bookingEnd, b.guests as guests, IF(b.status = 'seated', true, false) AS is_seated
FROM bookings b
JOIN account a ON b.user_id = a.accountId
JOIN tables t ON b.table_id = t.id
WHERE b.user_id = ?
ORDER BY b.start_time ASC;
`;

const getBooking = `
SELECT * from bookings
WHERE id = ?
`;

const createBookingByTableId = `INSERT INTO bookings(user_id, table_id, date, start_time, end_time, guests)
VALUES (?, ?, ?, ?, ?, ?);`;

const viewBookingsByDate = `
SELECT b.id as bookId, a.email AS email, t.id as tableId, t.capacity as tableCapacity, b.start_time as bookingStart, b.end_time as bookingEnd, b.guests as guests, IF(b.status = 'seated', true, false) AS is_seated
FROM bookings b
JOIN account a ON b.user_id = a.accountId
JOIN tables t ON b.table_id = t.id
WHERE b.date = ?
ORDER BY b.start_time ASC;
`;

const deleteBooking = `
DELETE FROM bookings WHERE id = ?
`;

const deleteBookingByAccount = `
DELETE FROM bookings where user_id = ?
`;

const updateBookingToSeated = `
UPDATE bookings SET status = 'seated' where id = ?
`

const verifyBookingByAccount = `
SELECT id FROM bookings 
WHERE user_id = ? AND status = 'pending' AND date = ? AND start_time <= ? AND start_time + INTERVAL 15 MINUTE >= ?;
`

module.exports = {
  findBooking,
  createBookingByTableId,
  findBookingByAccountId,
  viewBookingsByAccountId,
  viewBookingsByDate,
  deleteBooking,
  deleteBookingByAccount,
  getBooking,
  updateBookingToSeated,
  verifyBookingByAccount
};
