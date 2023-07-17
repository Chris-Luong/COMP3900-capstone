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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "15px",
};

const radioStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
};

/*
  TODO: user may add inputs into modal and then click the Close button.
        filter inputs will then be saved in the modal, but not be applied.
        might be good ux to indicate this 
        e.g., search bar is green is currently applied, or helper text appears
        saying what is being filtered
*/
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
  const handlePriceChange = (e, newPrice) => {
    setPrice(newPrice);
  };

  const handleCategoryRadioChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <Modal open={showFilter}>
      <Card sx={style}>
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
        {/* Filter inputs here */}
        <DialogContent dividers>
          <FormGroup sx={{ paddingBottom: "20px" }}>
            <TextField
              size="small"
              placeholder="Search by name"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
          </FormGroup>
          <Typography variant="h6">Category</Typography>
          <RadioGroup
            sx={radioStyle}
            onChange={handleCategoryRadioChange}
            defaultValue=""
            value={selectedCategory}
          >
            <FormControlLabel value="" control={<Radio color="secondary"/>} label="All" />
            {Object.keys(categories).map((c) => (
              <FormControlLabel
                key={c}
                value={categories[c]}
                control={<Radio color="secondary"/>}
                label={categories[c]}
              />
            ))}
          </RadioGroup>
          <Typography variant="h6">Price</Typography>
          <Slider
            color="secondary"
            value={price}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
          />
          <Typography variant="h6">Sort</Typography>
          <TextField select fullWidth value={sort} onChange={handleSortChange}>
            {Object.keys(sortByValues).map((id) => (
              <MenuItem key={id} value={id}>
                {sortByValues[id].label}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions sx={{ padding: "10px" }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "green" }}
            onClick={onSubmit}
          >
            Filter
          </Button>
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
