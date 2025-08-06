import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../Config';
import { Header,Footer } from '../components'; // Adjust the path if needed
import { useCartContext } from '../Context/appstate/CartContext/CartContext';

const Clothing = () => {
  const [carParts, setCarParts] = useState([]); // Holds the fetched car parts
  const [loading, setLoading] = useState(true); // Tracks the loading state
  const { decQty, incQty, qty, onAdd } = useCartContext(); // Access Cart Context

  // Fetch car parts from Firestore
  useEffect(() => {
    const fetchCarParts = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const q = query(productsCollection, where('category', '==', 'clothing'));

        const productsSnapshot = await getDocs(q);
        const carPartsList = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log('Fetched Car Parts:', carPartsList); // Debug fetched data
        setCarParts(carPartsList); // Set fetched car parts
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error('Error fetching car parts:', error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchCarParts();
  }, []);

  return (
    <div>
      {/* Header Component */}
      <Header />
 
      

      {/* Loading Spinner while fetching data */}
      {loading ? (
        <Typography
          variant="h6"
          color="text.secondary"
          align="center"
          sx={{ paddingTop: '20px' }}
        >
          Loading products...
        </Typography>
      ) : (
        <Grid container spacing={3} padding={3}>
          {carParts.length === 0 ? (
            <Typography
              variant="h6"
              color="text.secondary"
              align="center"
              sx={{ paddingTop: '20px' }}
            >
              No car parts found in this category.
            </Typography>
          ) : (
            carParts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card>
                  <Link
                    to={`/product-details/${product.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={product.images ? product.images[0] : 'https://via.placeholder.com/150'}
                      alt={product.name}
                    />
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.category}
                      </Typography>
                      <Typography variant="h5" color="primary">
                        E{product.price}
                      </Typography>
                    </CardContent>
                  </Link>
                  <Button
                    variant="contained"
                    onClick={() => onAdd(product, qty[product.id] || 1)}
                    style={{ margin: '10px' }}
                  >
                        <Link
                    to={`/product-details/${product.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    Add to Cart
                    </Link>
                  </Button>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      )}
           <Footer />
    </div>
  );
};

export default Clothing;

