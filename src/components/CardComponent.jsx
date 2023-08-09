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

import PropTypes from "prop-types";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CardComponent = ({ card, onDelete, onEdit, isAdmin, isBiz, likeCard }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isMyCard, setIsMyCard] = useState(false);
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);
  const loggedIn = useSelector((bigPie) => bigPie.authSlice.loggedIn);

  const navigate = useNavigate();

  useEffect(() => {
    if (payload) {
      setIsLiked(card && card.likes.includes(payload._id));
      setIsMyCard(card && card.user_id === payload._id);
    }
  }, [card, payload, isMyCard]);

  const handleDeleteBtnClick = () => {
    onDelete(card._id);
    toast.success('Card Deleted!');
  };

  const handleEditBtnClick = () => {
    onEdit(card._id);
  };

  const handleLikeBtnClick = () => {
    likeCard(card._id);
    setIsLiked(!isLiked);
    if (!isLiked) {
      toast.success('Card Added To Favorites!');
    } else {
      toast.error('Card Removed From Favorites!');
    }
  };

  const handleCardClick = () => {
    navigate(`/cardinfo/${card._id}`);
  };

  const handleCallClick = () => {
    navigate(`/call/${card.phone}`);
  };

  return (
    <Fragment>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea onClick={handleCardClick}>
          <CardHeader title={card.title} subheader={card.subTitle} />
          <CardMedia component="img" image={card.image.url} alt={card.image.alt} />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              <b>Phone: </b>{card.phone}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <b>Address: </b>{card.state && card.state + ", "}{card.country}{", " + card.state && card.state}{", " + card.city + ", " + card.street + ", " + card.houseNumber}{", " + card.zipCode && card.zipCode}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <b>Business Number: </b>{card.bizNumber}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions disableSpacing>
          <Typography sx={{
            marginRight: "auto"
          }}>
            {isMyCard ?
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
              <IconButton
                color={isLiked ? "error" : ""}
                aria-label="add to favorites" onClick={handleLikeBtnClick}>
                <FavoriteIcon />
              </IconButton>
            }
          </Typography>
        </CardActions>
      </Card>
    </Fragment>
  );
};

CardComponent.propTypes = {
  card: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
  isBiz: PropTypes.bool,
};

export default CardComponent;
