import { Box, Grid } from "@mui/material";

const AboutPage = () => {
    return (
        <Box
            alignItems="center"
            justifyContent="center"
            textAlign="center">
            <h1>About Page</h1>
            <h3>Here you can find all the information about the website</h3>
            <hr />
            <Grid container
                spacing={2}
                sx={{ flexGrow: 1 }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={1}>
                        <Grid item><h2>Welcome to Blooming Roots, your vibrant online marketplace dedicated to all things green and growing!</h2></Grid>
                        <Grid item><h2>At Blooming Roots, we've cultivated a thriving community where plant enthusiasts from around the world come together to share their passion for flora. Our platform provides a nurturing space for plant lovers to showcase their carefully nurtured plants and connect with fellow green thumbs.</h2></Grid>
                        <Grid item><h2>Whether you're an avid collector looking to find a new home for your cherished plant companions or a budding gardener seeking to share your horticultural achievements, Blooming Roots offers a seamless and intuitive platform to buy and sell plants.</h2></Grid>
                        <Grid item><h2>Our commitment to fostering a verdant marketplace is rooted in our belief in sustainable plant ownership, fostering connections, and celebrating the beauty of nature. Join us at Blooming Roots and let your plants find their forever homes while you embark on a journey of growth and connection.</h2></Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AboutPage;