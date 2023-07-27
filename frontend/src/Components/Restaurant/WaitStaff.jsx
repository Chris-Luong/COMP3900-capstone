import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import OrderDashboard from "../UI/OrderDashboard";
import { PREPARING_STATUS, READY_STATUS } from "../Helper";
import ReservationDashboard from "../UI/ReservationDashboard";
import RequestDashboard from "../UI/RequestDashboard";

const WaitStaff = () => {
  return (
    <>
      <Typography
        component='h1'
        variant='h2'
        color='secondary'
        gutterBottom
        sx={{ mb: 3 }}
      >
        Wait Staff Dashboard
      </Typography>
      <RequestDashboard />
      <OrderDashboard status={READY_STATUS} />
      <ReservationDashboard status={PREPARING_STATUS} />
    </>
  );
};

export default WaitStaff;
