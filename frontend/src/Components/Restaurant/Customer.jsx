import { useEffect, useState } from "react";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Formik } from "formik";
import { createBooking, createBookingSchema } from "../Helper";
import ReservationDashboard from "../UI/ReservationDashboard";

dayjs.extend(utc);
dayjs.extend(timezone);
const TIMEZONE_SYDNEY = "Australia/Sydney";
const TODAY = dayjs().format("YYYY-MM-DD");
const START = dayjs().set("hour", 9).startOf("hour").format("HH:mm");
const END = dayjs().set("hour", 20).startOf("hour").format("HH:mm");
const FORM_VALIDATION_MESSAGE =
  "The number of guests must be at least 1. Please also check if your booking times are valid.";
const accountId = localStorage.getItem("login-accountId");

const Customer = () => {
  const [datetime, setDatetime] = useState(dayjs().add(1, "day").utc());

  const [numGuests, setNumGuests] = useState(1);
  const [valid, setValid] = useState(true);

  useEffect(() => {
    if (numGuests < 1) {
      setValid(false);
      return;
    }
    const dateTimeObj = dayjs(datetime).tz(TIMEZONE_SYDNEY);
    const formattedDate = dateTimeObj.format("YYYY-MM-DD");
    const formattedTime = dateTimeObj.format("HH:mm");

    if (
      formattedDate < TODAY ||
      !(START <= formattedTime && formattedTime <= END)
    ) {
      setValid(false);
      return;
    }
    setValid(true);
  }, [numGuests, datetime]);

  const setDuration = (numGuests) => {
    if (numGuests <= 3) return 1;
    if (numGuests <= 6) return 2;
    return 3;
  };

  const handleSubmit = async () => {
    if (!valid) {
      alert(FORM_VALIDATION_MESSAGE);
      return;
    }
    const dateTimeObj = dayjs(datetime).tz(TIMEZONE_SYDNEY);
    const formattedDate = dateTimeObj.format("YYYY-MM-DD");
    const formattedTime = dateTimeObj.format("HH:mm:00");

    const body = {
      date: formattedDate,
      start_time: formattedTime,
      guests: numGuests,
      accountId: accountId,
      numHours: setDuration(numGuests),
    };
    const res = await createBooking(body);

    console.log(`bookingId is ${res.bookingId}`);
    alert(`bookingId is ${res.bookingId}`);
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
      <Typography
        m={2}
        p={1}
        gutterBottom
        boxShadow={3}
        backgroundColor='rgba(223, 199, 242, 0.2)'
      >
        Please note that our policy only allows customers to have one
        reservation per day 😊
      </Typography>
      <Formik
        validationSchema={createBookingSchema}
        onSubmit={(values) => handleSubmit(values)}
        initialValues={{ datetime: "", guests: 1 }}
      >
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Stack spacing={3} direction='column' width='100%' mb={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DateTimePicker", "DateTimePicker"]}
                >
                  <DateTimePicker
                    label='Select a date and time'
                    name='datetime'
                    value={datetime}
                    onError={() => setValid(false)}
                    timezone={TIMEZONE_SYDNEY}
                    disablePast
                    slotProps={{
                      textField: {
                        helperText: "NOTE: Valid reservation hours are 9AM-8PM",
                      },
                    }}
                    onChange={(newValue) => setDatetime(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <TextField
                label='Number of guests'
                name='guests'
                type='number'
                value={numGuests}
                helperText='Please ensure there is at least 1 guest'
                onChange={(e) => setNumGuests(e.target.value)}
                error={numGuests < 1}
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
      </Box>
      <ReservationDashboard accountId={accountId} />
    </>
  );
};

export default Customer;
