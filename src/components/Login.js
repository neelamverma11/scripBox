import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';

const Login = ({ setUser }) => {
    const [employeeId, setEmployeeId] = useState('');

    const handleLogin = () => {
        if (employeeId.trim() !== '') {
            setUser({ employeeId });
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Login</Typography>
            <TextField
                label="Enter Employee ID"
                variant="outlined"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleLogin}>
                Login
            </Button>
        </Container>
    );
};

export default Login;
