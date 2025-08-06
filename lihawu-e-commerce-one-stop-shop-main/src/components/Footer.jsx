import React from 'react'
import { Box, Container, Grid, Typography, Link } from '@mui/material'

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: '#333', color: 'white', py: 4 }}>
      <Container>
        <Grid container spacing={4}>
          {/* Column 1: Company Info */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              LIHAWU TECH
            </Typography>
            <Typography variant="body2">

              this is lihawu tech company created last year
              Your trusted partner for topnotch tech products and services.

            </Typography>
          </Grid>

          {/* Column 2: Quick Links */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              Home
            </Link>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              Shop
            </Link>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              About Us
            </Link>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              Contact
            </Link>
          </Grid>

          {/* Column 3: Social Media */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Link href="https://facebook.com" color="inherit" target="_blank">Facebook</Link>
              <Link href="https://twitter.com" color="inherit" target="_blank">Twitter</Link>
              <Link href="https://instagram.com" color="inherit" target="_blank">Instagram</Link>
            </Box>
          </Grid>
        </Grid>
        
        {/* Copyright */}
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} LIHAWU TECH. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
