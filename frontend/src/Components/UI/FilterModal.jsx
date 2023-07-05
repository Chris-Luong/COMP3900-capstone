import {
  Modal,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  DialogActions,
  IconButton,
  Slider,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { useState, useEffect } from "react";
import { getAllCategories } from "../Helper";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "15px",
};

const checkBoxStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
};

const FilterModal = ({
  showFilter,
  toggleFilter,
  searchString,
  setSearchString,
  categories,
  setCategories,
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

  const toggleCategoryCheckbox = (categoryId) => {
    const selectedCategories = {
      ...categories,
      [categoryId]: {
        name: categories[categoryId].name,
        selected: !categories[categoryId].selected,
      },
    };
    setCategories(selectedCategories);
  };

  // console.log(Object.keys(categories));

  // const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   setLoading(true);
  //   const getCategories = async () => {
  //     let itemsData = await getAllCategories();
  //     setCategories(itemsData);
  //     console.log(itemsData);
  //     setLoading(false);
  //   };
  //   getCategories();
  // }, []);

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
          <FormGroup sx={checkBoxStyle}>
            {/* {categories.forEach((category) => (
              <FormControlLabel
                key={category.name}
                control={
                  <Checkbox
                    checked={categories.categories[category.name]}
                    onChange={() => console.log(`${category.name} changed`)}
                    name={category.name}
                  />
                }
                label={category.name}
              />
            ))} */}

            {Object.keys(categories).map((c) => (
              <FormControlLabel
                key={c}
                control={
                  <Checkbox
                    checked={categories[c].selected}
                    onChange={() => {
                      toggleCategoryCheckbox(c);
                    }}
                    name={c}
                  />
                }
                label={categories[c].name}
              />
            ))}
          </FormGroup>
          <Typography variant="h6">Price</Typography>
          <Slider
            value={price}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
          />
          <Typography variant="h6">Sort</Typography>
          <TextField select fullWidth value={sort} onChange={handleSortChange}>
            {sortByValues.map((value) => (
              <MenuItem key={value} value={value}>
                {value}
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
