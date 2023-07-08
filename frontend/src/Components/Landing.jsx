import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Typography, Box, Button, Container, Link as MuiLink, Paper, Pagination, Card, CardContent } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useContext, useState } from "react";
import LoginContext from "./Context/login-context";

const quotes = [
  { text: "Best dining experience ever!", color: "#ffebee" },
  { text: "Their menu is fantastic, and the waiting system is so convenient!", color: "#e8f5e9" },
  { text: "A must-try restaurant for foodies.", color: "#e3f2fd" },
];

const Landing = () => {
  const login = useContext(LoginContext);
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (event, value) => {
    setActivePage(value);
  }

  return (
    <Container maxWidth="none" sx={{ backgroundColor: "#f9f9f9" }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 8 }}>
        <Typography variant="h2" component="h1" sx={{ fontFamily: 'Pacifico', color: '#333', fontWeight: 700 }}>
          QueueQuicker
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" color="primary" component={RouterLink} to="../contact">
            Contact Us
          </Button>
          <Button variant="outlined" color="primary" component={RouterLink} to="../learnmore">
            Learn More
          </Button>
          <Button variant="outlined" color="primary" component={RouterLink} to="../restaurants">
            See Our Restaurants
          </Button>
        </Box>
      </Box>

      <Box sx={{ textAlign: 'center', padding: 8 }}>
        <Typography variant="h6" component="h2" gutterBottom sx={{ color: '#666' }}>
          Easily manage your waiting time, check our menu, and enjoy a seamless dining experience.
        </Typography>

        <Typography variant="h4" gutterBottom sx={{ color: '#333', fontWeight: 300, mt: 3 }}>
          Our recent customer reviews
        </Typography>
        
        <Paper elevation={3} sx={{ marginTop: '2rem', marginBottom: '1rem', padding: '1rem', bgcolor: '#fff' }}>
          <Carousel 
            showThumbs={false}
            infiniteLoop
            autoPlay
            showStatus={false}
            dynamicHeight
            interval={5000}
            selectedItem={activePage - 1}
            onChange={(index) => setActivePage(index + 1)}
            showIndicators={false}
          >
            {quotes.map((quote, idx) => (
              <Card key={idx} sx={{ backgroundColor: quote.color }}>
                <CardContent>
                  <Typography variant="h4" gutterBottom sx={{ color: '#333', fontWeight: 700 }}>{quote.text}</Typography>
                </CardContent>
              </Card>
            ))}
          </Carousel>
        </Paper>

        <Pagination count={quotes.length} page={activePage} onChange={handlePageChange} sx={{ mx: 'auto' }} />

        <Box sx={{ mt: 4 }}>
          <Button variant="contained" color="primary" component={RouterLink} to="../pricing" sx={{ mr: 2, p: 2, borderRadius: 2 }}>
            See Pricing
          </Button>
          <Button variant="contained" color="secondary" component={RouterLink} to="../menus" sx={{ p: 2, borderRadius: 2 }}>
            Check Our Menus
          </Button>
        </Box>

        {!login.isLoggedIn && (
          <Box sx={{ mt: 5 }}>
            <Typography variant="body1" gutterBottom sx={{ color: '#666' }}>
              Already have an account? <MuiLink component={RouterLink} to="../login">Login here</MuiLink>
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ color: '#666' }}>
              Don't have an account? <MuiLink component={RouterLink} to="../register">Register here</MuiLink>
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ color: '#666' }}>
              Inside our restaurant? <MuiLink component={RouterLink} to="../restaurant">Check in and order here</MuiLink>
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Landing;
