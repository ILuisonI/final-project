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
} from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ROUTES from "../routes/ROUTES";
import { validatePlantParamSchema } from "../validation/plantValidation";
import useCart from "../hooks/useCart";

const PlantInfoPage = () => {
    const { id } = useParams();

    const [plant, setPlant] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [isMyPlant, setIsMyPlant] = useState(false);
    const [isInCart, setIsInCart] = useState(false);
    const cart = useCart();

    const navigate = useNavigate();

    const payload = useSelector((bigPie) => bigPie.authSlice.payload);
    const loggedIn = useSelector((bigPie) => bigPie.authSlice.loggedIn);

    useEffect(() => {
        (async () => {
            try {
                const errors = validatePlantParamSchema({ id });
                if (errors) {
                    navigate(ROUTES.HOME);
                    return;
                }
                const { data } = await axios.get("/plants/" + id);
                let newPlant = { ...data };
                setPlant(newPlant);
            } catch (err) {
                console.log("Error From Axios:", err.message);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, isLiked]);

    useEffect(() => {
        if (payload) {
            setIsLiked(plant && plant.likes.includes(payload._id));
            setIsInCart(plant && plant.cart.includes(payload._id));
            setIsMyPlant(plant && plant.user_id === payload._id);
        }
    }, [plant, payload, isMyPlant]);

    useEffect(() => {
        (async () => {
            try {
                await cart();
            } catch (err) {
                console.log("Error", err.message);
            }
        })();
    }, [isInCart, cart]);

    const handleDeleteBtnClick = async () => {
        try {
            await axios.delete("plants/" + id);
            toast.success('Plant Deleted!');
            navigate(ROUTES.HOME);
        } catch (err) {
            console.log("Delete Error:", err.message);
            toast.error('Oops');
        }
    };

    const handleEditBtnClick = () => {
        navigate(`/edit/${id}`);
    };

    const likePlant = async (id) => {
        try {
            await axios.patch(`/plants/like-plant/${id}`)
        } catch (err) {
            console.log("Edit Error:", err.message);
        }
    };

    const handleLikeBtnClick = () => {
        likePlant(id);
        setIsLiked(!isLiked);
        if (!isLiked) {
            toast.success('plant Added To Favorites!');
        } else {
            toast.error('plant Removed From Favorites!');
        }
    };

    const handleCallClick = () => {
        navigate(`/call/${plant.phone}`);
    };

    const handleAddToCartBtnClick = () => {
        addToCart(id);
        setIsInCart(!isInCart);
        if (!isInCart) {
            toast.success('Plant Added To Cart!');
        } else {
            toast.error('Plant Removed From Cart!');
        }
    };

    const addToCart = async (id) => {
        try {
            await axios.patch(`/plants/add-to-cart/${id}`)
        } catch (err) {
            console.log("Cart Error:", err.message);
        }
    };

    if (!plant) {
        return <CircularProgress sx={{ position: "fixed", left: "50vw", top: "50vh" }} />;
    }

    return (
        <Box textAlign="center">
            <h1>Plant Info Page</h1>
            <h3>Here you can find all the information about the plant</h3>
            <hr />
            <Grid container
                spacing={2}
                sx={{ flexGrow: 1 }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid item>
                            <Card sx={{ maxWidth: 345 }}>
                                {/* <plantActionArea> */}
                                <CardHeader title={plant.title} subheader={"Created At: " + plant.createdAt.split("T").join(" ").split(".")[0]} />
                                <CardMedia component="img" image={plant.imageUrl} alt={plant.imageAlt} />
                                <CardContent>
                                    <Typography variant="h6" color="text.primary">
                                        <b>Description: </b>
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {plant.description}
                                    </Typography>
                                    <Typography variant="h6" color="text.primary">
                                        <b>Phone: </b>
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {plant.phone}
                                    </Typography>
                                    <Typography variant="h6" color="text.primary">
                                        <b>Email: </b>
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {plant.email}
                                    </Typography>
                                    {
                                        plant.web &&
                                        (
                                            <Fragment>
                                                <Typography variant="h6" color="text.primary">
                                                    <b>Website: </b>
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {plant.web}
                                                </Typography>
                                            </Fragment>
                                        )
                                    }
                                    <Typography variant="h6" color="text.primary">
                                        <b>Price: </b>
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {plant.price}$
                                    </Typography>
                                    <Typography variant="h6" color="text.primary">
                                        <b>Likes: </b>
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {plant.likes.length}
                                    </Typography>
                                </CardContent>
                                {/* </plantActionArea> */}
                                <CardActions disableSpacing>
                                    <Typography sx={{
                                        marginRight: "auto"
                                    }}>
                                        {payload && isMyPlant ?
                                            (
                                                (
                                                    payload && payload.biz &&
                                                    <Fragment>
                                                        <IconButton aria-label="delete" color="error" onClick={handleDeleteBtnClick}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                        <IconButton aria-label="edit" color="warning" onClick={handleEditBtnClick}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Fragment>
                                                )
                                                ||
                                                (
                                                    payload && payload.isAdmin &&
                                                    <Fragment>
                                                        <IconButton aria-label="delete" color="error" onClick={handleDeleteBtnClick}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                        <IconButton aria-label="edit" color="warning" onClick={handleEditBtnClick}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Fragment>
                                                )
                                            )
                                            :
                                            (
                                                payload && payload.isAdmin &&
                                                <Fragment>
                                                    <IconButton aria-label="delete" color="error" onClick={handleDeleteBtnClick}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Fragment>
                                            )
                                        }
                                    </Typography>
                                    <Typography sx={{
                                        marginLeft: "auto"
                                    }}>
                                        <IconButton aria-label="call" color="success" onClick={handleCallClick}>
                                            <PhoneIcon />
                                        </IconButton>
                                        {
                                            loggedIn &&
                                            <IconButton
                                                color={isLiked ? "error" : ""}
                                                aria-label="add to favorites" onClick={handleLikeBtnClick}>
                                                <FavoriteIcon />
                                            </IconButton>
                                        }
                                        {
                                            loggedIn &&
                                            (
                                                !isInCart ?
                                                    (
                                                        <IconButton
                                                            aria-label="add to cart" onClick={handleAddToCartBtnClick}>
                                                            <AddShoppingCartIcon />
                                                        </IconButton>
                                                    )
                                                    :
                                                    (
                                                        <IconButton
                                                            aria-label="add to cart" onClick={handleAddToCartBtnClick}>
                                                            <RemoveShoppingCartIcon />
                                                        </IconButton>
                                                    )
                                            )
                                        }
                                    </Typography>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default PlantInfoPage;