import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme/theme';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import Orders from './pages/Orders';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCategories from './pages/admin/AdminCategories';
import AdminOrders from './pages/admin/AdminOrders';

const ProtectedRoute = ({ children, roleRequired }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    if (roleRequired && user.role !== roleRequired) return <Navigate to="/" />;
    return children;
};

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <AuthProvider>
                    <CartProvider>
                        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                            <Navbar />
                            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                                <Routes>
                                    {/* Public Routes */}
                                    <Route path="/" element={<Home />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/register" element={<Register />} />
                                    <Route path="/products" element={<ProductList />} />
                                    <Route path="/products/:id" element={<ProductDetails />} />

                                    {/* User Routes */}
                                    <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                                    <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                                    <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />

                                    {/* Admin Routes */}
                                    <Route path="/admin" element={<ProtectedRoute roleRequired="ROLE_ADMIN"><AdminDashboard /></ProtectedRoute>} />
                                    <Route path="/admin/products" element={<ProtectedRoute roleRequired="ROLE_ADMIN"><AdminProducts /></ProtectedRoute>} />
                                    <Route path="/admin/categories" element={<ProtectedRoute roleRequired="ROLE_ADMIN"><AdminCategories /></ProtectedRoute>} />
                                    <Route path="/admin/orders" element={<ProtectedRoute roleRequired="ROLE_ADMIN"><AdminOrders /></ProtectedRoute>} />
                                </Routes>
                            </Box>
                            <Footer />
                        </Box>
                    </CartProvider>
                </AuthProvider>
            </Router>
        </ThemeProvider>
    );
};

export default App;
