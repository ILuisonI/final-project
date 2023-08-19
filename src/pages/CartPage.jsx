import { Box, Button, CircularProgress, Grid } from "@mui/material";
import CardComponent from "../components/PlantComponent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";

const CartPage = () => {
    const [originalPlantsArr, setOriginalPlantsArr] = useState(null);
    const [plantsArr, setPlantsArr] = useState(null);
    const [sum, setSum] = useState(0);

    const navigate = useNavigate();
    let qparams = useQueryParams();
    const isAdmin = useSelector((bigPie) => bigPie.authSlice.isAdmin);
    const isBiz = useSelector((bigPie) => bigPie.authSlice.isBiz);
    useEffect(() => {
        getCartPlants();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sum]);

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
            setPlantsArr(data.filter(plant => plant.title.startsWith(filter)));
            return;
        }
        if (plantsArr) {
            let newOriginalPlantsArr = JSON.parse(JSON.stringify(originalPlantsArr));
            setPlantsArr(newOriginalPlantsArr.filter(plant => plant.title.startsWith(filter)));
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

    const handleEditBtn = (id) => {
        navigate(`/edit/${id}`);
    };

    const handleLikeBtnClick = async (id) => {
        try {
            await axios.patch(`/plants/like-plant/${id}`)
        } catch (err) {
            console.log("Edit Error:", err.message);
        }
    };

    const getCartPlants = async () => {
        await axios
            .get("/plants/my-cart")
            .then(({ data }) => {
                setOriginalPlantsArr(data);
                filterFunc(data);
                totalSum(data);
            })
            .catch((err) => {
                console.log("Err From Axios:", err.message);
                toast.error("Oops!");
            });
    };

    const totalSum = (data) => {
        let counter = 0;
        data.map((item) => counter += item.price);
        setSum(counter);
    }

    const handleAddToCartBtnClick = async (id) => {
        try {
            await axios.patch(`/plants/add-to-cart/${id}`)
            await getCartPlants();
        } catch (err) {
            console.log("Cart Error:", err.message);
        }
    };

    if (!plantsArr) {
        return <CircularProgress sx={{ position: "fixed", left: "50vw", top: "50vh" }} />;
    }

    return (
        <Box margin={"auto"}>
            <h1>My Cart Page</h1>
            <h3>Here you can find all the
                plants in your cart</h3>
            <Grid container
                spacing={2}
                alignItems="center"
                justify="center"
                margin={"auto"}>
                {plantsArr.map((item) => (
                    <Grid item xs={12} sm={6} lg={4} md={6} key={item._id + Date.now()} >
                        <CardComponent
                            plant={item}
                            onDelete={handleDeleteFromPlantsArr}
                            onEdit={handleEditBtn}
                            isAdmin={isAdmin}
                            isBiz={isBiz}
                            likePlant={handleLikeBtnClick}
                            addToCart={handleAddToCartBtnClick}
                        />
                    </Grid>
                ))}
                <Grid item xs={12} key={"sum"}>
                    <h3>Total: {sum}$</h3>
                </Grid>
                <Grid item xs={12} key={"buyNow"}>
                    <Button color="success" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Buy Now
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
};

export default CartPage;