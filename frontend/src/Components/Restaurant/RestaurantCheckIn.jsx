import { useState, useContext } from "react";
import { InputBase, Button, Typography, Stack } from "@mui/material";
import CenterCard from "../UI/CenterCard";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import sendRequest from "../Utils/Request";
import RestaurantContext from "../Context/restaurant-context";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import jwtDecode from "jwt-decode";
import { createBooking, loginUser, verifyBookingId } from "../Helper";
import CheckInModal from "../UI/CheckInModal";
// TODO: export duplicate code from Customer.jsx into helper function
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);
const TIMEZONE_SYDNEY = "Australia/Sydney";

const RestaurantCheckIn = () => {
  const [bookingNumber, setBookingNumber] = useState("");
  const checkIn = useContext(RestaurantContext);
  const navigate = useNavigate();
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [guestNumber, setGuestNumber] = useState(1);

  const guestCheckInHandler = async () => {
    const uuid = uuidv4();
    const password = "guest123";
    const registerBody = {
      email: uuid,
      password: password,
      firstName: uuid,
      lastName: uuid,
      role: 1,
    };
    try {
      // TODO: see if we can share some code with enter booking number field submission
      // generate a new guest account
      await sendRequest("/register", "POST", registerBody);
      const loginRes = await loginUser({
        email: uuid,
        password: password,
      });
      const token = jwtDecode(loginRes.token);
      const currentDateTime = dayjs.utc();
      const dateTimeObj = dayjs(currentDateTime).tz(TIMEZONE_SYDNEY);
      const bookingBody = {
        date: dateTimeObj.format("YYYY-MM-DD"),
        start_time: dateTimeObj.format("HH:mm:00"),
        guests: guestNumber,
        accountId: token.accountId,
        numHours: 1,
      };
      const bookingRes = await createBooking(bookingBody);
      if (bookingRes) {
        localStorage.setItem("checkedIn", true);
        localStorage.setItem("accountId", token.accountId);
        localStorage.setItem("isGuest", true);
        localStorage.setItem("bookingId", bookingRes.bookingId);
        localStorage.setItem("tableId", bookingRes.tableId);
        checkIn.setIsCheckedIn(true);
        navigate("/restaurant");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const bookingCheckInHandler = async () => {
    try {
      const bookingRes = await verifyBookingId(bookingNumber);
      if (bookingRes) {
        localStorage.setItem("accountId", bookingRes.user_id);
        localStorage.setItem("isGuest", true);
        localStorage.setItem("bookingId", bookingRes.id);
        localStorage.setItem("tableId", bookingRes.table_id);
        localStorage.setItem("checkedIn", true);
        checkIn.setIsCheckedIn(true);
        navigate("/restaurant");
      }
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

  const toggleCheckInModal = () => {
    setShowCheckInModal(!showCheckInModal);
  };

  const changeGuestNumberHandler = (event) => {
    setGuestNumber(event.target.value);
  };

  return (
    <CenterCard>
      <Stack width="100%" spacing={3}>
        <Typography align="center" variant="h3" marginBottom={5}>
          Welcome!
        </Typography>
        <Paper component="form" sx={{ display: "flex", alignItems: "center" }}>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            type="number"
            placeholder="Enter Booking Number"
            onChange={(e) => setBookingNumber(e.target.value)}
            value={bookingNumber}
          />
          <IconButton onClick={bookingCheckInHandler}>
            <ArrowForwardIcon />
          </IconButton>
        </Paper>
        <Typography align="center" variant="h3">
          Or
        </Typography>
        <Typography align="center">
          <Button
            variant="outlined"
            type="button"
            color="secondary"
            onClick={toggleCheckInModal}
          >
            Check In as Guest
          </Button>
        </Typography>
        <CheckInModal
          showCheckInModal={showCheckInModal}
          toggleCheckInModal={toggleCheckInModal}
          guestNumber={guestNumber}
          handleGuestNumberChange={changeGuestNumberHandler}
          handleCheckIn={guestCheckInHandler}
        />
      </Stack>
    </CenterCard>
  );
};

export default RestaurantCheckIn;
