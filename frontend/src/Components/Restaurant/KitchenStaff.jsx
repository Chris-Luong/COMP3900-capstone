import { PREPARING_STATUS } from "../Helper";
import { Typography } from "@mui/material";
import OrderDashboard from "../UI/OrderDashboard";
import { useEffect } from "react";
import toast, {Toaster} from 'react-hot-toast';

const KitchenStaff = () => {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("Connection established with websocket");
    };

    // Event listener for WebSocket events
    // note that useEffect runs twice due to StrictMode
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "newOrder") {
        // alert(data.message);
        toast(data.message);
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
        Kitchen Staff Dashboard
      </Typography>
      <OrderDashboard status={PREPARING_STATUS} />
      <Toaster />
    </>
  );
};

export default KitchenStaff;
