import * as React from "react";
import { getReservations } from "../Helper";
import { useState, useEffect } from "react";

import {
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
  const [bookings, setBookings] = useState({});
  const date = "2023-07-22";
  console.log(`date is ${date}`);

  // TODO: this doesn't seem to run
  useEffect(() => {
    // setLoading(true);
    const retrieveReservations = async () => {
      // NOTE: if returnds object, could use JSON.stringify from chatGPT suggestion
      const bookingData = await getReservations("", date);
      console.log(`bookingdata is ${JSON.stringify(bookingData)}`);
      setBookings(bookingData);
      // setLoading(false);
    };
    retrieveReservations();
  }, []);

  console.log(`bookings is ${JSON.stringify(bookings)}`);
  bookings.map((booking) =>
    console.log(`each booking Id is ${booking.bookId}`)
  );
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
    </Paper>
    //   )}
    // </>
  );
};

export default ReservationDashboard;
