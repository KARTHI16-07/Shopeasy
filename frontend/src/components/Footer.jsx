import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 3, mt: 'auto', textAlign: 'center' }}>
            <Typography variant="body1">
                &copy; {new Date().getFullYear()} ShopEasy. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
