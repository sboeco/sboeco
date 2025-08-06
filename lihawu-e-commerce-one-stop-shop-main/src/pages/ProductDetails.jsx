import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Grid,
  Typography,
  Button,
  Box,
  IconButton,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
  Divider,
} from '@mui/material';
import { db } from '../Config';
import { doc, getDoc } from 'firebase/firestore';
import { useCartContext } from '../Context/appstate/CartContext/CartContext';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Header} from '../components';

const ProductDetails = () => {
  const { productId } = useParams();
  const { onAdd } = useCartContext();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, 'products', productId);
        const productSnapshot = await getDoc(productRef);

        if (productSnapshot.exists()) {
          const productData = productSnapshot.data();
          setProduct({ id: productSnapshot.id, ...productData });
          if (productData.color && productData.color.length > 0) {
            setSelectedColor(productData.color[0]);
          }
        } else {
          console.log('No such product!');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleDecrement = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleAddToCart = () => {
    if (product) {
      onAdd({ ...product, selectedColor }, quantity);
      alert(`${quantity} ${product.name} in ${selectedColor} added to cart!`);
    }
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return <Typography>No such product found!</Typography>;
  }

  return (
    <>
      <Header />
 
      <Grid container spacing={4} sx={{ padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
        {/* Product Image and Thumbnails */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              padding: '16px',
              borderRadius: '12px',
            }}
          >
            {/* Main Image */}
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '500px',
                overflow: 'hidden',
                borderRadius: '12px',
              }}
            >
              <img
                src={
                  product.images && product.images.length > 0
                    ? product.images[currentImageIndex]
                    : 'https://via.placeholder.com/500'
                }
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </Box>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '16px',
                  gap: 1,
                }}
              >
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.name} thumbnail - ${index + 1}`}
                    onClick={() => handleThumbnailClick(index)}
                    style={{
                      width: '70px',
                      height: '70px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      border: currentImageIndex === index ? '3px solid #FF6F61' : '1px solid #ccc',
                      opacity: currentImageIndex === index ? 1 : 0.7,
                    }}
                  />
                ))}
              </Box>
            )}
          </Box>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              border: '2px solid #ccc',
              borderRadius: '12px',
              padding: '24px',
            }}
          >
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
              {product.name}
            </Typography>

            <Divider sx={{ marginBottom: '16px' }} />

            <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
              E{product.price}
            </Typography>

            <Typography variant="body1" color="textSecondary" sx={{ marginBottom: '24px', lineHeight: '1.6' }}>
              {product.description}
            </Typography>

            {/* Color Selection */}
            {product.color && product.color.length > 0 && (
              <FormControl component="fieldset" sx={{ marginBottom: '24px' }}>
                <Typography variant="body1" sx={{ marginBottom: '8px', fontWeight: 'bold' }}>
                  Select Color:
                </Typography>
                <RadioGroup row value={selectedColor} onChange={handleColorChange}>
                  {product.color.map((color) => (
                    <FormControlLabel
                      key={color}
                      value={color}
                      control={<Radio sx={{ display: 'none' }} />}
                      label={
                        <Box
                          sx={{
                            backgroundColor: color,
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            border: selectedColor === color ? '2px solid #1976d2' : '1px solid #ccc',
                            cursor: 'pointer',
                          }}
                        />
                      }
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            )}

            {/* Quantity Selector */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '24px',
                gap: '12px',
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Quantity:
              </Typography>
              <IconButton onClick={handleDecrement} sx={{ backgroundColor: '#f0f0f0', padding: '8px' }}>
                <RemoveIcon />
              </IconButton>
              <Typography variant="body1" sx={{ minWidth: '36px', textAlign: 'center' }}>
                {quantity}
              </Typography>
              <IconButton onClick={handleIncrement} sx={{ backgroundColor: '#f0f0f0', padding: '8px' }}>
                <AddIcon />
              </IconButton>
            </Box>

            {/* Action Buttons */}
            <Button
              variant="contained"
              size="large"
              onClick={handleAddToCart}
              sx={{
                backgroundColor: '#FF6F61',
                color: '#fff',
                '&:hover': { backgroundColor: '#e55a4f' },
                marginBottom: '16px',
                width: '100%',
                borderRadius: '8px',
                padding: '14px',
              }}
            >
              Add to Cart
            </Button>

            <Button
              variant="outlined"
              color="primary"
              size="large"
              sx={{
                width: '100%',
                borderRadius: '8px',
                padding: '14px',
              }}
            >
              Buy Now
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductDetails;
