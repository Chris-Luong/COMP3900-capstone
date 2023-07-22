import { Typography } from "@mui/material";
import OrderDashboard from "../UI/OrderDashboard";
import { READY_STATUS } from "../Helper";

const WaitStaff = () => {
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
      <OrderDashboard status={READY_STATUS} />
    </>
  );
};

export default WaitStaff;
