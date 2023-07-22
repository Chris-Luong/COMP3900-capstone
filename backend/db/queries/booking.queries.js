const findBooking = 
`SELECT t.id as table_id, t.table_name as table_name, t.capacity as capacity
FROM tables t
LEFT JOIN bookings b ON t.id = b.table_id AND b.date = ? AND b.time = ?
WHERE t.capacity >= ? AND b.id IS NULL;`

const createBookingByTableId = `INSERT INTO bookings (user_id, table_id, date, time)
VALUES (?, ?, ?, ?, ?);`


const viewBookingsByDate =  `
SELECT b.id as bookId, a.lastname AS userName, t.tableName as tableName, b.time as bookingTime
FROM bookings b
JOIN accounts a ON b.user_id = a.accountId
JOIN tables t ON b.table_id = t.id
WHERE b.date = ?;
`

module.exports = {   
    findBooking, 
    createBookingByTableId,
    viewBookingsByDate
};