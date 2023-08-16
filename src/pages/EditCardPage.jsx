import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import EditIcon from '@mui/icons-material/Edit';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import validateCardSchema, { validateCardParamSchema } from "../validation/cardValidation";
import { Alert, CircularProgress } from "@mui/material/";
import { useNavigate, useParams } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const EditCardPage = () => {
    const [showErrors, setShowError] = useState({
        title: false,
        subTitle: false,
        description: false,
        state: false,
        country: false,
        city: false,
        street: false,
        houseNumber: false,
        zipCode: false,
        phone: false,
        email: false,
        web: false,
        url: false,
        alt: false,
    });

    const { id } = useParams();

    const [inputState, setInputState] = useState(null);

    const [inputsErrorsState, setInputsErrorsState] = useState({});

    const [btnDisabled, setBtnDisabled] = useState(true);

    const navigate = useNavigate();

    const payload = useSelector((bigPie) => bigPie.authSlice.payload);

    const defImg = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";


    useEffect(() => {
        (async () => {
            try {
                const errors = validateCardParamSchema({ id });
                if (errors) {
                    navigate(ROUTES.HOME);
                    return;
                }
                const { data } = await axios.get("/cards/card/" + id);
                let newInputState = { ...data };
                if (data.user_id !== payload._id) {
                    toast.error("You Do Not Have Permission!");
                    navigate(ROUTES.HOME);
                }
                delete newInputState.bizNumber;
                delete newInputState.createdAt;
                newInputState.url = newInputState.image.url;
                newInputState.alt = newInputState.image.alt;
                delete newInputState.image;
                delete newInputState.likes;
                delete newInputState.user_id;
                delete newInputState.__v;
                delete newInputState._id;
                if (!newInputState.state) {
                    newInputState.state = "";
                }
                if (!newInputState.zipCode) {
                    newInputState.zipCode = "";
                }
                if (!newInputState.web) {
                    newInputState.web = "";
                }
                setInputState(newInputState);
            } catch (err) {
                console.log("Error From Axios:", err.message);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        const joiResponse = validateCardSchema(inputState);
        setInputsErrorsState(joiResponse);
        if (!joiResponse) {
            setBtnDisabled(false);
        } else {
            setBtnDisabled(true);
        }
    }, [inputState]);

    const handleCancelBtnClick = () => {
        navigate(ROUTES.HOME);
    };

    const handleSavelBtnClick = async () => {
        try {
            const joiResponse = validateCardSchema(inputState);
            setInputsErrorsState(joiResponse);
            if (!joiResponse) {
                await axios.put("/cards/" + id, inputState);
                toast.success("Plant Edited Successfully!");
                navigate(ROUTES.MYCARDS);
            }
        } catch (err) {
            toast.error('Oops');
            console.log("Save Error:", err.response.data);
        }
    }

    useEffect(() => {
        const joiResponse = validateCardSchema(inputState);
        setInputsErrorsState(joiResponse);
    }, [inputState]);

    const handleInputChange = (ev) => {
        let newInputState = JSON.parse(JSON.stringify(inputState));
        newInputState[ev.target.id] = ev.target.value;
        setInputState(newInputState);
        let newShowErrors = JSON.parse(JSON.stringify(showErrors));
        newShowErrors[ev.target.id] = true;
        setShowError(newShowErrors);
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
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <EditIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Edit Card
                </Typography>
                <Box
                    component="img"
                    sx={{
                        height: 233,
                        width: 350,
                        maxHeight: { xs: 233, md: 167 },
                        maxWidth: { xs: 350, md: 250 },
                    }}
                    alt={inputState &&
                        inputState.alt ?
                        inputState.alt : ""}
                    src={inputState.url ? inputState.url : defImg}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = defImg;
                    }}
                />
                <Box component="div" noValidate sx={{ mt: 3, width: "50vw" }}>
                    <Box component="div" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    fullWidth
                                    id="url"
                                    label="Image URL"
                                    name="url"
                                    autoComplete="url"
                                    onChange={handleInputChange}
                                    value={inputState.url}
                                />
                                {
                                    showErrors.url && inputsErrorsState && inputsErrorsState.url && (
                                        <Alert severity="warning">
                                            {inputsErrorsState.url.map(item =>
                                                <div key={"url-errors" + item}>{item}.</div>
                                            )}
                                        </Alert>
                                    )}
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <TextField
                                    fullWidth
                                    id="alt"
                                    label="Image Alt"
                                    name="alt"
                                    autoComplete="alt"
                                    onChange={handleInputChange}
                                    value={inputState.alt}
                                />
                                {
                                    showErrors.alt && inputsErrorsState && inputsErrorsState.alt && (
                                        <Alert severity="warning">
                                            {inputsErrorsState.alt.map(item =>
                                                <div key={"alt-errors" + item}>{item}.</div>
                                            )}
                                        </Alert>
                                    )}
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="title"
                                    label="Title"
                                    name="title"
                                    autoComplete="title"
                                    onChange={handleInputChange}
                                    value={inputState.title}
                                />
                                {
                                    showErrors.title && inputsErrorsState && inputsErrorsState.title && (
                                        <Alert severity="warning">
                                            {inputsErrorsState.title.map(item =>
                                                <div key={"title-errors" + item}>{item}.</div>
                                            )}
                                        </Alert>
                                    )}
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="subTitle"
                                    label="Sub Title"
                                    id="subTitle"
                                    autoComplete="subTitle"
                                    onChange={handleInputChange}
                                    value={inputState.subTitle}
                                />
                                {
                                    showErrors.subTitle && inputsErrorsState && inputsErrorsState.subTitle && (
                                        <Alert severity="warning">
                                            {inputsErrorsState.subTitle.map(item =>
                                                <div key={"subTitle-errors" + item}>{item}.</div>
                                            )}
                                        </Alert>
                                    )}
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="description"
                                    label="Description"
                                    name="description"
                                    autoComplete="description"
                                    onChange={handleInputChange}
                                    value={inputState.description}
                                />
                                {
                                    showErrors.description && inputsErrorsState && inputsErrorsState.description && (
                                        <Alert severity="warning">
                                            {inputsErrorsState.description.map(item =>
                                                <div key={"description-errors" + item}>{item}.</div>
                                            )}
                                        </Alert>
                                    )}
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <TextField
                                    fullWidth
                                    id="state"
                                    label="State"
                                    name="state"
                                    autoComplete="state"
                                    onChange={handleInputChange}
                                    value={inputState.state}
                                />
                                {
                                    showErrors.state && inputsErrorsState && inputsErrorsState.state && (
                                        <Alert severity="warning">
                                            {inputsErrorsState.state.map(item =>
                                                <div key={"state-errors" + item}>{item}.</div>
                                            )}
                                        </Alert>
                                    )}
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="country"
                                    label="Country"
                                    name="country"
                                    autoComplete="country"
                                    onChange={handleInputChange}
                                    value={inputState.country}
                                />
                                {
                                    showErrors.country && inputsErrorsState && inputsErrorsState.country && (
                                        <Alert severity="warning">
                                            {inputsErrorsState.country.map(item =>
                                                <div key={"country-errors" + item}>{item}.</div>
                                            )}
                                        </Alert>
                                    )}
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="city"
                                    label="City"
                                    name="city"
                                    autoComplete="city"
                                    onChange={handleInputChange}
                                    value={inputState.city}
                                />
                                {
                                    showErrors.city && inputsErrorsState && inputsErrorsState.city && (
                                        <Alert severity="warning">
                                            {inputsErrorsState.city.map(item =>
                                                <div key={"city-errors" + item}>{item}.</div>
                                            )}
                                        </Alert>
                                    )}
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="street"
                                    label="Street"
                                    name="street"
                                    autoComplete="street"
                                    onChange={handleInputChange}
                                    value={inputState.street}
                                />
                                {
                                    showErrors.street && inputsErrorsState && inputsErrorsState.street && (
                                        <Alert severity="warning">
                                            {inputsErrorsState.street.map(item =>
                                                <div key={"street-errors" + item}>{item}.</div>
                                            )}
                                        </Alert>
                                    )}
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="houseNumber"
                                    label="House Number"
                                    name="houseNumber"
                                    autoComplete="houseNumber"
                                    onChange={handleInputChange}
                                    value={inputState.houseNumber}
                                />
                                {
                                    showErrors.houseNumber && inputsErrorsState && inputsErrorsState.houseNumber && (
                                        <Alert severity="warning">
                                            {inputsErrorsState.houseNumber.map(item =>
                                                <div key={"houseNumber-errors" + item}>{item}.</div>
                                            )}
                                        </Alert>
                                    )}
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <TextField
                                    fullWidth
                                    id="zipCode"
                                    label="Zip Code"
                                    name="zipCode"
                                    type="number"
                                    autoComplete="zipCode"
                                    onChange={handleInputChange}
                                    value={inputState.zipCode}
                                />
                                {
                                    showErrors.zipCode && inputsErrorsState && inputsErrorsState.zipCode && (
                                        <Alert severity="warning">
                                            {inputsErrorsState.zipCode.map(item =>
                                                <div key={"zipCode-errors" + item}>{item}.</div>
                                            )}
                                        </Alert>
                                    )}
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Phone"
                                    name="phone"
                                    autoComplete="phone"
                                    onChange={handleInputChange}
                                    value={inputState.phone}
                                />
                                {
                                    showErrors.phone && inputsErrorsState && inputsErrorsState.phone && (
                                        <Alert severity="warning">
                                            {inputsErrorsState.phone.map(item =>
                                                <div key={"phone-errors" + item}>{item}.</div>
                                            )}
                                        </Alert>
                                    )}
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
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
                            <Grid item xs={12} sm={6} md={6}>
                                <TextField
                                    fullWidth
                                    id="web"
                                    label="Web"
                                    name="web"
                                    autoComplete="web"
                                    onChange={handleInputChange}
                                    value={inputState.web}
                                />
                                {
                                    showErrors.web && inputsErrorsState && inputsErrorsState.web && (
                                        <Alert severity="warning">
                                            {inputsErrorsState.web.map(item =>
                                                <div key={"web-errors" + item}>{item}.</div>
                                            )}
                                        </Alert>
                                    )}
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6} sm={12}>
                                <Button color="error" onClick={handleCancelBtnClick} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item xs={6} sm={12}>

                                {
                                    btnDisabled ?
                                        <Button disabled fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                            Save
                                        </Button> :
                                        <Button color="success" onClick={handleSavelBtnClick} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                            Save
                                        </Button>
                                }
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Container >
    );
};

export default EditCardPage;