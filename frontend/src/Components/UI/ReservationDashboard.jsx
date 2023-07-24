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

// TODO: useTimeout or something to poll for new orders every 30 seconds

const ReservationDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState({});
  // TODO: use dayjs to get current date and convert to below format
  const date = "2023-07-22";

  useEffect(() => {
    setLoading(true);
    const retrieveReservations = async () => {
      const bookingData = await getReservations(date);
      console.log(bookingData);
      setBookings(bookingData);
      setLoading(false);
    };
    retrieveReservations();
  });

  console.log(bookings);
  return (
    <>
      {loading && <CircularProgress />}
      {!loading && (
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
      )}
    </>
  );
};

export default ReservationDashboard;
