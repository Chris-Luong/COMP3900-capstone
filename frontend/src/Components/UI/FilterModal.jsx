import {
  Modal,
  Typography,
  Button,
  Card,
  TextField,
  FormGroup,
  FormControlLabel,
  DialogActions,
  IconButton,
  Slider,
  MenuItem,
  DialogTitle,
  DialogContent,
  Radio,
  RadioGroup,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Style for the modal content
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "15px",
};

// Style for radio buttons
const radioStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
};

// FilterModal component that displays the filter form
const FilterModal = ({
  showFilter, 
  toggleFilter,
  searchString, 
  setSearchString,
  categories,
  selectedCategory,
  setSelectedCategory,
  price, 
  setPrice, 
  sortByValues, 
  sort, 
  handleSortChange, 
  clearFilters, 
  onSubmit, 
}) => {
  // Handle price slider value change
  const handlePriceChange = (e, newPrice) => {
    setPrice(newPrice);
  };

  // Handle category radio button value change
  const handleCategoryRadioChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <Modal open={showFilter}>
      {/* Card containing the modal content */}
      <Card sx={style}>
        {/* Modal title and close button */}
        <DialogTitle sx={{ px: "24px" }}>
          <Typography variant="h4">Filters</Typography>
          <IconButton
            onClick={toggleFilter}
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
          {/* Search input */}
          <FormGroup sx={{ paddingBottom: "20px" }}>
            <TextField
              size="small"
              placeholder="Search by name"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
          </FormGroup>

          {/* Category radio buttons */}
          <Typography variant="h6">Category</Typography>
          <RadioGroup
            sx={radioStyle}
            onChange={handleCategoryRadioChange}
            defaultValue=""
            value={selectedCategory}
          >
            <FormControlLabel
              value=""
              control={<Radio color="secondary" />}
              label="All"
            />
            {Object.keys(categories).map((c) => (
              <FormControlLabel
                key={c}
                value={categories[c]}
                control={<Radio color="secondary" />}
                label={categories[c]}
              />
            ))}
          </RadioGroup>

          {/* Price slider */}
          <Typography variant="h6">Price</Typography>
          <Slider
            color="secondary"
            value={price}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
          />

          {/* Sort dropdown */}
          <Typography variant="h6">Sort</Typography>
          <TextField select fullWidth value={sort} onChange={handleSortChange}>
            {Object.keys(sortByValues).map((id) => (
              <MenuItem key={id} value={id}>
                {sortByValues[id].label}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>

        {/* Modal actions */}
        <DialogActions sx={{ padding: "10px" }}>
          {/* Filter button */}
          <Button
            variant="contained"
            sx={{ backgroundColor: "green" }}
            onClick={onSubmit}
          >
            Filter
          </Button>

          {/* Clear button */}
          <Button
            variant="contained"
            sx={{ backgroundColor: "grey" }}
            onClick={clearFilters}
          >
            Clear
          </Button>
        </DialogActions>
      </Card>
    </Modal>
  );
};

export default FilterModal;