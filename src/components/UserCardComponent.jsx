import {
    Card,
    CardActionArea,
    CardMedia,
    CardHeader,
    Typography,
    CardActions,
    IconButton,
    FormControlLabel,
    Checkbox,
} from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';

import PropTypes from "prop-types";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserCardComponent = ({ user, onDelete, biz }) => {
    const [isBiz, setIsBiz] = useState(user.biz);

    const navigate = useNavigate();

    const handleDeleteBtnClick = () => {
        onDelete(user._id);
        toast.success('User Deleted!');
    };

    useEffect(() => {
        setIsBiz(isBiz);
    }, [isBiz]);

    const handleUserClick = () => {
        navigate(`/userinfo/${user._id}`);
    };

    const handleCheckedChange = (ev) => {
        const checked = ev.target.checked;
        setIsBiz(checked)
        biz(user, checked);
        toast.success('User Updated!');
    };

    return (
        <Fragment>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea onClick={handleUserClick}>
                    <CardHeader title={user.firstName + " " + user.middleName + " " + user.lastName} />
                    <CardMedia component="img" image={user.imageUrl} alt={user.imageAlt} />
                </CardActionArea>

                {
                    !user.isAdmin ?
                        <CardActions disableSpacing>
                            <Typography sx={{
                                margin: "auto"
                            }}>
                                <Fragment>
                                    <IconButton aria-label="delete" color="error" onClick={handleDeleteBtnClick}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Fragment>
                            </Typography>
                        </CardActions> :
                        <CardActions disableSpacing>
                            <Typography sx={{
                                margin: "auto"
                            }} variant="body2" color="text.secondary">
                                <b>Admin</b>
                            </Typography>
                        </CardActions>
                }
                <CardActions disableSpacing>
                    <Typography sx={{
                        margin: "auto"
                    }}>
                        <FormControlLabel
                            control={
                                <Checkbox checked={isBiz} id="biz" name="biz" onChange={handleCheckedChange} color="primary" />
                            }
                            label="Business Account"
                        />
                    </Typography>
                </CardActions>
            </Card>
        </Fragment>
    );
};

UserCardComponent.propTypes = {
    user: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool,
    isBiz: PropTypes.bool,
};

export default UserCardComponent;
