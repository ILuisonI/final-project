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

import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ROUTES from "../routes/ROUTES";
import { validateCardParamSchema } from "../validation/cardValidation";

const CardInfoPage = () => {
    const { id } = useParams();

    const [card, setCard] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [isMyCard, setIsMyCard] = useState(false);

    const navigate = useNavigate();

    const payload = useSelector((bigPie) => bigPie.authSlice.payload);
    const loggedIn = useSelector((bigPie) => bigPie.authSlice.loggedIn);

    useEffect(() => {
        (async () => {
            try {
                const errors = validateCardParamSchema({ id });
                if (errors) {
                    navigate(ROUTES.HOME);
                    return;
                }
                const { data } = await axios.get("/cards/card/" + id);
                let newCard = { ...data };
                newCard.url = newCard.image.url;
                newCard.alt = newCard.image.alt;
                setCard(newCard);
            } catch (err) {
                console.log("Error From Axios:", err.message);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, isLiked]);

    useEffect(() => {
        if (payload) {
            setIsLiked(card && card.likes.includes(payload._id));
            setIsMyCard(card && card.user_id === payload._id);
        }
    }, [card, payload, isMyCard]);

    const handleDeleteBtnClick = async () => {
        try {
            await axios.delete("cards/" + id);
            toast.success('Card Deleted!');
            navigate(ROUTES.HOME);
        } catch (err) {
            console.log("Delete Error:", err.message);
            toast.error('Oops');
        }
    };

    const handleEditBtnClick = () => {
        navigate(`/edit/${id}`);
    };

    const likeCard = async (id) => {
        try {
            await axios.patch(`/cards/card-like/${id}`)
        } catch (err) {
            console.log("Error", err.message);
        }
    };

    const handleLikeBtnClick = () => {
        likeCard(id);
        setIsLiked(!isLiked);
        if (!isLiked) {
            toast.success('Card Added To Favorites!');
        } else {
            toast.error('Card Removed From Favorites!');
        }
    };

    const handleCallClick = () => {
        navigate(`/call/${card.phone}`);
    };

    if (!card) {
        return <CircularProgress sx={{ position: "fixed", left: "50vw", top: "50vh" }} />;
    }

    return (
        <Box>
            <h1>Card Info Page</h1>
            <h3>Here you can find all the information about the business</h3>
            <hr />
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
            >
                <Fragment>
                    <Grid item xs={3}>
                        <Card sx={{ maxWidth: 345 }}>
                            {/* <CardActionArea> */}
                            <CardHeader title={card.title} subheader={"Created At: " + card.createdAt.split("T").join(" ").split(".")[0]} />
                            <CardMedia component="img" image={card.url} alt={card.alt} />
                            <CardContent>
                                <Typography variant="h6" color="text.primary">
                                    <b>Subtitle: </b>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {card.subTitle}
                                </Typography>
                                <Typography variant="h6" color="text.primary">
                                    <b>Phone: </b>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {card.phone}
                                </Typography>
                                <Typography variant="h6" color="text.primary">
                                    <b>Address: </b>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {card.state && card.state + ", "}{card.country}{", " + card.state && card.state}{", " + card.city + ", " + card.street + ", " + card.houseNumber}{", " + card.zipCode && card.zipCode}
                                </Typography>
                                <Typography variant="h6" color="text.primary">
                                    <b>Description: </b>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {card.description}
                                </Typography>
                                <Typography variant="h6" color="text.primary">
                                    <b>Email: </b>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {card.email}
                                </Typography>
                                {
                                    card.web &&
                                    (
                                        <Fragment>
                                            <Typography variant="h6" color="text.primary">
                                                <b>Website: </b>
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {card.web}
                                            </Typography>
                                        </Fragment>
                                    )
                                }
                                <Typography variant="h6" color="text.primary">
                                    <b>Likes: </b>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {card.likes.length}
                                </Typography>
                            </CardContent>
                            {/* </CardActionArea> */}
                            <CardActions disableSpacing>
                                <Typography sx={{
                                    marginRight: "auto"
                                }}>
                                    {payload && isMyCard ?
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
                                </Typography>
                            </CardActions>
                        </Card>
                    </Grid>
                </Fragment>
            </Grid>
        </Box>
    );
};

export default CardInfoPage;