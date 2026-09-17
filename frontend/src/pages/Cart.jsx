import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton, Button, Box, Divider, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, updateQuantity, removeFromCart } = useCart();

    if (!cart.items || cart.items.length === 0) {
        return (
            <Container sx={{ textAlign: 'center', mt: 10 }}>
                <Typography variant="h5" gutterBottom>Your Cart is Empty</Typography>
                <Button variant="contained" component={Link} to="/products" sx={{ mt: 2 }}>Continue Shopping</Button>
            </Container>
        );
    }

    const totalAmount = cart.items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>Shopping Cart</Typography>
            <Paper elevation={3} sx={{ p: 2 }}>
                <List>
                    {cart.items.map((item) => (
                        <React.Fragment key={item.id}>
                            <ListItem alignItems="center">
                                <ListItemAvatar>
                                    <Avatar variant="square" src={item.product.imageUrl} sx={{ width: 80, height: 80, mr: 2 }} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<Typography variant="h6">{item.product.name}</Typography>}
                                    secondary={`$${item.product.price}`}
                                />
                                <Box sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
                                    <IconButton onClick={() => updateQuantity(item.product.id, item.quantity - 1)} disabled={item.quantity <= 1}><RemoveIcon /></IconButton>
                                    <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                                    <IconButton onClick={() => updateQuantity(item.product.id, item.quantity + 1)}><AddIcon /></IconButton>
                                </Box>
                                <Typography variant="h6" sx={{ minWidth: 80, textAlign: 'right' }}>${(item.product.price * item.quantity).toFixed(2)}</Typography>
                                <IconButton edge="end" color="error" onClick={() => removeFromCart(item.product.id)} sx={{ ml: 2 }}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                            <Divider component="li" />
                        </React.Fragment>
                    ))}
                </List>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, p: 2 }}>
                    <Typography variant="h5">Total: ${totalAmount.toFixed(2)}</Typography>
                    <Button variant="contained" color="primary" size="large" component={Link} to="/checkout">
                        Proceed to Checkout
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Cart;
