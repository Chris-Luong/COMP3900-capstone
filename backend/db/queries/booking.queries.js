const findBooking = 
`SELECT t.id as tableId, t.tableName as tableName, t.capacity as capacity
FROM tables t
LEFT JOIN bookings b ON t.id = b.table_id AND b.date = ? AND b.time = ?
WHERE t.capacity >= ? AND b.id IS NULL;`

const findBookingByAccountId = `
SELECT * from bookings where user_id = ? and date = ?
`
const createBookingByTableId = `INSERT INTO bookings(user_id, table_id, date, time, guests)
VALUES (?, ?, ?, ?, ?);`

const viewBookingsByDate =  `
SELECT b.id as bookId, a.lastname AS userName, t.tableName as tableName, b.time as bookingTime, b.guests as guests
FROM bookings b
JOIN account a ON b.user_id = a.accountId
JOIN tables t ON b.table_id = t.id
WHERE b.date = ?
ORDER BY b.time ASC;
`

module.exports = {   
    findBooking, 
    createBookingByTableId,
    findBookingByAccountId,
    viewBookingsByDate
};