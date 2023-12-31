import React from 'react';
import { useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, InputAdornment, Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import './LoginSignup.css'

const Login = ({redirect, signup}) => {

    const { control, handleSubmit } = useForm()

    const navigate = useNavigate();

    const login = (data) => {
        signInWithEmailAndPassword (getAuth() , data.email, data.password)
        .then(({ user }) => {
            // Go to the set redirect path when logged in
            navigate(redirect);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            switch (errorCode) {
                case "auth/invalid-email":
                    alert("Email address is not valid.");
                    break;
                case "auth/user-disabled":
                    alert("Account has been disabled.");
                    break;
                case "auth/user-not-found":
                    alert("No account associated with the email provided.")
                    break;
                case "auth/wrong-password":
                    alert("The password is incorrect.");
                    break;
                default:
                    alert(errorMessage);
                    break;
            }
            console.log(error);
        })
        .finally(() => {
        });
    }

    return (
        <Grid
            container
            component="form"
            id="loginForm"
            autoComplete="on"
            spacing={2}
            noValidate
            onSubmit={handleSubmit(login)}>
            <Grid xs={12}>
                <div className='header'>
                    <div className="text">Login</div>
                    <div className="underline"></div>
                </div>
            </Grid>
            <Controller
                name="email"
                control={control}
                rules={{
                    required: true,
                    pattern: /\S+@\S+\.\S+/
                }}
                render = {({ field, fieldState }) =>
                    <Grid xs={12}>
                        <TextField
                            required
                            value={field.value}
                            error={fieldState.error}
                            name={field.name}
                            onChange={field.onChange}
                            inputRef={field.ref}
                            label="Email"
                            variant="outlined"
                            type="email"
                            title="Must be a valid email address."
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                }
            />
            <Controller
                name="password"
                control={control}
                rules={{
                    required: true,
                    minLength: 8,
                }}
                render = {({ field, fieldState }) =>
                    <Grid xs={12}>
                        <TextField
                            required
                            value={field.value}
                            error={fieldState.error}
                            name={field.name}
                            onChange={field.onChange}
                            inputRef={field.ref}
                            label="Password"
                            variant="outlined"
                            type="password"
                            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters."
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PasswordIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                }
            />
            <Grid xs={12}>
                <Stack
                    spacing={2}
                    direction="row"
                    justifyContent="center"
                    alignItems="center">
                    {(signup) && 
                    <Button
                        size="small"
                        variant="contained"
                        onClick={signup}>
                        Sign Up
                    </Button>}
                    <LoadingButton
                        size="small"
                        variant="contained"
                        type="submit">
                        Login
                    </LoadingButton>
                </Stack>
            </Grid>
        </Grid>
    )
}

export default Login;