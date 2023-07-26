import {
  Modal,
  Typography,
  Button,
  Card,
  TextField,
  DialogActions,
  IconButton,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "15px",
};

const CheckInModal = ({
  showCheckInModal,
  toggleCheckInModal,
  guestNumber,
  handleGuestNumberChange,
  handleCheckIn,
}) => {
  return (
    <Modal open={showCheckInModal}>
      <Card sx={style}>
        <DialogTitle sx={{ px: "24px" }}>
          <Typography variant="h4">Guest Check In</Typography>
          <IconButton
            onClick={toggleCheckInModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 0,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            label="Number of guests"
            name="guests"
            type="number"
            value={guestNumber}
            onChange={handleGuestNumberChange}
          />
        </DialogContent>
        <DialogActions sx={{ padding: "10px" }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "green" }}
            onClick={handleCheckIn}
          >
            Check In
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "grey" }}
            onClick={toggleCheckInModal}
          >
            Close
          </Button>
        </DialogActions>
      </Card>
    </Modal>
  );
};

export default CheckInModal;
