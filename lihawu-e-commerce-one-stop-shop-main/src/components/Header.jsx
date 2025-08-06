import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Box, Badge, IconButton, Button, Drawer } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu"; // Import Menu Icon from Material UI
import { useCartContext } from "../Context/appstate/CartContext/CartContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { totalQuantities } = useCartContext();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { label: "Appliances", submenu: ["AirFryers", "Kettles", "Blenders"] },
    { label: "Electronics", submenu: ["Phones", "Laptops", "Tablets"] },
    { label: "Clothing & Shoes", submenu: ["Shirts", "Shoes", "Jeans"] },
    { label: "Beauty", submenu: ["Makeup", "Skincare", "Fragrances"] },
    { label: "Accessories", submenu: ["Computer", "CellPhone","Gaming"] },
    { label: "Wearables", submenu: ["SmartWatches", "FitnessTrackers"] },
    { label: "EntertainmentDevices", submenu: ["GamingConsoles", "Television","Speakers"] },
    { label: "Networking", submenu: ["WiFiRouters", "DataDevices",] },
    { label: "SolarPowered", submenu: ["PowerBanks", "Lights",] },
  ];

  return (
    <>
      {/* Header AppBar */}
      <AppBar position="static" color="primary">
        <Toolbar>
          {/* Drawer Menu */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ marginRight: 2 }}
          >
            <MenuIcon /> {/* Use MenuIcon instead of the link tag */}
          </IconButton>

          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
            PaperProps={{
              sx: {
                width: 220,
                overflow: "visible",
                backgroundColor: "#fff",
              },
            }}
          >
            <Box sx={{ position: "relative" }}>
              <Typography variant="h6" sx={{ padding: "1rem" }}>
                Shop by Department
              </Typography>
              <Box>
              {menuItems.map((item, index) => (
  <Box
    key={index}
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0.5rem 1rem",
      cursor: "pointer",
      borderBottom: "1px solid #ddd",
      position: "relative",
      "&:hover > .submenu": {
        display: "block",
      },
    }}
    onMouseEnter={() => setHoveredItem(index)}
    onMouseLeave={() => setHoveredItem(null)}
  >
    <Typography>{item.label}</Typography>
    <ChevronRightIcon />
    {hoveredItem === index && (
      <Box
        className="submenu"
        sx={{
          display: "none",
          position: "absolute",
          top: 0,
          left: "100%",
          backgroundColor: "#fff",
          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
          border: "1px solid #ddd",
          zIndex: 10,
          width: 180,
        }}
      >
        {item.submenu.map((subItem, subIndex) => (
          <Link
            to={`/${subItem.replace(/\s/g, "")}`} // Converts item names to paths (e.g., Air Fryers -> /AirFryers)
            key={subIndex}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography
              sx={{
                padding: "0.5rem 1rem",
                borderBottom: "1px solid #f0f0f0",
                whiteSpace: "nowrap",
                "&:hover": {
                  backgroundColor: "#f9f9f9",
                },
              }}
            >
              {subItem}
            </Typography>
          </Link>
        ))}
      </Box>
    )}
  </Box>
))}

              </Box>
            </Box>
          </Drawer>

          {/* Title */}
          <Typography
  variant="h6"
  sx={{
    flexGrow: 1,
    textAlign: "center",
    fontSize: "24px",
    fontWeight: 700,
  }}
>
  LIHAWU TECH
</Typography>


          {/* Right Icons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button variant="text" color="inherit">
              Sign In
            </Button>
            <IconButton color="inherit" href="https://wa.me" aria-label="WhatsApp">
              <WhatsAppIcon />
            </IconButton>
            <Link to="/cart-items">
              <IconButton color="inherit" aria-label="Cart">
                <Badge badgeContent={totalQuantities}>
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Standalone Search Bar */}
      <Box sx={{ padding: 2, backgroundColor: "#f5f5f5" }}>
        <Box
          sx={{
            position: "relative",
            borderRadius: 1,
            backgroundColor: "#fff",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
            padding: "0.5rem 1rem",
            width: "100%",
          }}
        >
          <input
            placeholder="Search products…"
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              backgroundColor: "transparent",
            }}
            aria-label="search"
          />
        </Box>
      </Box>
    </>
  );
};

export default Header;
