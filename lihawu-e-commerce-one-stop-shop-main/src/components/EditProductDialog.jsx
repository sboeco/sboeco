// src/components/EditProductDialog.js
import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../Config';

const EditProductDialog = ({ open, onClose, product, fetchProducts }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });

  useEffect(() => {
    if (product) {
      setEditedProduct({ ...product });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productRef = doc(db, 'products', editedProduct.id);
      await updateDoc(productRef, editedProduct);
      fetchProducts(); // Re-fetch products after updating
      onClose(); // Close the dialog
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Product Name"
            name="name"
            value={editedProduct.name}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Category"
            name="category"
            value={editedProduct.category}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={editedProduct.price}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            name="desctription"
            value={editedProduct.desctription}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            label="Image URLs (comma-separated)"
            name="images"
            value={editedProduct.images.join(',')}
            onChange={(e) => handleChange({ target: { name: 'images', value: e.target.value.split(',') } })}
            margin="normal"
          />
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Save Changes
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
