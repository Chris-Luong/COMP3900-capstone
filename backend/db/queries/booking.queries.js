const findBooking = 
`SELECT t.id as tableId, t.tableName as tableName, t.capacity as capacity
FROM tables t
LEFT JOIN bookings b ON t.id = b.table_id AND b.date = ? 
AND ((b.start_time <= ? AND b.end_time > ?) 
    OR(b.start_time >= ? AND b.start_time < ?))
WHERE t.capacity >= ? AND b.id IS NULL;`

const findBookingByAccountId = `
SELECT * from bookings 
WHERE user_id = ? AND date = ?
`

const createBookingByTableId = `INSERT INTO bookings(user_id, table_id, date, start_time, end_time, guests)
VALUES (?, ?, ?, ?, ?, ?);`

const viewBookingsByDate =  `
SELECT b.id as bookId, a.lastname AS userName, t.id as tableId, t.capacity as tableCapacity, b.start_time as bookingStart, b.end_time as bookingEnd, b.guests as guests
FROM bookings b
JOIN account a ON b.user_id = a.accountId
JOIN tables t ON b.table_id = t.id
WHERE b.date = ?
ORDER BY b.start_time ASC;
`

module.exports = {   
    findBooking, 
    createBookingByTableId,
    findBookingByAccountId,
    viewBookingsByDate
};