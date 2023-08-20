import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import validateRegisterSchema from "../validation/registerValidation";
import { Alert, InputAdornment } from "@mui/material/";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import axios from "axios";
import { toast } from 'react-toastify';

import RestartAltIcon from '@mui/icons-material/RestartAlt';

const RegisterPage = () => {
    const [inputState, setInputState] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        imageUrl: "",
        imageAlt: "",
        state: "",
        country: "",
        city: "",
        street: "",
        houseNumber: "",
        zip: "",
        isBusiness: false,
    });

    const [resetInputState] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        imageUrl: "",
        imageAlt: "",
        state: "",
        country: "",
        city: "",
        street: "",
        houseNumber: "",
        zip: "",
        isBusiness: false,
    });

    const [showErrors, setShowErrors] = useState({
        firstName: false,
        lastName: false,
        phone: false,
        email: false,
        password: false,
        country: false,
        city: false,
        street: false,
        houseNumber: false,
        zip: false,
    });

    const [inputsErrorsState, setInputsErrorsState] = useState(null);
    const [btnDisabled, setBtnDisabled] = useState(true);

    const navigate = useNavigate();

    const defImg = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

    useEffect(() => {
        const joiResponse = validateRegisterSchema(inputState);
        setInputsErrorsState(joiResponse);
        if (!joiResponse) {
            setBtnDisabled(false);
        } else {
            setBtnDisabled(true);
        }
    }, [inputState]);

    const handleBtnClick = async () => {
        try {
            await axios.post(
                "/users/register",
                {
                    firstName: inputState.firstName,
                    middleName: inputState.middleName,
                    lastName: inputState.lastName,
                    phone: inputState.phone,
                    email: inputState.email,
                    password: inputState.password,
                    imageUrl: inputState.imageUrl ? inputState.imageUrl : defImg,
                    imageAlt: inputState.imageAlt ? inputState.imageAlt : "No Image",
                    state: inputState.state,
                    country: inputState.country,
                    city: inputState.city,
                    street: inputState.street,
                    houseNumber: inputState.houseNumber,
                    //server won't allow empty zipCode so I made the default value to be 1
                    zip: inputState.zip ? inputState.zip : 1,
                    isBusiness: inputState.isBusiness,
                }
            );
            toast.success('Registration Successful!');
            navigate(ROUTES.LOGIN);
        } catch (err) {
            console.log("Error From Axios:", err.message);
        }
    };

    useEffect(() => {
        const joiResponse = validateRegisterSchema(inputState);
        setInputsErrorsState(joiResponse);
    }, [inputState]);

    const handleInputChange = (ev) => {
        let newInputState = JSON.parse(JSON.stringify(inputState));
        newInputState[ev.target.id] = ev.target.value;
        setInputState(newInputState);
        let newShowErrors = JSON.parse(JSON.stringify(showErrors));
        newShowErrors[ev.target.id] = true;
        setShowErrors(newShowErrors);
    };

    const handleCheckedChange = (ev) => {
        let newInputState = JSON.parse(JSON.stringify(inputState));
        newInputState[ev.target.id] = ev.target.checked;
        setInputState(newInputState);
    };

    const resetAll = () => {
        setShowErrors({ ...false });
        setInputState(resetInputState);
        setInputsErrorsState(null);
    };

    const cancelBtnClick = () => {
        navigate(ROUTES.HOME);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h2">
                    Register
                </Typography>
                <Box component="div" noValidate sx={{ mt: 3, width: "50vw" }}>
                    <Grid container alignItems={"center"} justifyContent={"center"} spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={handleInputChange}
                                value={inputState.firstName}
                            />
                            {
                                showErrors.firstName && inputsErrorsState && inputsErrorsState.firstName && (
                                    <Alert severity="warning">
                                        {inputsErrorsState.firstName.map(item =>
                                            <div key={"firstname-errors" + item}>{item}.</div>
                                        )}
                                    </Alert>
                                )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="middleName"
                                fullWidth
                                id="middleName"
                                label="Middle Name"
                                onChange={handleInputChange}
                                value={inputState.middleName}
                            />
                            {
                                showErrors.middleName && inputsErrorsState && inputsErrorsState.middleName && (
                                    <Alert severity="warning">
                                        {inputsErrorsState.middleName.map(item =>
                                            <div key={"middlename-errors" + item}>{item}.</div>
                                        )}
                                    </Alert>
                                )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                onChange={handleInputChange}
                                value={inputState.lastName}
                            />
                            {
                                showErrors.lastName && inputsErrorsState && inputsErrorsState.lastName && (
                                    <Alert severity="warning">
                                        {inputsErrorsState.lastName.map(item =>
                                            <div key={"lastname-errors" + item}>{item}.</div>
                                        )}
                                    </Alert>
                                )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="phone"
                                label="Phone Number"
                                name="phone"
                                onChange={handleInputChange}
                                value={inputState.phone}
                            />
                            {
                                showErrors.phone && inputsErrorsState && inputsErrorsState.phone && (
                                    <Alert severity="warning">
                                        {inputsErrorsState.phone.map(item =>
                                            <div key={"lastname-errors" + item}>{item}.</div>
                                        )}
                                    </Alert>
                                )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                onChange={handleInputChange}
                                value={inputState.email}
                            />
                            {
                                showErrors.email && inputsErrorsState && inputsErrorsState.email && (
                                    <Alert severity="warning">
                                        {inputsErrorsState.email.map(item =>
                                            <div key={"email-errors" + item}>{item}.</div>
                                        )}
                                    </Alert>
                                )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={handleInputChange}
                                value={inputState.password}
                            />
                            {
                                showErrors.password && inputsErrorsState && inputsErrorsState.password && (
                                    <Alert severity="warning">
                                        {inputsErrorsState.password.map(item =>
                                            <div key={"password-errors" + item}>{item}.</div>
                                        )}
                                    </Alert>
                                )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                id="imageUrl"
                                label="Image URL"
                                name="imageUrl"
                                onChange={handleInputChange}
                                value={inputState.imageUrl}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start" >
                                            <Avatar alt={inputState.imageAlt} src={inputState.imageUrl} />
                                        </InputAdornment>
                                    )
                                }}

                            />
                            {
                                showErrors.imageUrl && inputsErrorsState && inputsErrorsState.imageUrl && (
                                    <Alert severity="warning">
                                        {inputsErrorsState.imageUrl.map(item =>
                                            <div key={"imageUrl-errors" + item}>{item}.</div>
                                        )}
                                    </Alert>
                                )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                id="imageAlt"
                                label="Image ALT"
                                name="imageAlt"
                                onChange={handleInputChange}
                                value={inputState.imageAlt}
                            />
                            {
                                showErrors.imageAlt && inputsErrorsState && inputsErrorsState.imageAlt && (
                                    <Alert severity="warning">
                                        {inputsErrorsState.imageAlt.map(item =>
                                            <div key={"imageUrl-errors" + item}>{item}.</div>
                                        )}
                                    </Alert>
                                )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                id="state"
                                label="State"
                                name="state"
                                onChange={handleInputChange}
                                value={inputState.state}
                            />
                            {
                                showErrors.state && inputsErrorsState && inputsErrorsState.state && (
                                    <Alert severity="warning">
                                        {inputsErrorsState.state.map(item =>
                                            <div key={"imageUrl-errors" + item}>{item}.</div>
                                        )}
                                    </Alert>
                                )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                required
                                id="country"
                                label="Country"
                                name="country"
                                onChange={handleInputChange}
                                value={inputState.country}
                            />
                            {
                                showErrors.country && inputsErrorsState && inputsErrorsState.country && (
                                    <Alert severity="warning">
                                        {inputsErrorsState.country.map(item =>
                                            <div key={"imageUrl-errors" + item}>{item}.</div>
                                        )}
                                    </Alert>
                                )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                required
                                id="city"
                                label="City"
                                name="city"
                                onChange={handleInputChange}
                                value={inputState.city}
                            />
                            {
                                showErrors.city && inputsErrorsState && inputsErrorsState.city && (
                                    <Alert severity="warning">
                                        {inputsErrorsState.city.map(item =>
                                            <div key={"imageUrl-errors" + item}>{item}.</div>
                                        )}
                                    </Alert>
                                )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                required
                                id="street"
                                label="Street"
                                name="street"
                                onChange={handleInputChange}
                                value={inputState.street}
                            />
                            {
                                showErrors.street && inputsErrorsState && inputsErrorsState.street && (
                                    <Alert severity="warning">
                                        {inputsErrorsState.street.map(item =>
                                            <div key={"imageUrl-errors" + item}>{item}.</div>
                                        )}
                                    </Alert>
                                )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                required
                                id="houseNumber"
                                label="House Number"
                                name="houseNumber"
                                onChange={handleInputChange}
                                value={inputState.houseNumber}
                            />
                            {
                                showErrors.houseNumber && inputsErrorsState && inputsErrorsState.houseNumber && (
                                    <Alert severity="warning">
                                        {inputsErrorsState.houseNumber.map(item =>
                                            <div key={"imageUrl-errors" + item}>{item}.</div>
                                        )}
                                    </Alert>
                                )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                id="zip"
                                label="Zip Code"
                                name="zip"
                                onChange={handleInputChange}
                                value={inputState.zip}
                            />
                            {
                                showErrors.zip && inputsErrorsState && inputsErrorsState.zip && (
                                    <Alert severity="warning">
                                        {inputsErrorsState.zip.map(item =>
                                            <div key={"imageUrl-errors" + item}>{item}.</div>
                                        )}
                                    </Alert>
                                )}
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox id="isBusiness" name="isBusiness" onChange={handleCheckedChange} color="primary" />
                                }
                                label="Business Account"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Button color="error" onClick={cancelBtnClick} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button color="warning" onClick={resetAll} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                <RestartAltIcon />
                            </Button>
                        </Grid>
                    </Grid>
                    {
                        btnDisabled ?
                            <Button disabled fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Sign Up
                            </Button> :
                            <Button onClick={handleBtnClick} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Sign Up
                            </Button>
                    }
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link style={{ textDecoration: `none`, color: "inherit" }} to={ROUTES.LOGIN}>
                                <Typography variant="body2">
                                    Already have an account? Sign in
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container >
    );
};
export default RegisterPage;