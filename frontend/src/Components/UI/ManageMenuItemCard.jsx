import { useState, useEffect, useRef } from "react";
import { getCategoryNamesFromItemId } from "../Helper";
import {
  Button,
  CircularProgress,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { editItem, fileToDataUrl } from "../Helper";
import ManageItemModal from "../UI/ManageItemModal";

const ManageMenuItemCard = ({
  id,
  name,
  description,
  ingredients,
  price,
  thumbnail,
  categories,
  handleItemDelete,
  triggerRerender,
  setTriggerRerender,
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
    thumbnail: thumbnail,
  };
  const [itemValues, setItemValues] = useState(defaultItemValues);
  const defaultItemValuesRef = useRef(defaultItemValues);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSubmit = async (values) => {
    console.log(itemValues);
    const thumbnail =
      itemValues.thumbnail === defaultItemValues.thumbnail
        ? defaultItemValues.thumbnail
        : await fileToDataUrl(itemValues.thumbnail);
    // let fileToUrl = await fileToDataUrl(itemValues.thumbnail);
    let message = await editItem(
      id,
      itemValues.name,
      itemValues.description,
      itemValues.ingredients,
      values.categories,
      itemValues.price,
      thumbnail
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
      thumbnail: null,
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
      (key) => itemValues[key] !== defaultItemValuesRef.current[key]
    );
    setHasItemValuesChanged(inputsChanged);
  }, [itemValues, hasItemValuesChanged]);

  return (
    <>
      {loading && <CircularProgress />}
      {!loading && (
        <>
          <Grid item xs={12} sm={4} md={3}>
            <Card
              variant="outlined"
              sx={{ width: "100%", height: "100%" }}
              style={{ cursor: "pointer" }}
              className="highlight-card-on-hover"
            >
              <CardHeader title={name} />
              <CardMedia
                component="img"
                sx={{ width: "300px", maxHeight: "200px" }}
                image={thumbnail}
                alt={`${name}-image`}
              />
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

export default ManageMenuItemCard;
