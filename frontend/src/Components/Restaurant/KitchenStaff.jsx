import { PREPARING_STATUS } from "../Helper";
import { Typography } from "@mui/material";
import OrderDashboard from "../UI/OrderDashboard";

const KitchenStaff = () => {
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
    </>
  );
};

export default KitchenStaff;
