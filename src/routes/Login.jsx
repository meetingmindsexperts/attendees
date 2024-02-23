import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Paper } from "@mui/material";
import axios from "axios";

function LoginPage({ onLogin }) {
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/login', {
                usernameOrEmail,
                password
            });

            const data = response.data;
            // Here you might handle successful login, e.g., set user state or redirect to another page
            onLogin(data.user);
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setError(error.response.data.message);
            } else if (error.request) {
                // The request was made but no response was received
                setError("Network error. Please try again later.");
            } else {
                // Something happened in setting up the request that triggered an Error
                setError("An unexpected error occurred. Please try again later.");
            }
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Paper elevation={0} style={{ padding: "20px" }}>
                    <Typography variant="h4" gutterBottom>Login</Typography>
                    {error && <Typography variant="body2" color="error" gutterBottom>{error}</Typography>}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            id="usernameOrEmail"
                            label="Username or Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={usernameOrEmail}
                            onChange={(e) => setUsernameOrEmail(e.target.value)}
                        />
                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button variant="contained" color="primary" type="submit" fullWidth>
                            Login
                        </Button>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default LoginPage;
