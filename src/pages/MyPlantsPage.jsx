import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import PlantComponent from "../components/PlantComponent";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import ROUTES from "../routes/ROUTES";

const MyPlantsPage = () => {
    const [originalPlantsArr, setOriginalPlantsArr] = useState(null);
    const [plantsArr, setPlantsArr] = useState(null);
    const navigate = useNavigate();
    let qparams = useQueryParams();
    const isBiz = useSelector((bigPie) => bigPie.authSlice.isBiz);

    useEffect(() => {
        axios
            .get("/plants/my-plants")
            .then(({ data }) => {
                setOriginalPlantsArr(data);
                filterFunc(data);
            })
            .catch((err) => {
                console.log("Error From Axios:", err.message);
                toast.error("Oops!");
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filterFunc = (data) => {
        if (!plantsArr && !data) {
            return;
        }
        let filter = "";
        if (qparams.filter) {
            filter = qparams.filter;
        }
        if (!plantsArr && data) {
            setOriginalPlantsArr(data);
            setPlantsArr(data.filter(card => card.title.startsWith(filter) || card.bizNumber.startsWith(filter)));
            return;
        }
        if (plantsArr) {
            let newOriginalPlantsArr = JSON.parse(JSON.stringify(originalPlantsArr));
            setPlantsArr(newOriginalPlantsArr.filter(card => card.title.startsWith(filter) || card.bizNumber.startsWith(filter)));
        }
    };

    useEffect(() => {
        filterFunc();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [qparams.filter, originalPlantsArr]);

    const handleDeleteFromPlantsArr = async (id) => {
        try {
            await axios.delete("plants/" + id);
            setPlantsArr((newPlantsArr) => newPlantsArr.filter(item => item._id !== id));
        } catch (err) {
            console.log("Delete Error:", err.message);
            toast.error('Oops');
        }
    };

    const handleLikeBtnClick = async (id) => {
        try {
            await axios.patch(`/plants/like-plant/${id}`)
        } catch (err) {
            console.log("Like Error:", err.message);
        }
    };

    const handleAddToCartBtnClick = async (id) => {
        try {
            await axios.patch(`/plants/add-to-cart/${id}`)
        } catch (err) {
            console.log("Cart Error:", err.message);
        }
    };

    const handleEditBtn = (id) => {
        navigate(`/edit/${id}`);
    };

    if (!plantsArr) {
        return <CircularProgress sx={{ position: "fixed", left: "50vw", top: "50vh" }} />;
    }

    return (
        <Box>
            <h1>My Plants Page</h1>
            <h3>Here you can find all of your plants</h3>
            <hr />
            <Grid container
                spacing={2}
                alignItems="center"
                justify="center"
                margin={"auto"}>
                {plantsArr.map((item) => (
                    <Grid item xs={12} sm={6} lg={4} md={6} key={item._id + Date.now()} >
                        <PlantComponent
                            plant={item}
                            onDelete={handleDeleteFromPlantsArr}
                            onEdit={handleEditBtn}
                            isBiz={isBiz}
                            likePlant={handleLikeBtnClick}
                            addToCart={handleAddToCartBtnClick}
                        />
                    </Grid>
                ))}
            </Grid>
            <Typography sx={{ textDecoration: 'none', position: "fixed", right: "10px", bottom: "60px" }} component={Link} color="textPrimary" to={ROUTES.CREATEPLANT} noWrap>
                <AddCircleIcon color="success" fontSize="large" />
            </Typography>
        </Box>
    )
};

export default MyPlantsPage;