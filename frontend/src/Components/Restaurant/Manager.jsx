import { useState, useEffect } from "react";
import { getAllMenuItems } from "../Helper";
import {
  TextField,
  Button,
  CircularProgress,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Modal,
  Box,
  Stack,
  FormControl,
} from "@mui/material";

// create request for add, edit and delete here

// TODO: change image too
const ManagerMenuItemCard = ({ name, description, price }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSubmit = () => {
    console.log(itemValues)
  };

  const handleClear = () => {
    toggleModal()
    console.log('clearing');
  }

  const defaultItemValues = {
    name: name,
    description: description,
    price: price,
  };

  const [itemValues, setItemValues] = useState({
    name: name,
    description: description,
    price: price,
  });

  const [hasItemValuesChanged, setHasItemValuesChanged] = useState(false);

  useEffect(() => {
    const inputsChanged = Object.keys(itemValues).some(
      (key) => itemValues[key] !== defaultItemValues[key]
    );

    if (inputsChanged) {
      setHasItemValuesChanged(true);
    } else {
      setHasItemValuesChanged(false);
    }

    console.log(inputsChanged);
  }, [itemValues, defaultItemValues, hasItemValuesChanged]);

  return (
    <>
      <Grid item xs={12} sm={3} md={3}>
        <Card
          variant="outlined"
          sx={{ width: "100%", height: "100%" }}
          style={{ cursor: "pointer" }}
          className="highlight-card-on-hover"
        >
          <CardHeader title={name} />
          <CardContent>
            <Typography>${price}</Typography>
            <Button onClick={toggleModal}>Edit</Button>
            <Button onClick={() => alert("Deleting item!")}>Delete</Button>
          </CardContent>
          <style>
            {`
              .highlight-card-on-hover:hover {
                outline: 2px solid blue;
              }
            `}
          </style>
        </Card>
      </Grid>
      <ManageItemModal
        inputChanged={hasItemValuesChanged}
        showModal={showModal}
        toggleModal={toggleModal}
        name={name}
        description={description}
        price={price}
        handleSubmit={handleSubmit}
        handleClear={handleClear}
        setItemValues={setItemValues}
        itemValues={itemValues}
      />
    </>
  );
};

const ManageItemModal = ({
  inputChanged,
  showModal,
  toggleModal,
  name,
  description,
  price,
  handleSubmit,
  handleClear,
  setItemValues,
  itemValues
}) => {
  

  return (
    <Modal open={showModal}>
      <Box
        component="form"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Stack spacing={3} direction="column" width="100%">
          {/* TODO: validate input, e.g., empty field */}
          <Button>Change image here</Button>
          <TextField
            label="Name"
            value={itemValues.name}
            onChange={(e) =>
              setItemValues({ ...itemValues, name: e.target.value })
            }
          />
          <TextField
            label="Description"
            value={itemValues.description}
            fullWidth
            multiline
            onChange={(e) =>
              setItemValues({ ...itemValues, description: e.target.value })
            }
          />
          <TextField
            label="Price $"
            value={itemValues.price}
            onChange={(e) =>
              setItemValues({ ...itemValues, price: e.target.value })
            }
          />
        </Stack>
        {inputChanged && <Button color="success" onClick={handleSubmit}>Submit</Button>}
        <Button color="error" onClick={handleClear}>
          {/* TODO: on close, reset fields */}
          Close
        </Button>
      </Box>
    </Modal>
  );
};

const Manager = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getMenuData = async () => {
      let itemsData = await getAllMenuItems();
      setMenuItems(itemsData);
      setLoading(false);
    };
    getMenuData();
  }, []);

  return (
    <>
      {loading && <CircularProgress />}
      {!loading && (
        <>
          <Typography variant="h3">Hi Manager</Typography>
          <Typography variant="h5">Manage the menu here</Typography>
          <Grid container spacing={2} sx={{ display: "flex" }}>
            {menuItems.map((item) => (
              <ManagerMenuItemCard
                key={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
              />
            ))}
            {/* new item button */}
          </Grid>
        </>
      )}
    </>
  );
};

export default Manager;
