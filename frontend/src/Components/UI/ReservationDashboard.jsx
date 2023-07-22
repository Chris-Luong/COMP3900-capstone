import * as React from "react";
import {
  retrieveOrdersByStatus,
  READY_STATUS,
  SERVED_STATUS,
  updateOrderItemStatus,
  PREPARING_STATUS,
} from "../Helper";
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

const ReservationDashboard = (props) => {
  const status = props.status;
  const newStatus = status === PREPARING_STATUS ? READY_STATUS : SERVED_STATUS;

  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState({});
  const [triggerRerender, setTriggerRerender] = useState(false);

  const handleStatusUpdate = async (orderItemId) => {
    setLoading(true);
    console.log(orderItemId);
    const res = await updateOrderItemStatus(orderItemId, newStatus);
    alert(res.message);
    setTriggerRerender(!triggerRerender);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    const retrieveOrders = async () => {
      const orderData = await retrieveOrdersByStatus(status);
      console.log(orderData);
      setOrders(orderData);
      setLoading(false);
    };
    retrieveOrders();
  }, [status, triggerRerender]);

  console.log(orders);
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
          {Object.keys(orders).length === 0 ? (
            <Typography sx={{ mt: "35px" }}>No orders 🥳</Typography>
          ) : (
            <Grid container spacing={2}>
              {Object.keys(orders).map((orderId) => (
                <Grid item xs={12} sm={4} md={3} key={orderId}>
                  <Card
                    sx={{
                      width: "100%",
                      height: "100%",
                      margin: "10px",
                      cursor: "pointer",
                      border: 1,
                      borderColor: "rgba(216, 206, 222, 0.8)",
                      transition: "all 0.3s ease-out",
                      "box-shadow": "0 14px 26px rgba(0, 0, 0, 0.04)",
                      "&:hover": {
                        transform:
                          "translateY(-5px) scale(1.005) translateZ(0)",
                        "box-shadow": "0 12px 24px rgba(156, 39, 176, 0.5)",
                      },
                    }}
                  >
                    <CardHeader
                      title={`Order ${orderId} Table ${orders[orderId].tableId}`}
                      subheader={orders[orderId].orderTime}
                    />
                    <Divider />
                    <CardContent>
                      <List>
                        {orders[orderId].items.map((item) => (
                          <ListItem
                            key={`${orderId}-${item.itemId}`}
                            onClick={() => handleStatusUpdate(item.orderItemId)}
                            sx={{
                              "&:hover": {
                                backgroundColor: "rgba(125, 50, 168)",
                                color: "white",
                                cursor: "pointer",
                              },
                              borderRadius: "5px",
                            }}
                          >
                            <ListItemText
                              disableTypography
                              primary={
                                <Typography>
                                  {item.quantity} {item.itemName}
                                </Typography>
                              }
                              secondary={
                                <Typography>
                                  {item.note ? `Note: ${item.note}` : null}
                                </Typography>
                              }
                            />
                            {/* <Typography align='right'>{item.amount}</Typography> */}
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>
      )}
    </>
  );
};

export default ReservationDashboard;