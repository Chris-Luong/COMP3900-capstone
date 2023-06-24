import { useState } from "react";
import { InputBase, Button, Typography, Stack } from "@mui/material";
import CenterCard from "./UI/CenterCard";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";

const Restaurant = () => {
  const [bookingNumber, setBookingNumber] = useState("");

  // TODO: call login api here

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
          <IconButton onClick={(e) => console.log("submitting booking number")}>
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
            onClick={(e) => console.log("signed in as guest")}
          >
            Sign In as Guest
          </Button>
        </Typography>
      </Stack>
    </CenterCard>
  );
};

export default Restaurant;
