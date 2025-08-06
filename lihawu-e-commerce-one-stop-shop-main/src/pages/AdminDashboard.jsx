// src/pages/AdminDashboard.js

import React, { useState, useEffect } from 'react';
import { Grid, Typography, Tab, Tabs, Box, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings'; // Import the settings icon
import { Link } from 'react-router-dom'; // Import Link for navigation
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Config';
import { Header, Footer } from '../components';
import ViewProductsByCategory from '../components/ViewProductsByCategory'; // Import the new component
import AddProduct from '../components/AddProduct'; // Import the AddProduct component

const AdminDashboard = () => {
  const [tab, setTab] = useState(0); // Manage tab state
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // Store the list of categories

  // Fetch all products from Firestore
  const fetchProducts = async () => {
    try {
      const productsCollection = collection(db, 'products');
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(productsList);
      // Extract categories from the products
      const uniqueCategories = [...new Set(productsList.map((product) => product.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <div>
      <Header />
      <Grid container spacing={3} padding={3}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Admin Dashboard
          </Typography>
        </Grid>

        {/* Settings Link */}
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link to="/settings">
            <IconButton>
              <SettingsIcon fontSize="large" />
            </IconButton>
          </Link>
        </Grid>

        <Grid item xs={12}>
          <Tabs value={tab} onChange={handleTabChange} centered>
            <Tab label="Analytics" />
            <Tab label="Users" />
            <Tab label="Add Products" />
            <Tab label="View Products by Category" />
          </Tabs>
        </Grid>

        <Grid item xs={12}>
          {tab === 0 && (
            <Box>
              <Typography variant="h5" gutterBottom>
                Analytics
              </Typography>
              <p>Here you can see various analytics.</p>
            </Box>
          )}
          {tab === 1 && (
            <Box>
              <Typography variant="h5" gutterBottom>
                Users
              </Typography>
              <p>Manage users from this section.</p>
            </Box>
          )}
          {tab === 2 && (
            <AddProduct fetchProducts={fetchProducts} />
          )}
          {tab === 3 && (
            <ViewProductsByCategory products={products} categories={categories} fetchProducts={fetchProducts} />
          )}
        </Grid>
      </Grid>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
