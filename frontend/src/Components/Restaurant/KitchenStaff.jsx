import { useState, useEffect } from "react";
import {
  retrieveOrdersByStatus,
  PREPARING_STATUS,
  READY_STATUS,
  updateOrderItemStatus,
} from "../Helper";
import {
  Box,
  CircularProgress,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  List,
  Divider,
  ListItem,
  ListItemText,
} from "@mui/material";
import OrderDashboard from "../UI/OrderDashboard";

const KitchenStaff = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState({});
  const [triggerRerender, setTriggerRerender] = useState(false);

  const handleStatusUpdate = async (orderItemId) => {
    setLoading(true);
    console.log(orderItemId);
    const res = await updateOrderItemStatus(orderItemId, READY_STATUS);
    alert(res.message);
    setTriggerRerender(!triggerRerender);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    const retrieveOrders = async () => {
      const orderData = await retrieveOrdersByStatus(PREPARING_STATUS);
      console.log(orderData);
      setOrders(orderData);
      setLoading(false);
    };
    retrieveOrders();
  }, [triggerRerender]);

  return (
    <>
      <Typography
        component='h1'
        variant='h2'
        color='primary'
        gutterBottom
        sx={{ mb: 3 }}
      >
        Kitchen Staff Dashboard
      </Typography>
      <OrderDashboard status={PREPARING_STATUS} />
      {/* TODO: orderdashboard take props for completing orders depending on staff */}
      {loading && <CircularProgress />}
      {!loading && (
        <Box>
          <Grid container spacing={2}>
            {Object.keys(orders).map((orderId) => (
              <Grid item xs={12} sm={4} md={3} key={orderId}>
                <Card
                  sx={{
                    borderRadius: "15px",
                    border: 0.5,
                    borderWidth: "0.5px",
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
                          key={item.orderItemId}
                          onClick={() => handleStatusUpdate(item.orderItemId)}
                          sx={{
                            "&:hover": {
                              backgroundColor: "orange",
                              border: 1,
                              borderColor: "black",
                              cursor: "pointer",
                            },
                            borderRadius: "15px",
                            border: 1,
                            borderColor: "white",
                          }}
                        >
                          <ListItemText
                            primary={`${item.quantity} ${item.itemName}`}
                            secondary={item.status}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {!loading && Object.keys(orders).length === 0 ? (
        <Typography sx={{ mt: "35px" }}>No orders!</Typography>
      ) : null}
    </>
  );
};

export default KitchenStaff;
