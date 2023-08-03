import { useEffect } from "react";
import { Typography } from "@mui/material";
import OrderDashboard from "../UI/OrderDashboard";
import { READY_STATUS } from "../Helper";
import ReservationDashboard from "../UI/ReservationDashboard";
import RequestDashboard from "../UI/RequestDashboard";
import dayjs from "dayjs";
import toast, { Toaster } from "react-hot-toast";

const CURRENT_DAY = dayjs().format("YYYY-MM-DD");

const WaitStaff = () => {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("Connection established with websocket");
    };

    // Event listener for WebSocket events
    // note that useEffect runs twice due to StrictMode
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "orderReady" || data.type === "newRequest") {
        toast.success(data.message, {
          duration: 6000,
        });
      }
    };

    return () => {
      // Clean up WebSocket connection when the component is unmounted
      if (socket.readyState === 1) {
        socket.close();
      }
    };
  });
  return (
    <>
      <Typography
        component="h1"
        variant="h2"
        color="secondary"
        gutterBottom
        sx={{ mb: 3 }}
      >
        Wait Staff Dashboard
      </Typography>
      <RequestDashboard />
      <OrderDashboard status={READY_STATUS} />
      <ReservationDashboard date={CURRENT_DAY} />
      <Toaster />
    </>
  );
};

export default WaitStaff;
