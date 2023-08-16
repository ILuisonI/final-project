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
import validateProfileSchema from "../validation/profileValidation";
import { Alert, CircularProgress, InputAdornment } from "@mui/material/";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import axios from "axios";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import useLoggedIn from "../hooks/useLoggedIn";

const ProfilePage = () => {
    const [inputState, setInputState] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        phone: "",
        email: "",
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

    const [showError, setShowError] = useState({
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

    const [userData, setUserData] = useState({});

    const [inputsErrorsState, setInputsErrorsState] = useState({});

    const [btnDisabled, setBtnDisabled] = useState(true);

    const navigate = useNavigate();

    const payload = useSelector((bigPie) => bigPie.authSlice.payload);

    const loggedIn = useLoggedIn();

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get("/users/userInfo/");
                setUserData(data);
                let newInputState = { ...data };
                if (data._id !== payload._id) {
                    toast.error("You Do Not Have Permission!");
                    navigate(ROUTES.HOME);
                }
                if (!newInputState.middleName) {
                    newInputState.middleName = "";
                }
                if (!newInputState.state) {
                    newInputState.state = "";
                }
                if (!newInputState.zip) {
                    newInputState.zip = "";
                }
                delete newInputState.password;
                delete newInputState.isAdmin;
                delete newInputState._id;
                delete newInputState.createdAt;
                delete newInputState.__v;
                setInputState(newInputState);
            } catch (err) {
                console.log("Error From Axios:", err.message);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const joiResponse = validateProfileSchema(inputState);
        setInputsErrorsState(joiResponse);
        if (!joiResponse) {
            setBtnDisabled(false);
        } else {
            setBtnDisabled(true);
        }
    }, [inputState]);

    const handleBtnClick = async () => {
        try {
            await axios.put(`/users/update-user/${userData._id}`, inputState);
            if (inputState.isBusiness !== userData.isBusiness) {
                const { data } = await axios.patch(`/users/change-biz/${userData._id}`);
                localStorage.setItem("token", data.token);
                loggedIn();
            }
        } catch (err) {
            console.log("Error From Axios:", err.message);
        }
        toast.success('Profile Edited Successfully!');
        navigate(ROUTES.HOME);
    };

    useEffect(() => {
        const joiResponse = validateProfileSchema(inputState);
        setInputsErrorsState(joiResponse);
    }, [inputState]);

    const handleInputChange = (ev) => {
        let newInputState = JSON.parse(JSON.stringify(inputState));
        newInputState[ev.target.id] = ev.target.value;
        setInputState(newInputState);
        let newShowError = JSON.parse(JSON.stringify(showError));
        newShowError[ev.target.id] = true;
        setShowError(newShowError);
    };

    const handleCheckedChange = (ev) => {
        let newInputState = JSON.parse(JSON.stringify(inputState));
        newInputState[ev.target.id] = ev.target.checked;
        setInputState(newInputState);
    };

    const cancelBtnClick = () => {
        navigate(ROUTES.HOME);
    };

    if (!inputState) {
        return <CircularProgress sx={{ position: "fixed", left: "50%", top: "50%" }} />;
    }

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
                    Update Profile
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
                                showError.firstName && inputsErrorsState && inputsErrorsState.firstName && (
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
                                showError.middleName && inputsErrorsState && inputsErrorsState.middleName && (
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
                                showError.lastName && inputsErrorsState && inputsErrorsState.lastName && (
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
                                showError.phone && inputsErrorsState && inputsErrorsState.phone && (
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
                                showError.email && inputsErrorsState && inputsErrorsState.email && (
                                    <Alert severity="warning">
                                        {inputsErrorsState.email.map(item =>
                                            <div key={"email-errors" + item}>{item}.</div>
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
                                showError.imageUrl && inputsErrorsState && inputsErrorsState.imageUrl && (
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
                                showError.imageAlt && inputsErrorsState && inputsErrorsState.imageAlt && (
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
                                showError.state && inputsErrorsState && inputsErrorsState.state && (
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
                                showError.country && inputsErrorsState && inputsErrorsState.country && (
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
                                showError.city && inputsErrorsState && inputsErrorsState.city && (
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
                                showError.street && inputsErrorsState && inputsErrorsState.street && (
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
                                showError.houseNumber && inputsErrorsState && inputsErrorsState.houseNumber && (
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
                                name="zipCode"
                                onChange={handleInputChange}
                                value={inputState.zip}
                            />
                            {
                                showError.zipCode && inputsErrorsState && inputsErrorsState.zip && (
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
                                    <Checkbox checked={inputState.isBusiness} id="isBusiness" name="isBusiness" onChange={handleCheckedChange} color="primary" />
                                }
                                label="Business Account"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button color="error" onClick={cancelBtnClick} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                    {
                        btnDisabled ?
                            <Button color="success" disabled fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Save
                            </Button> :
                            <Button color="success" onClick={handleBtnClick} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Save
                            </Button>
                    }
                </Box>
            </Box>
        </Container >
    );
};

export default ProfilePage;