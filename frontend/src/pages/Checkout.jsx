import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Paper, Box, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Alert } from '@mui/material';
import api from '../api/axios';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [error, setError] = useState('');
    const { fetchCart } = useCart();
    const navigate = useNavigate();

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        try {
            await api.post('/orders', { shippingAddress: address, paymentMethod });
            await fetchCart(); // refresh cart (should be empty now)
            navigate('/orders');
        } catch (err) {
            setError('Failed to place order. Please try again.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography variant="h4" gutterBottom>Checkout</Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <Box component="form" onSubmit={handlePlaceOrder}>
                    <TextField
                        required fullWidth multiline rows={4}
                        label="Shipping Address" margin="normal"
                        value={address} onChange={(e) => setAddress(e.target.value)}
                    />
                    
                    <FormControl component="fieldset" sx={{ mt: 2, mb: 2 }}>
                        <FormLabel component="legend">Payment Method</FormLabel>
                        <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                            <FormControlLabel value="COD" control={<Radio />} label="Cash on Delivery" />
                            <FormControlLabel value="CARD" control={<Radio />} label="Credit/Debit Card (Mock)" />
                        </RadioGroup>
                    </FormControl>

                    <Button type="submit" fullWidth variant="contained" size="large" sx={{ mt: 2 }}>
                        Place Order
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Checkout;
