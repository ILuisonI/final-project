import {
    Card,
    CardMedia,
    CardHeader,
    CardContent,
    Typography,
    CardActions,
    IconButton,
    CircularProgress,
    Box,
    Grid,
    FormControlLabel,
    Checkbox,
} from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';

import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ROUTES from "../routes/ROUTES";
import { validateProfileParamSchema } from "../validation/profileValidation";

const UserInfoPage = () => {
    const { id } = useParams();

    const [user, setUser] = useState({
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
    const [isBiz, setIsBiz] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const errors = validateProfileParamSchema({ id });
                if (errors) {
                    navigate(ROUTES.HOME);
                    return;
                }
                const { data } = await axios.get(`/users/userInfo/${id}`)
                setUser(data);
            } catch (err) {
                console.log("Error From Axios:", err.message);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        setIsBiz(user.isBusiness);
    }, [user]);

    const handleDeleteBtnClick = async () => {
        try {
            await axios.delete("/users/deleteUser/" + id);
            toast.success('User Deleted!');
            navigate(ROUTES.CRM);
        } catch (err) {
            console.log("Delete Error:", err.message);
            toast.error('Oops');
        }
    };

    const handleCheckedChange = (ev) => {
        const checked = ev.target.checked;
        setIsBiz(checked)
        handleBizBtnClick(checked);
        toast.success('User Updated!');
    };


    const handleBizBtnClick = async (isBiz) => {
        try {
            await axios.patch("users/change-biz/" + user._id);
        } catch (err) {
            console.log("Biz Error:", err.message);
        }
    };

    if (!user) {
        return <CircularProgress sx={{ position: "fixed", left: "50vw", top: "50vh" }} />;
    }

    return (
        <Box>
            <h1>User Info Page</h1>
            <h3>Here you can find all the information about the user</h3>
            <hr />
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center">
                <Fragment>
                    <Grid item xs={3}>
                        <Card sx={{ maxWidth: 345 }}>
                            {/* <CardActionArea> */}
                            <CardHeader title={user.firstName + " " + user.middleName + " " + user.lastName} />
                            <CardMedia component="img" image={user.imageUrl} alt={user.imageAlt} />
                            <CardContent>
                                <Typography variant="h6" color="text.primary">
                                    <b>Phone: </b>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {user.phone}
                                </Typography>
                                <Typography variant="h6" color="text.primary">
                                    <b>Email: </b>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {user.email}
                                </Typography>
                                <Typography variant="h6" color="text.primary">
                                    <b>Address: </b>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {user.country}{", " + user.state && user.state}{" ," + user.city + ", " + user.street + ", " + user.houseNumber}{", " + user.zipCode && user.zipCode}
                                </Typography>
                            </CardContent>
                            {/* </CardActionArea> */}
                            {
                                !user.isAdmin ?
                                    <CardActions disableSpacing>
                                        <Typography sx={{
                                            margin: "auto"
                                        }}>
                                            <Fragment>
                                                <IconButton aria-label="delete" color="error" onClick={handleDeleteBtnClick}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Fragment>
                                        </Typography>
                                    </CardActions> :
                                    <CardActions disableSpacing>
                                        <Typography sx={{
                                            margin: "auto"
                                        }} variant="body2" color="text.secondary">
                                            <b>Admin</b>
                                        </Typography>
                                    </CardActions>
                            }
                            <CardActions disableSpacing>
                                <Typography sx={{
                                    margin: "auto"
                                }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={isBiz} id="isBusiness" name="isBusiness" onChange={handleCheckedChange} color="primary" />
                                        }
                                        label="Business Account"
                                    />
                                </Typography>
                            </CardActions>
                        </Card>
                    </Grid>
                </Fragment>
            </Grid>
        </Box>
    );
};

export default UserInfoPage;