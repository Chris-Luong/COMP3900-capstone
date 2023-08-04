import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { getBookings, updateBooking } from "../Helper";

const CURRENT_DAY = dayjs().format("YYYY-MM-DD");

const ReservationDashboard = (props) => {
  const accountId = props.accountId;
  const date = props.date;

  const [bookings, setBookings] = useState([]);
  const [triggerRerender, setTriggerRerender] = useState(false);

  // Fetch reservations from the server
  useEffect(() => {
    const retrieveReservations = async () => {
      let bookingData = null;
      try {
        // If accountId and date are not provided, fetch today's reservations
        if (!accountId && !date) {
          bookingData = await getBookings("", CURRENT_DAY);
        } else {
          // Fetch reservations based on accountId or date
          bookingData = accountId
            ? await getBookings(accountId, "")
            : await getBookings("", date);
        }
        setBookings(bookingData);
      } catch (err) {
        console.log(err);
        alert(err);
      }
    };
    retrieveReservations();
  }, [triggerRerender, accountId, date]);

  // Display the appropriate heading based on waitstaff/customer view
  const dashboardHeading = () => {
    return accountId ? "Your Reservations" : "Today's Reservations";
  };

  // Display the title of the booking based on waitstaff/customer view
  const title = (booking) => {
    if (accountId) {
      const formattedStart = dayjs(booking.date).format("dddd, MMMM D, YYYY");
      return formattedStart;
    } else {
      return `Booking ${booking.bookId}: ${booking.email}`;
    }
  };

  // Function to handle confirming customer arrival
  const handleStatusUpdate = async (bookId) => {
    const body = { bookingId: bookId };
    const res = await updateBooking(body);
    console.log(res);
    setTriggerRerender(!triggerRerender);
  };

  // Function to render the reservation cards
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
      return booking.isSeated === 0 ? (
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
              title={title(booking)}
              subheader={`${dates[idx][0]} - ${dates[idx][1]}`}
            />
            <Divider />
            <CardContent>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Table: {booking.tableId}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Booking: {booking.bookId}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Party Size: {booking.guests}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Table capacity: {booking.tableCapacity}
              </Typography>
              {!accountId ? (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleStatusUpdate(booking.bookId)}
                >
                  Confirm Customer Arrival
                </Button>
              ) : null}
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
        component="h2"
        variant="h5"
        color="secondary"
        gutterBottom
        sx={{ mb: 3 }}
      >
        {dashboardHeading()}
      </Typography>
      <Grid container spacing={2}>
        {bookingCards()}
      </Grid>
    </Paper>
  );
};

export default ReservationDashboard;