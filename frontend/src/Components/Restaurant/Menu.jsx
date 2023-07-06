import { useState, useEffect } from "react";
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Grid,
} from "@mui/material";
import Box from '@mui/material/Box';
import { getAllMenuItems, getAllCategories } from "../Helper";
import Modal from '@mui/material/Modal';
import FilterModal from "../UI/FilterModal";

const MenuItemCard = ({ name, description, price, availability, onClick }) => {
  // TODO: add item image
  // for now, display all this info in the card, but for final version, will only
  // want to show name, image and price. description will be added in modal
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
    <Grid item onClick={openModal}>
      {availability === 1 && (
        <Card
          variant="outlined"
          sx={{ width: "200px", height: "150px", margin: "auto" }}
          style={{ cursor: "pointer" }}
          className="highlight-card-on-hover"
        >
          <CardHeader title={name} />
          <CardContent>
            <Typography>${price}</Typography>
          </CardContent>
          {/* add to order should be in the modal */}
          {<CardActions>
            <Button size="small">Add to Order</Button>
          </CardActions> }
          <style>
            {`
              .highlight-card-on-hover:hover {
                outline: 2px solid blue;
              }
            `}
          </style>
        </Card>
      )}
      {availability === 0 && (
        <Card>
          <CardHeader title={name} />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
            <Typography>{price}</Typography>
          </CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Not available
          </Typography>
        </Card>
      )}
      </Grid>

      <Modal
      open={showModal}
      onClose={closeModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2">
          {name}
        </Typography>

        <Typography id="modal-description" variant="body1" mt={2}>
          {description}
        </Typography>

        <Typography variant="body1" mt={2}>
          Price: {price}
        </Typography>

        <Button variant="contained" onClick={closeModal} mt={3}>
          Close
        </Button>
      </Box>
    </Modal>
  </div>
  );
};

const sortByValues = [
  "Alphabetical (ASC)",
  "Alphabetical (DESC)",
  "Price (ASC)",
  "Price (DESC)",
];

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const [searchString, setSearchString] = useState("");
  const [categories, setCategories] = useState({});
  const [price, setPrice] = useState([0, 100]);
  const [sort, setSort] = useState(sortByValues[0]);

  const toggleFilter = () => {
    // TODO: send filters to backend here
    setShowFilter(!showFilter);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  // TODO: reduce code repetition
  const clearFilters = () => {
    let unselectCategories = {};
    Object.keys(categories).forEach(c => {
      unselectCategories[c] = {
        "name": categories[c].name,
        "selected": false
      }
    });
    console.log(unselectCategories);
    // console.log(Object.keys(categories))
    setCategories(unselectCategories);
    setSearchString("");
    setPrice([0, 100]);
    setSort(sortByValues[0]);
    // send filters to backend here
  };

  useEffect(() => {
    setLoading(true);
    const getMenuData = async () => {
      let itemsData = await getAllMenuItems();
      setMenuItems(itemsData);
      let categoriesData = await getAllCategories();
      let categoriesObject = {};
      categoriesData.forEach(c => {
        categoriesObject[c.id] = {
          "name": c.name,
          "selected": false
        };
      });
      setCategories(categoriesObject);
      setLoading(false);
    };
    getMenuData();
  }, []);

  return (
    <>
      {loading && <CircularProgress />}
      {!loading && (
        <>
          <Button variant="contained" onClick={toggleFilter}>
            Filter
          </Button>
          <Grid container spacing={2}>
            {menuItems.map((item) => (
              <MenuItemCard
                key={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                availability={item.availability}
                // when MenuItemCard is clicked, it should open a modal to users to customise their item and add to order
                onClick={() => {
                  console.log(`${item.name} has been clicked!`);
                }}
              />
            ))}
            <FilterModal
              showFilter={showFilter}
              toggleFilter={toggleFilter}
              searchString={searchString}
              setSearchString={setSearchString}
              categories={categories}
              setCategories={setCategories}
              price={price}
              setPrice={setPrice}
              sortByValues={sortByValues}
              sort={sort}
              handleSortChange={handleSortChange}
              clearFilters={clearFilters}
              onSubmit={() => {
                console.log(
                  `search: ${searchString}, price: ${price}, categories: ${categories}, sort: ${sort}`
                );
                toggleFilter();
              }}
            />
          </Grid>
        </>
      )}
    </>
  );
};

export default Menu;
