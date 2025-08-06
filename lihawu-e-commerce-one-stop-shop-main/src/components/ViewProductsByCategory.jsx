// src/components/ViewProductsByCategory.js
import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Button, FormControl, InputLabel, Select, MenuItem, CircularProgress, Snackbar, IconButton } from '@mui/material';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../Config';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import EditProductDialog from './EditProductDialog';
import MuiAlert from '@mui/material/Alert';

// Alert component for Snackbar
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ViewProductsByCategory = ({ products, categories, fetchProducts }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredProducts(products.filter((product) => product.category === selectedCategory));
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Open edit dialog and set the current product
  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setOpenEditDialog(true);
  };

  // Retry function for failed requests
  const retryRequest = async (requestFunction, args) => {
    const maxRetries = 3;
    for (let i = 0; i < maxRetries; i++) {
      try {
        await requestFunction(...args);
        return;
      } catch (error) {
        if (i === maxRetries - 1) {
          throw error;
        }
      }
    }
  };

  // Toggle product's on sale status
  const handleAddToSale = async (product) => {
    setLoading(true);
    try {
      const productRef = doc(db, 'products', product.id);
      await retryRequest(updateDoc, [productRef, { onSale: !product.onSale }]);
      fetchProducts();
    } catch (error) {
      console.error('Error toggling product sale status:', error);
      setOpenSnackbar(true);
    }
    setLoading(false);
  };

  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      const productRef = doc(db, 'products', id);
      await retryRequest(deleteDoc, [productRef]);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      setOpenSnackbar(true);
    }
    setLoading(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        View Products by Category
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          label="Category"
        >
          <MenuItem value="">All</MenuItem>
          {categories.map((category, index) => (
            <MenuItem key={index} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Box padding={2} border={1} borderRadius={2}>
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body1">Category: {product.category}</Typography>
              <Typography variant="body2">Price: ${product.price}</Typography>
              <Typography variant="body2">Description: {product.description}</Typography>
              <div>
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={product.name}
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                ))}
              </div>
              <IconButton
                color="secondary"
                style={{ marginTop: '10px' }}
                onClick={() => deleteProduct(product.id)}
                disabled={loading}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                color="primary"
                style={{ marginTop: '10px', marginLeft: '10px' }}
                onClick={() => handleEditClick(product)}
                disabled={loading}
              >
                <EditIcon />
              </IconButton>
              <Button
                variant="contained"
                color={product.onSale ? "error" : "success"}
                style={{ marginTop: '10px', marginLeft: '10px' }}
                onClick={() => handleAddToSale(product)}
                startIcon={<LocalOfferIcon />}
                disabled={loading}
              >
                {product.onSale ? "Remove Sale" : "On Sale"}
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Loading Spinner */}
      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bgcolor="rgba(255, 255, 255, 0.5)" // Optional: add a white overlay with opacity
          zIndex="tooltip"
        >
          <CircularProgress />
        </Box>
      )}

      {/* SnackBar for Error Messages */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error">
          An error occurred. Please try again.
        </Alert>
      </Snackbar>

      {/* Edit Product Dialog */}
      {currentProduct && (
        <EditProductDialog
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          product={currentProduct}
          fetchProducts={fetchProducts}
        />
      )}
    </Box>
  );
};

export default ViewProductsByCategory;
