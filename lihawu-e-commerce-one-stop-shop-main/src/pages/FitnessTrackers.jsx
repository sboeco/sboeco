import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../Config';
import { Footer, Header } from '../components'; // Adjust the path if needed
import { useCartContext } from '../Context/appstate/CartContext/CartContext';

const FitnessTrackers = () => {
  const [fitnessTrackers, setFitnessTrackers] = useState([]); // Holds the fetched fitness trackers
  const [loading, setLoading] = useState(true); // Tracks the loading state
  const { decQty, incQty, qty, onAdd } = useCartContext(); // Access Cart Context

  // Fetch fitness trackers from Firestore
  useEffect(() => {
    const fetchFitnessTrackers = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const q = query(productsCollection, where('category', '==', 'fitnesstrackers'));

        const productsSnapshot = await getDocs(q);
        const fitnessTrackersList = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log('Fetched fitness trackers:', fitnessTrackersList); // Debug fetched data
        setFitnessTrackers(fitnessTrackersList); // Set fetched fitness trackers
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error('Error fetching fitness trackers:', error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchFitnessTrackers();
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
          {fitnessTrackers.length === 0 ? (
            <Typography
              variant="h6"
              color="text.secondary"
              align="center"
              sx={{ paddingTop: '20px' }}
            >
              No products found in this category.
            </Typography>
          ) : (
            fitnessTrackers.map((product) => (
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
                    style={{ margin: '10px' }}
                    onClick={() => onAdd(product, qty)}
                  >
                    Add to Cart
                  </Button>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      )}
      <Footer/>
    </div>
  );
};

export default FitnessTrackers;
