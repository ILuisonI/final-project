import { Box, CircularProgress, Grid } from "@mui/material";
import PlantComponent from "../components/PlantComponent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";

const FavPlantsPage = () => {
    const [originalPlantsArr, setOriginalPlantsArr] = useState(null);
    const [plantsArr, setPlantsArr] = useState(null);
    const navigate = useNavigate();
    let qparams = useQueryParams();
    const isBiz = useSelector((bigPie) => bigPie.authSlice.isBiz);
    const isAdmin = useSelector((bigPie) => bigPie.authSlice.isAdmin);

    useEffect(() => {
        getFavPlants();
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
            setPlantsArr(data.filter(plant => plant.title.startsWith(filter) || plant.bizNumber.startsWith(filter)));
            return;
        }
        if (plantsArr) {
            let newOriginalPlantsArr = JSON.parse(JSON.stringify(originalPlantsArr));
            setPlantsArr(newOriginalPlantsArr.filter(plant => plant.title.startsWith(filter) || plant.bizNumber.startsWith(filter)));
        }
    };

    useEffect(() => {
        filterFunc();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [qparams.filter, originalPlantsArr]);

    const handleDeleteFromplantsArr = async (id) => {
        try {
            await axios.delete("plants/" + id);
            setPlantsArr((newplantsArr) => newplantsArr.filter(item => item._id !== id));
        } catch (err) {
            console.log("Delete Error:", err.message);
            toast.error('Oops');
        }
    };

    const getFavPlants = async () => {
        await axios
            .get("/plants/my-fav-plants")
            .then(({ data }) => {
                setOriginalPlantsArr(data);
                filterFunc(data);
            })
            .catch((err) => {
                console.log("Err From Axios:", err.message);
                toast.error("Oops!");
            });
    };

    const handleLikeBtnClick = async (id) => {
        await axios.patch(`/plants/like-plant/${id}`);
        await getFavPlants();
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
        <Box textAlign="center">
            <h1>My Favorite Plants Page</h1>
            <h3>Here you can find all of your favorite plants</h3>
            <hr />
            <Grid container
                spacing={2}
                sx={{ flexGrow: 1 }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={2}>
                        {plantsArr.map((item) => (
                            <Grid item key={item._id + Date.now()} >
                                <PlantComponent
                                    plant={item}
                                    onDelete={handleDeleteFromplantsArr}
                                    onEdit={handleEditBtn}
                                    isAdmin={isAdmin}
                                    isBiz={isBiz}
                                    likePlant={handleLikeBtnClick}
                                    addToCart={handleAddToCartBtnClick}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
};

export default FavPlantsPage;