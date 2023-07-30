import * as React from "react";
import { getBookings, updateBooking } from "../Helper";
import { useState, useEffect } from "react";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";

const CURRENT_DAY = dayjs().format("YYYY-MM-DD");

const ReservationDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [triggerRerender, setTriggerRerender] = useState(false);
  const date = "2023-07-29";

  useEffect(() => {
    // setLoading(true);
    const retrieveReservations = async () => {
      const bookingData = await getBookings("", date);
      console.log(`bookingdata is ${JSON.stringify(bookingData)}`);
      setBookings(bookingData);
      // setLoading(false);
    };
    retrieveReservations();
  }, [triggerRerender]);

  const handleStatusUpdate = async (bookId) => {
    console.log("clicked confirm customer");

    const body = { bookingId: bookId };
    const res = await updateBooking(body);
    console.log(res);
    setTriggerRerender(!triggerRerender);
  };
  // TODO: implement notification banner instead of alerts
  const bookingCards = () => {
    const dates = bookings.map((booking) => {
      const formattedStart = dayjs(booking.bookingStart, "HH:mm:ss").format(
        "h:mm A"
      );
      const formattedEnd = dayjs(booking.bookingEnd, "HH:mm:ss").format(
        "h:mm A"
      );
      return [formattedStart, formattedEnd];
    });

    return bookings.map((booking, idx) => {
      return booking.is_seated === 0 ? (
        <Grid item xs={12} sm={4} md={3} key={booking.bookId}>
          <Card
            sx={{
              width: "100%",
              height: "100%",
              margin: "10px",
              border: 1,
              borderColor: "rgba(216, 206, 222, 0.8)",
              transition: "all 0.3s ease-out",
              boxShadow: "0 14px 26px rgba(0, 0, 0, 0.04)",
              "&:hover": {
                transform: "translateY(-5px) scale(1.005) translateZ(0)",
                boxShadow: "0 12px 24px rgba(156, 39, 176, 0.5)",
              },
            }}
          >
            <CardHeader
              title={`Booking ${booking.bookId}: ${booking.email}`}
              subheader={`${dates[idx][0]} - ${dates[idx][1]}`}
            />
            <Divider />
            <CardContent>
              <Typography variant='body2' color='textSecondary'>
                Table: {booking.tableId}
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                Party Size: {booking.guests}
              </Typography>
              <Typography variant='body2' color='textSecondary' gutterBottom>
                Table capacity: {booking.tableCapacity}
              </Typography>
              <Button
                variant='contained'
                color='secondary'
                onClick={() => handleStatusUpdate(booking.bookId)}
              >
                Confirm Customer Arrival
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ) : null;
    });
  };

  return (
    <Paper
      elevation={6}
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        padding: 5,
        margin: 5,
      }}
    >
      <Typography
        component='h2'
        variant='h5'
        color='secondary'
        gutterBottom
        sx={{ mb: 3 }}
      >
        Today's Reservations
      </Typography>
      <Grid container spacing={2}>
        {bookingCards()}
      </Grid>
    </Paper>
  );
};

export default ReservationDashboard;
