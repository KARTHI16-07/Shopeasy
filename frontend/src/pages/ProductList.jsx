import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, CardActions, Button, Typography, TextField, MenuItem, Box, CircularProgress } from '@mui/material';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const catRes = await api.get('/public/categories');
                setCategories(catRes.data);
                fetchProducts();
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            let url = '/public/products';
            if (categoryFilter) url += `?categoryId=${categoryFilter}`;
            else if (search) url += `?search=${search}`;
            
            const res = await api.get(url);
            setProducts(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [categoryFilter, search]);

    return (
        <Container>
            <Box sx={{ mb: 4, display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                <TextField 
                    label="Search Products" 
                    variant="outlined" 
                    fullWidth 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <TextField
                    select
                    label="Category"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    sx={{ minWidth: 200 }}
                >
                    <MenuItem value="">All Categories</MenuItem>
                    {categories.map(c => (
                        <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                    ))}
                </TextField>
            </Box>

            {loading ? <CircularProgress /> : (
                <Grid container spacing={4}>
                    {products.map(product => (
                        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={product.imageUrl || 'https://via.placeholder.com/200'}
                                    alt={product.name}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h6" component="h2">{product.name}</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        {product.description.substring(0, 60)}...
                                    </Typography>
                                    <Typography variant="h6" color="primary">${product.price}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" component={Link} to={`/products/${product.id}`}>Details</Button>
                                    <Button size="small" variant="contained" onClick={() => addToCart(product.id, 1)}>Add to Cart</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                    {products.length === 0 && <Typography variant="h6" sx={{ mt: 4, width: '100%', textAlign: 'center' }}>No products found.</Typography>}
                </Grid>
            )}
        </Container>
    );
};

export default ProductList;
