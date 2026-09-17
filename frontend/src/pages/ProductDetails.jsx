import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Typography, Button, Box, CircularProgress, TextField } from '@mui/material';
import api from '../api/axios';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/public/products/${id}`);
                setProduct(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <CircularProgress />;
    if (!product) return <Typography>Product not found.</Typography>;

    return (
        <Container>
            <Grid container spacing={6} sx={{ mt: 2 }}>
                <Grid item xs={12} md={6}>
                    <Box component="img" src={product.imageUrl || 'https://via.placeholder.com/500'} alt={product.name} sx={{ width: '100%', borderRadius: 2 }} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h3" component="h1" gutterBottom>{product.name}</Typography>
                    <Typography variant="h5" color="primary" gutterBottom>${product.price}</Typography>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>Category: {product.category?.name}</Typography>
                    <Typography variant="body1" paragraph sx={{ mt: 2 }}>{product.description}</Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 4, gap: 2 }}>
                        <TextField 
                            type="number" 
                            label="Quantity" 
                            value={quantity} 
                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                            inputProps={{ min: 1, max: product.stock }}
                            sx={{ width: 100 }}
                        />
                        <Button variant="contained" size="large" onClick={() => addToCart(product.id, quantity)} disabled={product.stock === 0}>
                            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </Button>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{product.stock} items available</Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductDetails;
