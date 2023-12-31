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
    try {
      const thumbnail =
        itemValues.thumbnail === defaultItemValues.thumbnail
          ? defaultItemValues.thumbnail
          : await fileToDataUrl(itemValues.thumbnail);
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
    } catch (err) {
      console.log(err);
      alert(err);
    }
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
      try {
        let categoryData = await getCategoryNamesFromItemId(id);
        setCheckedCategories(categoryData);
        defaultItemValuesRef.current["checkedCategories"] = categoryData;
      } catch (err) {
        console.log(err);
        alert(err);
      }
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
              sx={{
                width: "100%",
                height: "100%",
                margin: "10px",
                cursor: "pointer",
                transition: "all 0.3s ease-out",
                "box-shadow": "0 14px 26px rgba(0, 0, 0, 0.04)",
                "&:hover": {
                  transform: "translateY(-5px) scale(1.005) translateZ(0)",
                  "box-shadow": "0 12px 24px rgba(156, 39, 176, 0.5)",
                },
              }}
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
                <Button onClick={() => handleItemDelete(id)} color="error">
                  Delete
                </Button>
              </CardContent>
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
