import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom'; // Ensure Link is imported
import { db } from '../Config';

const Products = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products'); // Reference to the 'products' collection
        const productsSnapshot = await getDocs(productsCollection); // Fetch all documents
        const productsList = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('Fetched Products:', productsList); // Log products for debugging
        setProducts(productsList); // Update state with fetched products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Grid container spacing={2} padding={2}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
          <Card
            sx={{
              maxWidth: '100%',
              margin: '0 auto',
              padding: 2,
              boxShadow: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Link
              to={`/product-details/${product.id}`}
              style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.images ? product.images[0] : 'https://via.placeholder.com/150'}
                alt={product.name}
                style={{
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
              <CardContent sx={{ textAlign: 'center' }}>
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
            <Link to={`/product-details/${product.id}`} style={{ textDecoration: 'none', width: '100%' }}>
              <Button
                variant="contained"
                sx={{
                  marginTop: '10px',
                  width: '80%',
                  alignSelf: 'center',
                }}
              >
                Add to Cart
              </Button>
            </Link>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Products;
