import * as React from "react";
import { getReservations } from "../Helper";
import { useState, useEffect } from "react";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";

// TODO: useTimeout or something to poll for new orders every 30 seconds
const CURRENT_DAY = dayjs().format("YYYY-MM-DD");

const ReservationDashboard = () => {
  // const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const date = "2023-07-22";
  console.log(`date is ${date}`);

  useEffect(() => {
    // setLoading(true);
    const retrieveReservations = async () => {
      const bookingData = await getReservations("", date);
      // console.log(`bookingdata is ${JSON.stringify(bookingData)}`);
      setBookings(bookingData);
      // setLoading(false);
    };
    retrieveReservations();
  }, []);

  // TODO: get formmatted dates to be correct, then display
  // TODO: implement notification banner instead of alerts
  const bookingCards = () => {
    const dates = bookings.map((booking) => {
      const formattedStart = dayjs(booking.bookingStart).format("h:mm A");
      const formattedEnd = dayjs(booking.bookingEnd).format("h:mm A");
      console.log(formattedStart, formattedEnd);
    });
    return bookings.map((booking) => (
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
            title={booking.userName}
            subheader={`${booking.bookingStart} - ${booking.bookingEnd}`}
          />
          <Divider />
          <CardContent>
            <Typography variant='body2' color='textSecondary'>
              Table: {booking.tableId}
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              Party Size: {booking.guests}
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              Table capacity: {booking.tableCapacity}
            </Typography>
          </CardContent>
          <Button>Confirm Customer Arrival</Button>
        </Card>
      </Grid>
    ));
  };

  return (
    // <>
    //   {loading && <CircularProgress />}
    //   {!loading && (
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
    //   )}
    // </>
  );
};

export default ReservationDashboard;
