import { useState, useEffect } from "react";
import { getAllMenuItems, getAllCategories } from "../Helper";
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
  FormGroup,
  Checkbox,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";
import sendRequest from "../Utils/Request";

// create request for add, edit and delete here

// TODO: change image too
const ManagerMenuItemCard = ({ id, name, description, ingredients, price, handleItemDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [hasItemValuesChanged, setHasItemValuesChanged] = useState(false);
  const [itemValues, setItemValues] = useState({
    name: name,
    description: description,
    ingredients: ingredients,
    price: price,
  });

  const defaultItemValues = {
    name: name,
    description: description,
    ingredients: ingredients,
    price: price,
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // TODO: ask Rod; doesn't work
  const handleSubmit = async () => {
    console.log(itemValues);
    const body = {
      ...itemValues,
      price: parseFloat(itemValues.price).toFixed(2),
      thumb: "",
      id: id,
    };
    try {
      const res = await sendRequest("/menu/edit", "PUT", body);
      alert(res.message);
      // setTriggerRerender(!triggerRerender);
    } catch (err) {
      alert(err);
      console.log(err);
    }
    toggleModal();
  };

  const handleClear = () => {
    toggleModal();
    setItemValues({
      name: name,
      description: description,
      ingredients: ingredients,
      price: price,
    });
  };

  useEffect(() => {
    const inputsChanged = Object.keys(itemValues).some(
      (key) => itemValues[key] !== defaultItemValues[key]
    );

    setHasItemValuesChanged(inputsChanged);
    // if (inputsChanged) {
    //   setHasItemValuesChanged(true);
    // } else {
    //   setHasItemValuesChanged(false);
    // }
  }, [itemValues, hasItemValuesChanged]);

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
            <Button onClick={() => handleItemDelete(id)}>Delete</Button>
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
  handleSubmit,
  handleClear,
  setItemValues,
  itemValues,
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
            label="Ingredients"
            value={itemValues.ingredients}
            fullWidth
            multiline
            onChange={(e) =>
              setItemValues({ ...itemValues, ingredients: e.target.value })
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
        {inputChanged && (
          <Button color="success" onClick={handleSubmit}>
            Submit
          </Button>
        )}
        <Button color="error" onClick={handleClear}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

// TODO: validate image
const NewItemModal = ({ showModal, toggleModal, categories, handleSubmit }) => {
  const checkboxStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
  };
  return (
    <Modal open={showModal}>
      <Box
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
        <Formik
          validationSchema={schema}
          onSubmit={(values) => handleSubmit(values)}
          initialValues={{
            name: "",
            description: "",
            ingredients: "",
            categories: [],
            price: "",
          }}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Stack spacing={3} direction="column" width="100%">
                {/* TODO: validate input, e.g., empty field */}
                <Button>Add image here</Button>
                <TextField
                  label="Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  error={touched.name && errors.name}
                  helperText={touched.name && errors.name}
                  required
                />
                <TextField
                  label="Description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  error={touched.description && errors.description}
                  helperText={touched.description && errors.description}
                  required
                  fullWidth
                  multiline
                />
                <TextField
                  label="Ingredients"
                  name="ingredients"
                  value={values.ingredients}
                  onChange={handleChange}
                  error={touched.ingredients && errors.description}
                  helperText={touched.ingredients && errors.ingredients}
                  required
                  fullWidth
                  multiline
                />
                <FormControl
                  required
                  error={touched.categories && errors.categories}
                >
                  <FormGroup sx={checkboxStyle}>
                    {categories.map((c) => (
                      <FormControlLabel
                        key={c}
                        control={
                          <Checkbox
                            name="categories"
                            value={c}
                            checked={values.categories.includes(c)}
                            onChange={handleChange}
                          />
                        }
                        label={c}
                      />
                    ))}
                  </FormGroup>
                  {errors.categories && (
                    <FormHelperText>
                      {errors.categories}
                    </FormHelperText>
                  )}
                </FormControl>
                {/* TODO: backend deals with price format */}
                <TextField
                  label="Price $"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  error={touched.price && errors.price}
                  helperText={touched.price && errors.price}
                  required
                />
              </Stack>
              <Button color="success" onClick={handleSubmit}>
                Submit
              </Button>
              <Button color="error" onClick={toggleModal}>
                Close
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  ingredients: Yup.string().required("Ingredients are required"),
  categories: Yup.array()
    .required("Categories required.")
    .min(1, "Categories required."),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price can't be negative"),
});

const Manager = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showNewItemModal, setShowNewItemModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [triggerRerender, setTriggerRerender] = useState(false);

  const toggleNewItemModal = () => {
    setShowNewItemModal(!showNewItemModal);
  };

  const handleNewItemSubmit = async (values) => {
    const body = {
      ...values,
      price: parseFloat(values.price).toFixed(2),
      thumb: ""
    }
    try {
      const res = await sendRequest("/menu/add", "POST", body);
      alert(res.message);
      setTriggerRerender(!triggerRerender);
    } catch (err) {
      alert(err);
      console.log(err);
    }
    toggleNewItemModal();
  };

  const handleItemDelete = async (id) => {
    try {
      const res = await sendRequest("/menu/remove", "DELETE", { id: id });
      alert(res.message);
      setTriggerRerender(!triggerRerender);
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

  useEffect(() => {
    setLoading(true);
    const getMenuData = async () => {
      let itemsData = await getAllMenuItems();
      setMenuItems(itemsData);
      let categoriesData = await getAllCategories();
      let categoriesArr = [];
      categoriesData.forEach((c) => {
        categoriesArr.push(c.name);
      });
      setCategories(categoriesArr);
      setLoading(false);
    };
    getMenuData();
  }, [triggerRerender]);

  return (
    <>
      {loading && <CircularProgress />}
      {!loading && (
        <>
          <Typography variant="h3">Hi Manager</Typography>
          <Typography variant="h5">Manage the menu here</Typography>
          <Button
            variant="outlined"
            sx={{ mb: 1, mt: 1 }}
            onClick={toggleNewItemModal}
          >
            Add New Menu Item
          </Button>
          <Grid container spacing={2} sx={{ display: "flex" }}>
            {menuItems.map((item) => (
              <ManagerMenuItemCard
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                ingredients={item.ingredients}
                price={item.price}
                handleItemDelete={handleItemDelete}
              />
            ))}
          </Grid>
          {showNewItemModal && (
            <NewItemModal
              showModal={showNewItemModal}
              toggleModal={toggleNewItemModal}
              categories={categories}
              handleSubmit={handleNewItemSubmit}
            />
          )}
        </>
      )}
    </>
  );
};

export default Manager;
