import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cart } = useCart();

    const itemCount = cart.items ? cart.items.reduce((acc, item) => acc + item.quantity, 0) : 0;

    return (
        <AppBar position="static">
            <Toolbar>
                <StorefrontIcon sx={{ mr: 2 }} />
                <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
                    ShopEasy
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button color="inherit" component={Link} to="/products">Products</Button>
                    
                    {user ? (
                        <>
                            {user.role === 'ROLE_ADMIN' ? (
                                <Button color="inherit" component={Link} to="/admin">Dashboard</Button>
                            ) : (
                                <>
                                    <Button color="inherit" component={Link} to="/orders">My Orders</Button>
                                    <Button color="inherit" component={Link} to="/profile">Profile</Button>
                                    <IconButton color="inherit" component={Link} to="/cart">
                                        <Badge badgeContent={itemCount} color="secondary">
                                            <ShoppingCartIcon />
                                        </Badge>
                                    </IconButton>
                                </>
                            )}
                            <Button color="inherit" onClick={logout}>Logout</Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/login">Login</Button>
                            <Button color="inherit" component={Link} to="/register">Register</Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
