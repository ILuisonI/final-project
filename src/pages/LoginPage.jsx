import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import validateLoginSchema from "../validation/loginValidation";
import { Alert } from "@mui/material/";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import axios from "axios";
import { toast } from 'react-toastify';
import useLoggedIn from "../hooks/useLoggedIn";

import RestartAltIcon from '@mui/icons-material/RestartAlt';

const LoginPage = () => {
    const [inputState, setInputState] = useState({
        email: "",
        password: "",
    });

    const [resetInputState] = useState({
        email: "",
        password: "",
    });

    const [showErrors, setShowErrors] = useState({
        email: false,
        password: false,
    });

    const [inputsErrorsState, setInputsErrorsState] = useState({});

    const navigate = useNavigate();

    const loggedIn = useLoggedIn();

    const [ip, setIP] = useState("");
    const [attemps, setAttempts] = useState(0);

    //creating function to load ip address from the API
    const getData = async () => {
        const res = await axios.get('https://api.ipify.org?format=json');
        setIP(res.data.ip)
    };

    useEffect(() => {
        loggedIn();
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkIf24Hours = (date) => {
        return (getRemainingTime(date) <= 0) ? true : false;
    };

    const getRemainingTime = (date) => {
        const timeMilliseconds = date.getTime();
        const actualTimeMilliseconds = new Date().getTime();
        return 24 - (((actualTimeMilliseconds - timeMilliseconds) / (3600000)).toFixed(1));
    };

    const handleBtnClick = async (ev) => {
        ev.preventDefault();
        let lock = JSON.parse(localStorage.getItem("userLock"));
        if (lock && lock.userIP === ip) {
            lock.date = new Date(lock.date);
            if (checkIf24Hours(lock.date)) {
                localStorage.removeItem("userLock");
                setAttempts(0);
            } else {
                toast.error(`Your IP Is Locked For ${getRemainingTime(lock.date)} Hours!`);
                return;
            }
        }
        try {
            const joiResponse = validateLoginSchema(inputState);
            setInputsErrorsState(joiResponse);
            if (joiResponse) {
                return;
            }
            const { data } = await axios.post("/users/login", inputState);
            localStorage.setItem("token", data.token);
            loggedIn();
            toast.success('Login Successful');
            navigate(ROUTES.HOME);
        } catch (err) {
            setAttempts(attemps + 1);
            toast.error('Username And/Or Password Are Incorrect!');
            if (2 - attemps === 0) {
                toast.error('Your IP has been Locked For 24 Hours!');
            } else {
                toast.error(`Remaining Attempts: ${2 - attemps}`);
            }
            console.log("Login Error", err.message);
        }
    };

    useEffect(() => {
        if (attemps === 3) {
            localStorage.setItem("userLock", JSON.stringify({
                "userIP": ip,
                "date": Date.now(),
            }));
        }
    }, [attemps, ip]);

    useEffect(() => {
        const joiResponse = validateLoginSchema(inputState);
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

    const cancelBtnClick = () => {
        navigate(ROUTES.HOME);
    };

    const resetAll = () => {
        setShowErrors({ ...false });
        setInputState(resetInputState);
        setInputsErrorsState(null);
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
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box component="div" noValidate sx={{ mt: 3 }}>
                    <form onSubmit={handleBtnClick}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
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
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
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
                        <Button type="submit" onClick={handleBtnClick} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign In
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link style={{ textDecoration: `none`, color: "inherit" }} to={ROUTES.REGISTER}>
                                    <Typography variant="body2">
                                        Don't have an account? Sign Up
                                    </Typography>
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Box>
        </Container>
    );
};
export default LoginPage;