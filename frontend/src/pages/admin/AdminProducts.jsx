import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import api from '../../api/axios';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ id: '', name: '', description: '', price: '', stock: '', imageUrl: '', category: { id: '' } });

    const fetchData = async () => {
        try {
            const [prodRes, catRes] = await Promise.all([
                api.get('/public/products'),
                api.get('/public/categories')
            ]);
            setProducts(prodRes.data);
            setCategories(catRes.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleOpen = (product = null) => {
        if (product) {
            setFormData({ ...product, category: { id: product.category?.id || '' } });
            setEditMode(true);
        } else {
            setFormData({ id: '', name: '', description: '', price: '', stock: '', imageUrl: '', category: { id: '' } });
            setEditMode(false);
        }
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleSubmit = async () => {
        try {
            if (editMode) {
                await api.put(`/admin/products/${formData.id}`, formData);
            } else {
                await api.post('/admin/products', formData);
            }
            handleClose();
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await api.delete(`/admin/products/${id}`);
            fetchData();
        }
    };

    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 3 }}>
                <Typography variant="h4">Manage Products</Typography>
                <Button variant="contained" onClick={() => handleOpen()}>Add New Product</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Stock</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell><img src={row.imageUrl} alt={row.name} style={{ width: 50, height: 50, objectFit: 'cover' }} /></TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>${row.price}</TableCell>
                                <TableCell>{row.stock}</TableCell>
                                <TableCell>{row.category?.name}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleOpen(row)} color="primary"><EditIcon /></IconButton>
                                    <IconButton onClick={() => handleDelete(row.id)} color="error"><DeleteIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>{editMode ? 'Edit Product' : 'Add Product'}</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" label="Name" fullWidth value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    <TextField margin="dense" label="Description" fullWidth multiline rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                    <TextField margin="dense" label="Price" type="number" fullWidth value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                    <TextField margin="dense" label="Stock" type="number" fullWidth value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} />
                    <TextField margin="dense" label="Image URL" fullWidth value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} />
                    <TextField select margin="dense" label="Category" fullWidth value={formData.category.id} onChange={(e) => setFormData({ ...formData, category: { id: e.target.value } })}>
                        {categories.map((c) => (
                            <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">Save</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default AdminProducts;
