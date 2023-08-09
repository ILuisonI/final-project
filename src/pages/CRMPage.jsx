import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import { Box, CircularProgress, Grid } from "@mui/material";
import UserCardComponent from "../components/UserCardComponent";

const CRMPage = () => {
    const [originalUsersArr, setOriginalUsersArr] = useState(null);
    const [usersArr, setUsersArr] = useState(null);
    let qparams = useQueryParams();

    useEffect(() => {
        axios
            .get("/users/getAllUsers")
            .then(({ data }) => {
                setOriginalUsersArr(data.users);
                filterFunc(data.users);
            })
            .catch((err) => {
                console.log("Error From Axios:", err.message);
                toast.error("Oops!");
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filterFunc = (data) => {
        if (!usersArr && !data) {
            return;
        }
        let filter = "";
        if (qparams.filter) {
            filter = qparams.filter;
        }
        if (!usersArr && data) {
            setOriginalUsersArr(data);
            setUsersArr(data.filter(user => user.firstName.startsWith(filter)));
            return;
        }
        if (usersArr) {
            let newOriginalUsersArr = JSON.parse(JSON.stringify(originalUsersArr));
            setUsersArr(newOriginalUsersArr.filter(user => user.firstName.startsWith(filter)));
        }
    };

    useEffect(() => {
        filterFunc();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [qparams.filter, originalUsersArr]);

    const handleDeleteFromUsersArr = async (id) => {
        try {
            await axios.delete("/users/deleteUser/" + id);
            setUsersArr((newUsersArr) => newUsersArr.filter(item => item._id !== id));
        } catch (err) {
            console.log("Delete Error:", err.message);
            toast.error('Oops');
        }
    };

    const handleBizBtnClick = async (user, isBiz) => {
        try {
            await axios.put("users/userInfo/" + user._id, {
                firstName: user.firstName,
                middleName: user.middleName,
                lastName: user.lastName,
                phone: user.phone,
                email: user.email,
                imageUrl: user.imageUrl,
                imageAlt: user.imageAlt,
                state: user.state,
                country: user.country,
                city: user.city,
                street: user.street,
                houseNumber: user.houseNumber,
                zipCode: user.zipCode,
                biz: isBiz,
            });
        } catch (err) {
            console.log("Edit Error:", err.message);
        }
    };

    if (!usersArr) {
        return <CircularProgress sx={{ position: "fixed", left: "50vw", top: "50vh" }} />;
    }

    return (
        <Box>
            <h1>CRM Page</h1>
            <h3>Here you can find all the users.</h3>
            <hr />
            <Grid container
                spacing={2}
                alignItems="center"
                justify="center"
                margin={"auto"}>
                {usersArr.map((item) => (
                    <Grid item xs={12} sm={6} lg={4} md={6} key={item._id + Date.now()} >
                        <UserCardComponent
                            user={item}
                            onDelete={handleDeleteFromUsersArr}
                            biz={handleBizBtnClick}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default CRMPage;