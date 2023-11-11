import React from 'react'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import { useForm, Controller } from "react-hook-form";
import { Stack, TextField, Button, InputAdornment } from '@mui/material';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import './LoginSignup.css'

const Signup = (redirect) => {
    const { control, handleSubmit, getValues, setError, formState: {errors} } = useForm({mode: "onBlur"})
    
    const onSubmit = (data) => {
        createUser(data);
    }

    const auth = getAuth();
    
    const isUsernameUnique = (username) => {
        return true;
    }
    
    const validatePassword = (password, name) => {
        var lowerCaseLetters = /[a-z]/g;
        if(!password.match(lowerCaseLetters)) {
            setError(name, {type: "lowercase", message: "Password needs at least 1 lowercase letter."});
            return false;
        }
    
        // Validate capital letters
        var upperCaseLetters = /[A-Z]/g;
        if(!password.match(upperCaseLetters)) {
            setError(name, {type: "uppercase", message: "Password needs at least 1 UPPERCASE letter."});
            return false;
        }
    
        // Validate numbers
        var numbers = /[0-9]/g;
        if(!password.match(numbers)) {
            setError(name, {type: "numbers", message: "Password needs at least 1 number (0-9)."});
            return false;
        }
    
        return true;
    }
    
    const doesPasswordsMatch = (password1, password2) => {
        return password1 === password2;
    }

    const createUser = (data) => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(({ user }) => {
          updateProfile(user, { displayName: data.username });
          // Go to the set redirect path after creating an account
          window.location.pathname=redirect
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            switch (errorCode) {
                case "auth/email-already-in-use":
                    alert("Email is already in use.");
                    break;
                case "auth/invalid-email":
                    alert("Email address is not valid.");
                    break;
                case "auth/weak-password":
                    alert("The password is too weak.");
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
        <Stack
            className="container"
            component="form"
            id="signupForm"
            autoComplete="on"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            noValidate
            onSubmit={handleSubmit(onSubmit)}>
            <div className='header'>
                <div className="text">Sign Up</div>
                <div className="underline"></div>
            </div>
            <Controller
                name="username"
                control={control}
                rules={{
                    required: true,
                    pattern: /^[a-zA-Z0-9_\.]+$/,
                    validate: (username) => {
                        isUsernameUnique(username);
                    }
                }}
                render = {({ field, fieldState }) =>
                    <TextField
                        required
                        value={field.value}
                        error={Boolean(fieldState.error)}
                        name={field.name}
                        onChange={field.onChange}
                        inputRef={field.ref}
                        label="Username"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonOutlineIcon />
                                </InputAdornment>
                            ),
                        }}
                    />}
            />
            {errors.username && <p>{errors.username.message}</p>}
            <Controller
                name="name"
                control={control}
                render = {({ field, fieldState }) =>
                    <TextField
                        value={field.value}
                        error={Boolean(fieldState.error)}
                        name={field.name}
                        onChange={field.onChange}
                        inputRef={field.ref}
                        label="Name"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon />
                                </InputAdornment>
                            ),
                        }}
                    />}
            />
            <Controller
                name="email"
                control={control}
                rules={{
                    required: true,
                    pattern: /\S+@\S+\.\S+/
                }}
                render = {({ field, fieldState }) =>
                    <TextField
                        required
                        value={field.value}
                        error={Boolean(fieldState.error)}
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
                    />}
            />
            <Controller
                name="password"
                control={control}
                rules={{
                    required: true,
                    minLength: 8,
                    validate: (password, field) => {
                        validatePassword(password, field?.name);
                    }
                }}
                render = {({ field, fieldState }) =>
                    <TextField
                        required
                        value={field.value}
                        error={Boolean(fieldState.error)}
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
                    />}
            />
            {errors.password && <div>{errors.password.message}</div>}
            <Controller
                name="password2"
                control={control}
                rules={{
                    required: true,
                    minLength: 8,
                    validate: (password) => {
                        const password1 = getValues("password");
                        if (validatePassword(password)) {
                            return String(doesPasswordsMatch(password1, password));
                        }
                        return "false";
                    }
                }}
                render = {({ field, fieldState }) =>
                    <TextField
                        required
                        value={field.value}
                        error={Boolean(fieldState.error)}
                        name={field.name}
                        onChange={field.onChange}
                        inputRef={field.ref}
                        label="Re-enter Password"
                        variant="outlined"
                        type="password"
                        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters. Must match the previous password entry."
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PasswordIcon />
                                </InputAdornment>
                            ),
                        }}
                    />}
            />
            {errors.password2 && <p>{errors.password2.message}</p>}
            <Button
                size="small"
                variant="contained"
                type="submit">
                Sign Up
            </Button>
        </Stack>
    );
}

export default Signup;