const findBooking = 
`SELECT t.id as table_id, t.table_name as table_name, t.capacity as capacity
FROM tables t
LEFT JOIN bookings b ON t.id = b.table_id AND b.date = ? AND b.time = ?
WHERE t.capacity >= ? AND b.id IS NULL;`

const createBookingByTableId = `INSERT INTO bookings (user_id, table_id, date, time)
VALUES (?, ?, ?, ?, ?);`

module.exports = {   
    findBooking, 
    createBookingByTableId
};