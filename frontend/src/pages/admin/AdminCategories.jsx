import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import api from '../../api/axios';

const AdminCategories = () => {
    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ id: '', name: '', description: '' });

    const fetchCategories = async () => {
        const res = await api.get('/public/categories');
        setCategories(res.data);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleOpen = (category = null) => {
        if (category) {
            setFormData(category);
            setEditMode(true);
        } else {
            setFormData({ id: '', name: '', description: '' });
            setEditMode(false);
        }
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleSubmit = async () => {
        if (editMode) {
            await api.put(`/admin/categories/${formData.id}`, formData);
        } else {
            await api.post('/admin/categories', formData);
        }
        handleClose();
        fetchCategories();
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure? This will fail if products are linked.')) {
            try {
                await api.delete(`/admin/categories/${id}`);
                fetchCategories();
            } catch (err) {
                alert('Cannot delete category. Products are likely attached to it.');
            }
        }
    };

    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 3 }}>
                <Typography variant="h4">Manage Categories</Typography>
                <Button variant="contained" onClick={() => handleOpen()}>Add New Category</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.description}</TableCell>
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
                <DialogTitle>{editMode ? 'Edit Category' : 'Add Category'}</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" label="Name" fullWidth value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    <TextField margin="dense" label="Description" fullWidth multiline rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">Save</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default AdminCategories;
