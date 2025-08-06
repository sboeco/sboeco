import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import {
  Home,
  CarParts,
  Computer,  
  Clothing,
  Electronics,
  ProductDetails,
  Cart,
  AirFryers,
  Kettles,
  Blenders,
  Laptops,
 Phones,
  Tablets,
   Skincare, 
   Makeup,
    Fragrances, 
    Shirts,
    CellPhone,
     Shoes, 
    Jeans ,
    SmartWatches,
    FitnessTrackers,
    GamingConsoles,
    Television,
    Speakers,
    WiFiRouters,
    DataDevices,
    PowerBanks,
    Lights,
    Gaming,
    AdminDashboard,
    Checkout,
    SignIn,
    SignUp


} from './pages'
import { AuthProvider } from './Context/appstate/AuthContext/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Auth routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Redirect root to signin */}
        <Route path="/" element={<Navigate to="/signin" replace />} />

        {/* Protected routes */}
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/carparts" element={
          <ProtectedRoute>
            <CarParts />
          </ProtectedRoute>
        } />
        <Route path="/clothing" element={
          <ProtectedRoute>
            <Clothing />
          </ProtectedRoute>
        } />
        <Route path="/electronics" element={
          <ProtectedRoute>
            <Electronics />
          </ProtectedRoute>
        } />
        <Route path="/product-details/:productId" element={
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        } />
        <Route path="/cart-items" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />
        <Route path="/AdminDashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/Checkout" element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        } />
        <Route path="/AirFryers" element={
          <ProtectedRoute>
            <AirFryers />
          </ProtectedRoute>
        } />
        <Route path="/Kettles" element={
          <ProtectedRoute>
            <Kettles />
          </ProtectedRoute>
        } />
        <Route path="/Blenders" element={
          <ProtectedRoute>
            <Blenders />
          </ProtectedRoute>
        } />
        <Route path="/Laptops" element={
          <ProtectedRoute>
            <Laptops />
          </ProtectedRoute>
        } />
        <Route path="/Phones" element={
          <ProtectedRoute>
            <Phones />
          </ProtectedRoute>
        } />
        <Route path="/Tablets" element={
          <ProtectedRoute>
            <Tablets />
          </ProtectedRoute>
        } />
        <Route path="/Skincare" element={
          <ProtectedRoute>
            <Skincare />
          </ProtectedRoute>
        } />
        <Route path="/Makeup" element={
          <ProtectedRoute>
            <Makeup />
          </ProtectedRoute>
        } />
        <Route path="/Fragrances" element={
          <ProtectedRoute>
            <Fragrances />
          </ProtectedRoute>
        } />
        <Route path="/Shirts" element={
          <ProtectedRoute>
            <Shirts />
          </ProtectedRoute>
        } />
        <Route path="/Shoes" element={
          <ProtectedRoute>
            <Shoes />
          </ProtectedRoute>
        } />
        <Route path="/Jeans" element={
          <ProtectedRoute>
            <Jeans />
          </ProtectedRoute>
        } />
        <Route path="/Computer" element={
          <ProtectedRoute>
            <Computer />
          </ProtectedRoute>
        } />
        <Route path="/CellPhone" element={
          <ProtectedRoute>
            <CellPhone />
          </ProtectedRoute>
        } />
        <Route path="/Gaming" element={
          <ProtectedRoute>
            <Gaming />
          </ProtectedRoute>
        } />
        <Route path="/FitnessTrackers" element={
          <ProtectedRoute>
            <FitnessTrackers />
          </ProtectedRoute>
        } />
        <Route path="/GamingConsoles" element={
          <ProtectedRoute>
            <GamingConsoles />
          </ProtectedRoute>
        } />
        <Route path="/Television" element={
          <ProtectedRoute>
            <Television />
          </ProtectedRoute>
        } />
        <Route path="/Speakers" element={
          <ProtectedRoute>
            <Speakers />
          </ProtectedRoute>
        } />
        <Route path="/WiFiRouters" element={
          <ProtectedRoute>
            <WiFiRouters />
          </ProtectedRoute>
        } />
        <Route path="/DataDevices" element={
          <ProtectedRoute>
            <DataDevices />
          </ProtectedRoute>
        } />
        <Route path="/PowerBanks" element={
          <ProtectedRoute>
            <PowerBanks />
          </ProtectedRoute>
        } />
        <Route path="/Lights" element={
          <ProtectedRoute>
            <Lights />
          </ProtectedRoute>
        } />
        <Route path="/SmartWatches" element={
          <ProtectedRoute>
            <SmartWatches />
          </ProtectedRoute>
        } />

      </Routes>
    </AuthProvider>
  );
}

export default App;
