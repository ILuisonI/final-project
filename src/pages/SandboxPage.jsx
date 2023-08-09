import { Box, Button, Container, CssBaseline, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import ROUTES from "../routes/ROUTES";

const SanboxPage = () => {
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                }}
            >
                <Typography component="h1" variant="h2">
                    Sandbox
                </Typography>
                <Button component={Link} to={ROUTES.RERENDER} variant="contained">
                    ReRender Page
                </Button>
                <Button component={Link} to={ROUTES.USEMEMO} variant="contained">
                    UseMemo Page
                </Button>
            </Box>
            <Outlet />
        </Container>
    );
};

export default SanboxPage;