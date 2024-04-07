import React, { useContext, useState } from 'react';
import { Button, Stack, TextField, Typography, colors } from '@mui/material';
import { ScreenMode } from '../pages/SignInPage';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContexProvider';
import Alert from '@mui/material/Alert';


const SignInForm = ({ onSwitchMode }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        if (email && password) {
            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                const token = await response.json();
                if (token) {
                    navigate('/');
                    setAuth({ isAuth: true, token: token });
                }
            } catch (err) {
                alert('Login failed. Please try again.');
            }
        } else {
            alert('Please fill all the fields.');
            // <Alert variant="filled" severity="warning">
            //     This is a filled warning Alert.
            // </Alert>
        }
    };
    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
                height: "100%",
                color: colors.grey[800]
            }}
        >
            <Stack spacing={5} sx={{
                width: "100%",
                maxWidth: "500px"
            }}>
                <Stack>
                    <Typography variant='h4' fontWeight={600} color={colors.grey[800]}>
                        Welcome back
                    </Typography>
                    <Typography color={colors.grey[600]}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit
                    </Typography>
                </Stack>

                <Stack spacing={4}>
                    <Stack spacing={2}>
                        <Stack spacing={1}>
                            <Typography color={colors.grey[800]}>Email</Typography>
                            <TextField onChange={(e) => setEmail(e.target.value)} />
                        </Stack>
                        <Stack spacing={1}>
                            <Typography color={colors.grey[800]}>Password</Typography>
                            <TextField type='password' onChange={(e) => setPassword(e.target.value)} />
                        </Stack>
                    </Stack>
                    <Button
                        variant='contained'
                        size='large'
                        sx={{
                            bgcolor: colors.grey[800],
                            "&:hover": {
                                bgcolor: colors.grey[600]
                            }
                        }}
                        onClick={handleLogin}
                    >
                        Sign in
                    </Button>
                </Stack>

                <Stack direction="row" spacing={2}>
                    <Typography>Don't have an account?</Typography>
                    <Typography
                        onClick={() => onSwitchMode(ScreenMode.SIGN_UP)}
                        fontWeight={600}
                        sx={{
                            cursor: "pointer",
                            userSelect: "none"
                        }}
                    >
                        Sign up now
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    );
}

export default SignInForm
