import { memo } from "react";

const RRPH3Partial = ({ isActive }) => {
    return (
        <h3 style={{ backgroundColor: `${isActive ? "red" : "blue"}` }}>Partial that should be changed</ h3>
    );
};

export default memo(RRPH3Partial);