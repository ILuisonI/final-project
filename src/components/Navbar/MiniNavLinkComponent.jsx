import { MenuItem, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const MiniNavLinkComponent = ({ label, url, onClick, isDarkMode }) => {
    return (
        <MenuItem
            sx={{
                justifyContent: "center"
            }}
            key={"miniLinks" + url}>
            <NavLink key={url} to={url} onClick={onClick} style={{ textDecoration: "none" }}>
                {({ isActive }) => (
                    <Typography sx={{
                        color: `${isActive ? "red" : (isDarkMode ? "white" : "black")}`
                    }}>
                        {label}
                    </Typography>
                )}
            </NavLink>
        </MenuItem>
    );
};

export default MiniNavLinkComponent;