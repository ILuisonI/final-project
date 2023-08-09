import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const NavLinkComponent = ({ label, url, ...rest }) => {
    return (
        <NavLink to={url} {...rest} style={{ textDecoration: "none" }}>
            {({ isActive }) => (
                <Typography sx={{
                    my: 2,
                    color: `${isActive ? "red" : "white"}`,
                    display: "block",
                    p: 1
                }}>
                    {label}
                </Typography>
            )}
        </NavLink>
    );
};

export default NavLinkComponent;