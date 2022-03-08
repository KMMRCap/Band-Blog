import { Typography } from '@mui/material';
import AdminLayout from 'components/AdminLayout';
import React from 'react';

const Dashboard = () => {
    return (
        <AdminLayout>
            <Typography component='h2' variant='h4'>Dashboard</Typography>
        </AdminLayout>
    );
}

export default Dashboard;