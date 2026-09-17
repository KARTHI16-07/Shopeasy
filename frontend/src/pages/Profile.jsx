import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Paper, Box, Alert } from '@mui/material';
import api from '../api/axios';

const Profile = () => {
    const [profile, setProfile] = useState({ firstName: '', lastName: '', phone: '', address: '' });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            const res = await api.get('/user/profile');
            setProfile(res.data);
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put('/user/profile', profile);
            setMessage('Profile updated successfully!');
        } catch (err) {
            setMessage('Error updating profile.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography variant="h4" gutterBottom>My Profile</Typography>
                {message && <Alert severity={message.includes('successfully') ? 'success' : 'error'} sx={{ mb: 2 }}>{message}</Alert>}
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField margin="normal" fullWidth label="First Name" name="firstName" value={profile.firstName || ''} onChange={handleChange} />
                    <TextField margin="normal" fullWidth label="Last Name" name="lastName" value={profile.lastName || ''} onChange={handleChange} />
                    <TextField margin="normal" fullWidth label="Email" value={profile.email || ''} disabled />
                    <TextField margin="normal" fullWidth label="Phone" name="phone" value={profile.phone || ''} onChange={handleChange} />
                    <TextField margin="normal" fullWidth label="Address" name="address" multiline rows={3} value={profile.address || ''} onChange={handleChange} />
                    
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
                        Update Profile
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Profile;
