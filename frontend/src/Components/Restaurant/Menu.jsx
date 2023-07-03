import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { getAllMenuItems } from "../Helper";

const MenuItemCard = ({ name, description, price, availability }) => {
  // TODO: add item image
  return (
    <>
      {availability === 1 && (
        <Card variant="outlined" sx={{ maxWidth: "30vw", margin: "auto" }}>
          <CardHeader title={name} />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
            <Typography>{price}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Add to Order</Button>
          </CardActions>
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
    </>
  );
};

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getMenuItems = async () => {
      let itemsData = await getAllMenuItems();
      setMenuItems(itemsData);
      console.log(itemsData);
      setLoading(false);
    };
    getMenuItems();
  }, []);

  return (
    <>
      {loading && <CircularProgress />}
      {!loading &&
        menuItems.map((item) => (
          <MenuItemCard
            key={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            availability={item.availability}
          />
        ))}
    </>
  );
};

export default Menu;
