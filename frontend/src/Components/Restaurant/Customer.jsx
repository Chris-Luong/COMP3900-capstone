import { useState } from "react";

import dayjs from "dayjs";
// might need to npm install the below
// import utc from "dayjs/plugins/utc";
// import timezone from "dayjs/plugins/timezone";

import {
  Box,
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
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Formik } from "formik";
import { createBooking, createBookingSchema } from "../Helper";

// dayjs.extend(utc);
// dayjs.extend(timezone);
// use dayjs.utc() to once the above work

const Customer = () => {
  const [datetime, setDatetime] = useState(dayjs);
  const accountId = localStorage.getItem("accountId");
  const MAX_GUESTS = 10;

  // TODO: handleSubmit fn when user presses submit, gets info from form and
  // does calculation for numHours. Then sends POST request
  // Similar to manager new item form

  const setDuration = (numGuests) => {
    if (numGuests <= 4) return 1;
    if (numGuests <= 8) return 2;
    return 3;
  };

  const data = {
    date: "",
    start_time: "",
    guests: 1,
    accountId: accountId,
    numHours: setDuration(MAX_GUESTS),
  };
  // Returns bookingId

  const handleSubmit = async (values) => {
    console.log(`datetime: ${datetime}`);
    console.log(`guests: ${values.guests}`);
    const body = {
      date: "",
      start_time: "",
      guests: values.guests,
      accountId: accountId,
      numHours: setDuration(values.guests),
    };
    // const bookingId = await createBooking(body);
    // console.log(bookingId);
  };

  const bookingForm = (
    <Box
      position='flex'
      sx={{
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 2,
        p: 4,
      }}
    >
      <Typography variant='h5' color='secondary' gutterBottom>
        Make A Reservation
      </Typography>
      <Formik
        validationSchema={createBookingSchema}
        onSubmit={(values) => handleSubmit(values)}
        initialValues={{ datetime: "", guests: 1 }}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Stack spacing={3} direction='column' width='100%' mb={3}>
              {/* TODO: form validation */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DateTimePicker", "DateTimePicker"]}
                >
                  <DateTimePicker
                    label='Select a date and time'
                    name='datetime'
                    // timezone='Australia/Sydney'
                    value={datetime}
                    onChange={(newValue) => setDatetime(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <TextField
                label='Number of guests'
                name='guests'
                type='number'
                onChange={handleChange}
                error={touched.guests && errors.guests}
                required
              />
            </Stack>
            <Button color='success' type='submit'>
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );

  const dashboard = () => {
    const retrieveOrders = async () => {
      // TODO: get bookings with account id. Make past bookings a greyed out colour

      // const orderData = await retrieveOrdersByStatus(status);
      const orderData = {};
      console.log(orderData);
      return orderData;
    };
    const bookings = retrieveOrders();

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
          Your Reservations
        </Typography>
        {Object.keys(bookings).length === 0 ? (
          <Typography sx={{ mt: "35px" }}>
            No existing reservations. Make one today!
          </Typography>
        ) : (
          <></>
          // <Grid container spacing={2}>
          //     <>
          //       {Object.keys(bookings).map((orderId) => (
          //         <Grid item xs={12} sm={4} md={3} key={orderId}>
          //           <Card
          //             sx={{
          //               width: "100%",
          //               height: "100%",
          //               margin: "10px",
          //               cursor: "pointer",
          //               border: 1,
          //               borderColor: "rgba(216, 206, 222, 0.8)",
          //               transition: "all 0.3s ease-out",
          //               "box-shadow": "0 14px 26px rgba(0, 0, 0, 0.04)",
          //               "&:hover": {
          //                 transform:
          //                   "translateY(-5px) scale(1.005) translateZ(0)",
          //                 "box-shadow": "0 12px 24px rgba(156, 39, 176, 0.5)",
          //               },
          //             }}
          //           >
          //             <CardHeader
          //               title={`Order ${orderId} Table ${orders[orderId].tableId}`}
          //               subheader={orders[orderId].orderTime}
          //             />
          //             <Divider />
          //             <CardContent>
          //               <List>
          //                 {orders[orderId].items.map((item, index) => (
          //                   <ListItem
          //                     key={`${orderId}-${item.itemId}-${index}`}
          //                     onClick={() => handleStatusUpdate(item.orderItemId)}
          //                     sx={{
          //                       "&:hover": {
          //                         backgroundColor: "rgba(125, 50, 168)",
          //                         color: "white",
          //                         cursor: "pointer",
          //                       },
          //                       borderRadius: "5px",
          //                     }}
          //                   >
          //                     <ListItemText
          //                       disableTypography
          //                       primary={
          //                         <Typography>
          //                           {item.quantity} {item.itemName}
          //                         </Typography>
          //                       }
          //                       secondary={
          //                         <Typography>
          //                           {item.note ? `Note: ${item.note}` : null}
          //                         </Typography>
          //                       }
          //                     />
          //                     {/* <Typography align='right'>{item.amount}</Typography> */}
          //                   </ListItem>
          //                 ))}
          //               </List>
          //             </CardContent>
          //           </Card>
          //         </Grid>
          //       ))}
          //     </>
          // </Grid>
        )}
      </Paper>
    );
  };

  return (
    <>
      <Typography
        component='h1'
        variant='h2'
        color='secondary'
        gutterBottom
        sx={{ mb: 3 }}
      >
        Customer Dashboard
      </Typography>
      <Box
        display='flex'
        sx={{
          flexDirection: "column",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        {bookingForm}
        {/* TODO: make a separate dashboard for customer */}
        {/* Maybe map each dashboard to an order and clean up dashboard UI */}
      </Box>
      {dashboard()}
    </>
  );
};

export default Customer;
