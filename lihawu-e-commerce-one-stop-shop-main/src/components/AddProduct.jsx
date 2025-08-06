// src/components/AddProduct.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../Config';

const AddProduct = ({ fetchProducts }) => {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    color: '',
    images: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const productsCollection = collection(db, 'products');
      await addDoc(productsCollection, product);
      setProduct({ name: '', category: '', price: '', description: '', color: '', images: [] });
      setLoading(false);
      fetchProducts(); // Fetch products again after adding a new one
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Failed to add product. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Add Product
      </Typography>
      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Product Name"
          name="name"
          value={product.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Category"
          name="category"
          value={product.category}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Price"
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Description"
          name="description"
          value={product.description}
          onChange={handleChange}
          multiline
          rows={4}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Color (Hex or RGB)"
          name="color"
          value={product.color}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Image URLs (comma-separated)"
          name="images"
          value={product.images.join(',')}
          onChange={(e) => setProduct({ ...product, images: e.target.value.split(',') })}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
          fullWidth
          style={{ marginTop: '20px' }}
        >
          {loading ? 'Adding...' : 'Add Product'}
        </Button>
      </form>
    </Box>
  );
};

export default AddProduct;
