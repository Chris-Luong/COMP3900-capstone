import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  CircularProgress,
  Box
} from "@mui/material";
import { getAllMenuItems } from "../Helper";

const MenuItemCard = ({ name, description, price, availability, imageUrl }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Card variant="outlined" sx={{ maxWidth: "30vw", margin: "auto" }}>
        <CardHeader title={name} />
        {imageUrl && (
          <CardMedia
            component="img"
            height="140"
            image={imageUrl}
            alt={name}
          />
        )}
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography variant="h6">{`$${price}`}</Typography>
        </CardContent>
        <CardActions>
          {availability === 1 ? (
            <Button size="small">Add to Order</Button>
          ) : (
            <Typography sx={{ fontSize: 14 }} color="error" gutterBottom>
              Not available
            </Typography>
          )}
        </CardActions>
      </Card>
    </Box>
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
      setLoading(false);
    };
    getMenuItems();
  }, []);

  const demoItems = [
    {
      id: "demo1",
      name: "Demo Item 1",
      description: "This is a demo item.",
      price: "9.99",
      availability: 1,
      imageUrl: "/path/to/image1.jpg"
    },
    {
      id: "demo2",
      name: "Demo Item 2",
      description: "This is another demo item.",
      price: "14.99",
      availability: 0,
      imageUrl: "/path/to/image2.jpg"
    },
  ];

  const allItems = [...menuItems, ...demoItems];

  return (
    <>
      {loading && <CircularProgress />}
      {!loading &&
        allItems.map((item) => (
          <MenuItemCard
            key={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            availability={item.availability}
            imageUrl={item.imageUrl}
          />
        ))}
    </>
  );
};

export default Menu;
