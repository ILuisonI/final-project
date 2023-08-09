import { Box, CircularProgress, Grid } from "@mui/material";
import CardComponent from "../components/CardComponent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";

const FavCardsPage = () => {
    const [originalCardsArr, setOriginalCardsArr] = useState(null);
    const [cardsArr, setCardsArr] = useState(null);
    const navigate = useNavigate();
    let qparams = useQueryParams();
    const isBiz = useSelector((bigPie) => bigPie.authSlice.isBiz);
    const isAdmin = useSelector((bigPie) => bigPie.authSlice.isAdmin);

    useEffect(() => {
        axios
            .get("/cards/get-my-fav-cards")
            .then(({ data }) => {
                setOriginalCardsArr(data);
                filterFunc(data);
            })
            .catch((err) => {
                console.log("Err From Axios:", err.message);
                toast.error("Oops!");
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filterFunc = (data) => {
        if (!cardsArr && !data) {
            return;
        }
        let filter = "";
        if (qparams.filter) {
            filter = qparams.filter;
        }
        if (!cardsArr && data) {
            setOriginalCardsArr(data);
            setCardsArr(data.filter(card => card.title.startsWith(filter) || card.bizNumber.startsWith(filter)));
            return;
        }
        if (cardsArr) {
            let newOriginalCardsArr = JSON.parse(JSON.stringify(originalCardsArr));
            setCardsArr(newOriginalCardsArr.filter(card => card.title.startsWith(filter) || card.bizNumber.startsWith(filter)));
        }
    };

    useEffect(() => {
        filterFunc();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [qparams.filter, originalCardsArr]);

    const handleDeleteFromCardsArr = async (id) => {
        try {
            await axios.delete("cards/" + id);
            setCardsArr((newCardsArr) => newCardsArr.filter(item => item._id !== id));
        } catch (err) {
            console.log("Delete Error:", err.message);
            toast.error('Oops');
        }
    };

    const handleLikeBtnClick = async (id) => {
        try {
            await axios.patch(`/cards/card-like/${id}`)
            await axios
                .get("/cards/get-my-fav-cards")
                .then(({ data }) => {
                    setOriginalCardsArr(data);
                    filterFunc(data);
                });
        } catch (err) {
            console.log("Like Error:", err.message);
        }
    };

    const handleEditBtn = (id) => {
        navigate(`/edit/${id}`);
    };

    if (!cardsArr) {
        return <CircularProgress sx={{ position: "fixed", left: "50vw", top: "50vh" }} />;
    }

    return (
        <Box>
            <h1>My Favorite Cards Page</h1>
            <h3>Here you can find all of your business cards</h3>
            <hr />
            <Grid container
                spacing={2}
                alignItems="center"
                justify="center"
                margin={"auto"}>
                {cardsArr.map((item) => (
                    <Grid item xs={12} sm={6} lg={4} md={6} key={item._id + Date.now()} >
                        <CardComponent
                            card={item}
                            onDelete={handleDeleteFromCardsArr}
                            onEdit={handleEditBtn}
                            isAdmin={isAdmin}
                            isBiz={isBiz}
                            likeCard={handleLikeBtnClick}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
};

export default FavCardsPage;