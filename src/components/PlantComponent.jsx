import {
  Card,
  CardActionArea,
  CardMedia,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

import PropTypes from "prop-types";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";

const PlantComponent = ({ plant, onDelete, onEdit, isAdmin, isBiz, likePlant, addToCart }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [isMyPlant, setIsMyPlant] = useState(false);
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);
  const loggedIn = useSelector((bigPie) => bigPie.authSlice.loggedIn);
  const cart = useCart();

  const navigate = useNavigate();
  useEffect(() => {
    if (payload) {
      setIsLiked(plant && plant.likes.includes(payload._id));
      setIsInCart(plant && plant.cart.includes(payload._id));
      setIsMyPlant(plant && plant.user_id === payload._id);
    }
  }, [plant, payload, isMyPlant]);

  const handleDeleteBtnClick = () => {
    onDelete(plant._id);
    toast.success('Plant Deleted!');
  };

  const handleEditBtnClick = () => {
    onEdit(plant._id);
  };

  const handleLikeBtnClick = () => {
    likePlant(plant._id);
    setIsLiked(!isLiked);
    if (!isLiked) {
      toast.success('Plant Added To Favorites!');
    } else {
      toast.error('Plant Removed From Favorites!');
    }
  };

  const handleCartBtnClick = () => {
    addToCart(plant._id);
    setIsInCart(!isInCart);
    if (!isInCart) {
      toast.success('Plant Added To Cart!');
    } else {
      toast.error('Plant Removed From Cart!');
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await cart();
      } catch (err) {
        console.log("Error", err.message);
      }
    })();
  }, [isInCart, cart]);

  const handleCardClick = () => {
    navigate(`/plantinfo/${plant._id}`);
  };

  const handleCallClick = () => {
    navigate(`/call/${plant.phone}`);
  };

  return (
    <Fragment>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea onClick={handleCardClick}>
          <CardHeader title={plant.title} />
          <CardMedia component="img" image={plant.imageUrl} alt={plant.imageAlt} />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              <b>Phone: </b>{plant.phone}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <b>Price: </b>{plant.price}$
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions disableSpacing>
          <Typography sx={{
            marginRight: "auto"
          }}>
            {isMyPlant ?
              (
                (
                  isBiz &&
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
                  isAdmin &&
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
                isAdmin &&
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
              <Fragment>
                <IconButton
                  color={isLiked ? "error" : ""}
                  aria-label="add to favorites" onClick={handleLikeBtnClick}>
                  <FavoriteIcon />
                </IconButton>
              </Fragment>
            }
            {
              loggedIn &&
              (
                !isInCart ?
                  (
                    <IconButton
                      aria-label="add to cart" onClick={handleCartBtnClick}>
                      <AddShoppingCartIcon />
                    </IconButton>
                  )
                  :
                  (
                    <IconButton
                      aria-label="add to cart" onClick={handleCartBtnClick}>
                      <RemoveShoppingCartIcon />
                    </IconButton>
                  )
              )
            }
          </Typography>
        </CardActions>
      </Card>
    </Fragment>
  );
};

PlantComponent.propTypes = {
  plant: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
  isBiz: PropTypes.bool,
};

export default PlantComponent;