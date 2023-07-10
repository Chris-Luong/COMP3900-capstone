import { useState, useEffect, useRef } from "react";
import {
  getAllMenuItems,
  getAllCategories,
  getCategoryNamesFromItemId,
} from "../Helper";
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
import { Formik } from "formik";
import sendRequest from "../Utils/Request";
import { editItem, checkboxStyle, menuItemSchema } from "../Helper";
import NewItemModal from "../UI/NewItemModal";

// create request for add, edit and delete here

// TODO: change image too
const ManagerMenuItemCard = ({
  id,
  name,
  description,
  ingredients,
  price,
  categories,
  handleItemDelete,
  triggerRerender,
  setTriggerRerender
}) => {
  const [showModal, setShowModal] = useState(false);
  const [hasItemValuesChanged, setHasItemValuesChanged] = useState(false);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const defaultItemValues = {
    name: name,
    description: description,
    ingredients: ingredients,
    checkedCategories: checkedCategories,
    price: price,
  };
  const [itemValues, setItemValues] = useState(defaultItemValues);
  const defaultItemValuesRef = useRef(defaultItemValues);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSubmit = async (values) => {
    console.log(values);
    let message = await editItem(
      id,
      itemValues.name,
      itemValues.description,
      itemValues.ingredients,
      values.categories,
      itemValues.price,
      ""
    );
    alert(message);
    setTriggerRerender(!triggerRerender);
    toggleModal();
  };

  const handleClear = () => {
    toggleModal();
    setItemValues({
      name: name,
      description: description,
      ingredients: ingredients,
      checkedCategories: checkedCategories,
      price: price,
    });
  };

  useEffect(() => {
    setLoading(true);
    const getCategoryNames = async () => {
      let categoryData = await getCategoryNamesFromItemId(id);
      setCheckedCategories(categoryData);
      defaultItemValuesRef.current["checkedCategories"] = categoryData;
      setLoading(false);
    };
    getCategoryNames();
  }, [id, setItemValues]);

  useEffect(() => {
    const inputsChanged = Object.keys(itemValues).some(
      (key) => itemValues[key] !== defaultItemValues[key]
    );
    setHasItemValuesChanged(inputsChanged);
  }, [itemValues, hasItemValuesChanged]);

  return (
    <>
      {loading && <CircularProgress />}
      {!loading && (
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
            categories={categories}
          />
        </>
      )}
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
  categories,
}) => {
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
          validationSchema={menuItemSchema}
          onSubmit={(values) => handleSubmit(values)}
          initialValues={{
            name: itemValues.name,
            description: itemValues.description,
            ingredients: itemValues.ingredients,
            categories: itemValues.checkedCategories,
            price: itemValues.price,
          }}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Stack spacing={3} direction="column" width="100%">
                <Button>Change image here</Button>
                <TextField
                  label="Name"
                  name="name"
                  value={values.name}
                  onChange={(e) => {
                    setItemValues({
                      ...itemValues,
                      name: e.target.value,
                    });
                    handleChange(e);
                  }}
                  error={touched.name && errors.name}
                  helperText={touched.name && errors.name}
                />
                {touched.name && errors.name ? <div>{errors.name}</div> : null}
                <TextField
                  label="Description"
                  name="description"
                  value={values.description}
                  onChange={(e) => {
                    setItemValues({
                      ...itemValues,
                      description: e.target.value,
                    });
                    handleChange(e);
                  }}
                  error={touched.description && errors.description}
                  helperText={touched.description && errors.description}
                  fullWidth
                  multiline
                />
                <TextField
                  label="Ingredients"
                  name="ingredients"
                  value={values.ingredients}
                  onChange={(e) => {
                    setItemValues({
                      ...itemValues,
                      ingredients: e.target.value,
                    });
                    handleChange(e);
                  }}
                  error={touched.ingredients && errors.ingredients}
                  helperText={touched.ingredients && errors.ingredients}
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
                            onChange={(e) => {
                              setItemValues({
                                ...itemValues,
                                checkedCategories: e.target.value,
                              });
                              handleChange(e);
                            }}
                          />
                        }
                        label={c}
                      />
                    ))}
                  </FormGroup>
                  {errors.categories && (
                    <FormHelperText>{errors.categories}</FormHelperText>
                  )}
                </FormControl>
                <TextField
                  label="Price $"
                  name="price"
                  value={values.price}
                  onChange={(e) => {
                    setItemValues({ ...itemValues, price: e.target.value });
                    handleChange(e);
                  }}
                  error={touched.price && errors.price}
                  helperText={touched.price && errors.price}
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
            </form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

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
      thumb: "",
    };
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
                categories={categories}
                triggerRerender={triggerRerender}
                setTriggerRerender={setTriggerRerender}
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
