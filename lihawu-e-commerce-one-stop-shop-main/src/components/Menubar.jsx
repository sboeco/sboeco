import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';

const slideshowImages = [
  'https://res.cloudinary.com/dtdcvyuvd/image/upload/v1732192530/samples/woman-on-a-football-field.jpg',
  'https://res.cloudinary.com/dtdcvyuvd/image/upload/v1732192528/samples/shoe.jpg',
  'https://res.cloudinary.com/dtdcvyuvd/image/upload/v1732192522/samples/ecommerce/leather-bag-gray.jpg',
];

const Slideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % slideshowImages.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        height: '300px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <img
        src={slideshowImages[currentImageIndex]}
        alt={`Slide ${currentImageIndex + 1}`}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </Box>
  );
};

export default Slideshow;
