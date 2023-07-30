import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  PAID_STATUS,
  Request,
  completeWaiterRequest,
  getWaiterRequests,
  retrieveOrdersWithTableId,
  updateOrderPayStatus,
} from "../Helper";

const RequestCard = ({ request, onCompleted }) => {
  const { id, tableId, timestamp, status, type } = request;
  const [completed, setCompleted] = useState(status === "Completed");

  const handleCompleted = () => {
    setCompleted(true);
    onCompleted(id, tableId, type);
  };

  return (
    <Card sx={{ minWidth: 275, marginBottom: 4 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          Request ID: {id}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Table ID: {tableId}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Timestamp: {timestamp}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Type: {type}
        </Typography>
        <Typography
          variant="body2"
          color={completed ? "text.secondary" : "error"}
          gutterBottom
        >
          Status: {completed ? "Completed" : "Waiting"}
        </Typography>
        {!completed && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCompleted}
          >
            Mark as Completed
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

const RequestDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const completeRequestHandler = async (requestId, tableId, type) => {
    // if request is for a bill, update the paid status of all its orders
    if (type === Request.Type.Bill) {
      try {
        const orders = await retrieveOrdersWithTableId(tableId);
        const accountId = orders[0].accountId;
        const orderIdArr = orders.map((order) => order.id);
        const res = await updateOrderPayStatus(
          orderIdArr,
          PAID_STATUS.Paid,
          accountId
        );
        console.log(res);
      } catch (err) {
        console.log(err);
        alert(err);
      }
    }
    try {
      await completeWaiterRequest(requestId);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const getRequests = async () => {
      try {
        let res = await getWaiterRequests();
        console.log(res);
        setRequests(res);
      } catch (err) {
        console.log(err);
        alert(err);
      }
    };
    getRequests();
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Accordion
          elevation={6}
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            margin: 5,
            "&.Mui-expanded": {
              margin: 5,
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              // Style for the AccordionSummary
              "&.Mui-expanded": {
                minHeight: "48px", // Override height when expanded to match Paper
              },
            }}
          >
            <Typography component="h2" variant="h5" color="secondary">
              Requests
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              {requests.length === 0 ? (
                <Typography sx={{ mt: "35px" }}>No requests</Typography>
              ) : (
                <>
                  {requests.map((requestObj) => (
                    <RequestCard
                      key={`request-${requestObj.id}`}
                      request={requestObj}
                      onCompleted={completeRequestHandler}
                    />
                  ))}
                </>
              )}
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}
    </>
  );
};

export default RequestDashboard;
