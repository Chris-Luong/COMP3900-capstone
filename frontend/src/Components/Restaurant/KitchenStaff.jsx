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
  return (
    <>
      <Typography
        component='h1'
        variant='h2'
        color='secondary'
        gutterBottom
        sx={{ mb: 3 }}
      >
        Kitchen Staff Dashboard
      </Typography>
      <OrderDashboard status={PREPARING_STATUS} />
    </>
  );
};

export default KitchenStaff;
