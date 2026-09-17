import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import api from '../../api/axios';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ products: 0, users: 0, orders: 0, revenue: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [prodRes, userRes, ordRes] = await Promise.all([
                    api.get('/public/products'),
                    api.get('/admin/users'),
                    api.get('/admin/orders')
                ]);
                
                const revenue = ordRes.data.reduce((acc, curr) => acc + curr.totalAmount, 0);
                
                setStats({
                    products: prodRes.data.length,
                    users: userRes.data.length,
                    orders: ordRes.data.length,
                    revenue: revenue
                });
            } catch (err) {
                console.error("Failed to fetch stats", err);
            }
        };
        fetchStats();
    }, []);

    const StatCard = ({ title, value, link }) => (
        <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center', height: '100%', textDecoration: 'none', display: 'block' }} component={Link} to={link}>
                <Typography color="text.secondary" gutterBottom>{title}</Typography>
                <Typography variant="h4">{value}</Typography>
            </Paper>
        </Grid>
    );

    return (
        <Container>
            <Typography variant="h4" gutterBottom sx={{ mt: 2, mb: 4 }}>Admin Dashboard</Typography>
            <Grid container spacing={3}>
                <StatCard title="Total Products" value={stats.products} link="/admin/products" />
                <StatCard title="Total Categories" value="Manage" link="/admin/categories" />
                <StatCard title="Total Users" value={stats.users} link="#" />
                <StatCard title="Total Orders" value={stats.orders} link="/admin/orders" />
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
                        <Typography gutterBottom>Total Revenue</Typography>
                        <Typography variant="h3">${stats.revenue.toFixed(2)}</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AdminDashboard;
