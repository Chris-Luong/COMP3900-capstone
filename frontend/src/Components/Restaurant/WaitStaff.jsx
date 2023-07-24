import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import OrderDashboard from "../UI/OrderDashboard";
import { PREPARING_STATUS, READY_STATUS } from "../Helper";
import ReservationDashboard from "../UI/ReservationDashboard";
import RequestDashboard from "../UI/RequestDashboard";

const WaitStaff = () => {
  // TODO: make a reservation dashboard
  // GET request with current date to return list of bookings
  const data = [
    {
      tableId: 1,
      numGuests: 1,
      tableCapacity: 1,
      accountId: 1,
      time: "",
    },
    {
      tableId: 2,
      numGuests: 2,
      tableCapacity: 2,
      accountId: 2,
      time: "",
    },
    {
      tableId: 3,
      numGuests: 3,
      tableCapacity: 3,
      accountId: 3,
      time: "",
    },
  ];

  const [triggerRerender, setTriggerRerender] = useState(false);

  useEffect(() => {
    setTriggerRerender(!triggerRerender);
  }, [triggerRerender]);

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
        alert(data.message);
      }
    };

    return () => {
      // Clean up WebSocket connection when the component is unmounted
      if (socket.readyState === 1) {
        socket.close();
      }
    };
  }, []);

  return (
    <>
      <Typography
        component="h1"
        variant="h2"
        color="primary"
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
