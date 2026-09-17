import React, { useState, useEffect } from 'react';
import { Typography, Grid, Card, CardContent, CardMedia, CardActions, Button, Container, Box, CircularProgress } from '@mui/material';
import api from '../api/axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get('/public/products');
                setProducts(res.data.slice(0, 4)); // Get first 4 products for featured
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <Container>
            <Box sx={{ my: 4, textAlign: 'center' }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Welcome to ShopEasy
                </Typography>
                <Typography variant="h6" color="text.secondary" paragraph>
                    Your one-stop shop for everything!
                </Typography>
                <Button variant="contained" color="primary" size="large" component={Link} to="/products">
                    Shop Now
                </Button>
            </Box>

            <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 5 }}>
                Featured Products
            </Typography>
            
            {loading ? <CircularProgress /> : (
                <Grid container spacing={4}>
                    {products.map(product => (
                        <Grid item key={product.id} xs={12} sm={6} md={3}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={product.imageUrl || 'https://via.placeholder.com/200'}
                                    alt={product.name}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h6" component="h2">
                                        {product.name}
                                    </Typography>
                                    <Typography variant="h6" color="primary">
                                        ${product.price}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" component={Link} to={`/products/${product.id}`}>View Details</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default Home;
