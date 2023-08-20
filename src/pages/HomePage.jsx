import { Box, CircularProgress, Grid } from "@mui/material";
import CardComponent from "../components/PlantComponent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";

const HomePage = () => {
  const [originalPlantsArr, setOriginalPlantsArr] = useState(null);
  const [plantsArr, setPlantsArr] = useState(null);
  const navigate = useNavigate();
  let qparams = useQueryParams();
  const isAdmin = useSelector((bigPie) => bigPie.authSlice.isAdmin);
  const isBiz = useSelector((bigPie) => bigPie.authSlice.isBiz);
  useEffect(() => {
    axios
      .get("/plants/")
      .then(({ data }) => {
        setOriginalPlantsArr(data);
        filterFunc(data);
      })
      .catch((err) => {
        console.log("Err From Axios:", err.message);
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

  const handleAddToCartBtnClick = async (id) => {
    try {
      await axios.patch(`/plants/add-to-cart/${id}`)
    } catch (err) {
      console.log("Cart Error:", err.message);
    }
  };

  if (!plantsArr) {
    return <CircularProgress sx={{ position: "fixed", left: "50vw", top: "50vh" }} />;
  }

  return (
    <Box textAlign="center">
      <h1>Plants Page</h1>
      <h3>Here you can find all the
        plants</h3>
      <hr />
      <Grid container
        spacing={2}
        sx={{ flexGrow: 1 }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            {plantsArr.map((item) => (
              <Grid item key={item._id + Date.now()}>
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
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
};

export default HomePage;