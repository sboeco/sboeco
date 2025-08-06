// src/pages/Settings.js

import React, { useState, useEffect } from 'react';
import { Grid, Typography, TextField, Button, Box } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Config'; // Import Firestore configuration

const Settings = () => {
  const [adminProfile, setAdminProfile] = useState('');
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  // Fetch all products from Firestore and extract unique categories
  const fetchCategories = async () => {
    try {
      const productsCollection = collection(db, 'products');
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      
      const uniqueCategories = [...new Set(productsList.map((product) => product.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryAdd = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  const handleProfileUpdate = () => {
    // Logic to update admin profile (e.g., saving to Firestore or updating state)
    alert(`Admin Profile Updated: ${adminProfile}`);
  };

  return (
    <div>
      <Grid container spacing={3} padding={3}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Admin Settings
          </Typography>
        </Grid>

        {/* Admin Profile Update */}
        <Grid item xs={12}>
          <TextField
            label="Admin Profile"
            fullWidth
            value={adminProfile}
            onChange={(e) => setAdminProfile(e.target.value)}
            margin="normal"
          />
        </Grid>

        {/* Add New Category */}
        <Grid item xs={12}>
          <TextField
            label="New Category"
            fullWidth
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" onClick={handleCategoryAdd} fullWidth>
            Add Category
          </Button>
        </Grid>

        {/* Display existing categories */}
        <Grid item xs={12}>
          <Box>
            <Typography variant="h6" gutterBottom>Existing Categories</Typography>
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <Typography key={index}>{category}</Typography>
              ))
            ) : (
              <Typography>No categories available.</Typography>
            )}
          </Box>
        </Grid>

        {/* Save Profile */}
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleProfileUpdate} fullWidth>
            Save Profile
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;
