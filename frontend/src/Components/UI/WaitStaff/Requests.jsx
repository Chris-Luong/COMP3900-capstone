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

const Requests = () => {
  return (
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
        component="h2"
        variant="h5"
        color="primary"
        gutterBottom
        sx={{ mb: 3 }}
      >
        Requests
      </Typography>
      <Grid container spacing={2}>
        {/* requests have table id, timestamp, status, type. 
        type can be   */}
      </Grid>
    </Paper>
  );
};

export default Requests;
