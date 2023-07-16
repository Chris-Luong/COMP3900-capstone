import { Typography } from "@mui/material";
import OrderDashboard from "../UI/OrderDashboard";

const WaitStaff = () => {
  return (
    <>
      <Typography
        component='h1'
        variant='h2'
        color='primary'
        gutterBottom
        sx={{ mb: 3 }}
      >
        Wait Staff Dashboard
      </Typography>
      {/* Maybe map each dashboard to an order and clean up dashboard UI */}
      <OrderDashboard />
    </>
  );
};

export default WaitStaff;
