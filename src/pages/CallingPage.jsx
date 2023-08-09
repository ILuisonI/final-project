import { Box, Grid } from "@mui/material";
import { useParams } from "react-router-dom";

const CallingPage = () => {
    const { phone } = useParams();

    return (
        <Box sx={{ position: "fixed", left: "47vw", top: "47vh" }}>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
            >
                <h1>Calling:</h1>
                <h3>{phone}</h3>
            </Grid>
        </Box>
    );
};

export default CallingPage;