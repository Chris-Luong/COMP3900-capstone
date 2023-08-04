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

// Styles for the modal content
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "15px",
};

// CheckInModal component that displays the guest check-in form
const CheckInModal = ({
  showCheckInModal,
  toggleCheckInModal, 
  guestNumber, 
  handleGuestNumberChange, 
  handleCheckIn, 
}) => {
  return (
    <Modal open={showCheckInModal}>
      {/* Card containing the modal content */}
      <Card sx={style}>
        {/* Modal title and close button */}
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

        {/* Modal content area */}
        <DialogContent dividers>
          {/* Input field for entering the number of guests */}
          <TextField
            label="Number of guests"
            name="guests"
            type="number"
            value={guestNumber}
            onChange={handleGuestNumberChange}
            inputProps={{ min: 1, max: 15 }}
            fullWidth
          />
        </DialogContent>

        {/* Modal actions */}
        <DialogActions sx={{ padding: "10px" }}>
          {/* Check-in button */}
          <Button
            variant="contained"
            sx={{ backgroundColor: "green" }}
            onClick={handleCheckIn}
          >
            Check In
          </Button>

          {/* Close button */}
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