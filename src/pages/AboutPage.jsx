import { Box, Typography } from "@mui/material";

const AboutPage = () => {
    return (
        <Box>
            <h1>About Page</h1>
            <h3>Here you can find all the information about the website</h3>
            <hr />
            <Typography width={"100%"} border={5} color={"#ccc"} component={"img"} src="/images/NotLoggedInNavBar.png" />
            <Typography width={"100%"} border={5} color={"#ccc"} component={"img"} src="/images/LightNotLoggedInNavBar.png" />
            <h4>This is the navigation bar when you are not logged in.
                <br />Clicking on the "About" button will get you to this page.
                <br />The "About" button will get you to this page.
                <br />Clicking on the moon icon will change the website to dark mode and changes to a sun icon, and clicking the sun icon will change the website to light mode.
                <br />The "Register" button will take you to the register page.
                <br />The "Login" button will take you to the login page.
                <br />You can search any card using the search field.
            </h4>
            <hr />
            <Typography width={"100%"} border={5} color={"#ccc"} component={"img"} src="/images/NavBar.png" />
            <Typography width={"100%"} border={5} color={"#ccc"} component={"img"} src="/images/LightNavBar.png" />
            <h4>This is the navigation bar when you are logged in.
                <br />The "About" button will get you to this page.
                <br />The "Sandbox" button will show up only if you are an admin and will take you to the sandbox page.
                <br />The "My Cards" button will show up only if you are a business account and will take you to your cards page.
                <br />The "Fav Cards" button will show up only if you are logged in and will take you to your favorite cards page.
                <br />The "Logout" button will show up only if you are logged in and will sign you out of the website.
                <br />Clicking on the moon icon will change the website to dark mode and changes to a sun icon, and clicking the sun icon will change the website to light mode.
                <br />Clicking the profile picture icoin will take you to your profile page and there you can edit your information.
                <br />You can search any card using the search field.
            </h4>
            <hr />
            <Typography width={"100%"} border={5} color={"#ccc"} component={"img"} src="/images/HomePage.png" />
            <h4>This is the home page where you can see all the business cards.
                <br />If you click on the card you will be moved to the card info page where you can see all the information on the business.
                <br />If you press on the call button you will be moved to a calling page using the business number.
                <br />A like button will show up if you are logged in.
                <br />An edit button will show up if the card you are viewing is your card.
                <br />A delete button will show up if the card you are viewing is your card, or you are an admin which in this case can delete any card.
            </h4>
            <hr />
            <Typography width={"100%"} border={5} color={"#ccc"} component={"img"} src="/images/MyCards.png" />
            <h4>This is the my cards page where you can see all the business cards that you created.
                <br />Clicking the green "+" button in the bottom right corner will take you to create a new card page.
            </h4>
            <hr />
            <Typography width={"100%"} border={5} color={"#ccc"} component={"img"} src="/images/CreateCard.png" />
            <h4>This is the create a new card page where you can add a new card of your business.</h4>
            <hr />
            <Typography width={"100%"} border={5} color={"#ccc"} component={"img"} src="/images/FavCards.png" />
            <h4>This is the my cards page where you can see all the business cards that you liked.</h4>
            <hr />
            <Typography width={"100%"} border={5} color={"#ccc"} component={"img"} src="/images/Register.png" />
            <h4>This is the register page where you can create a new account.</h4>
            <hr />
            <Typography width={"100%"} border={5} color={"#ccc"} component={"img"} src="/images/Login.png" />
            <h4>This is the login page where you can log in to the website.</h4>
            <hr />
            <Typography width={"100%"} border={5} color={"#ccc"} component={"img"} src="/images/LoginAttempt.png" />
            <Typography width={"100%"} border={5} color={"#ccc"} component={"img"} src="/images/LoginLocked.png" />
            <Typography width={"100%"} border={5} color={"#ccc"} component={"img"} src="/images/Locked.png" />
            <h4>You get a notification of how many attempts left to login.
                <br />If you fail 3 attempts to log in your IP will get locked for 24 hours.
            </h4>
            <hr />
            <Typography width={"100%"} border={5} color={"#ccc"} component={"img"} src="/images/Profile.png" />
            <h4>This is the profile page where you can update your information.</h4>
            <hr />
            <Typography width={"100%"} border={5} color={"#ccc"} component={"img"} src="/images/CardInfo.png" />
            <h4>This is the card info page where you can see all the business information.
                <br />An admin can change the business number of the current card.
                <br />The Change Business Number button won't show up if you are not an admin.
            </h4>
            <hr />
            <Typography width={"100%"} border={5} color={"#ccc"} component={"img"} src="/images/Sandbox.png" />
            <Typography width={"100%"} border={5} color={"#ccc"} component={"img"} src="/images/ReRender.png" />
            <Typography width={"100%"} border={5} color={"#ccc"} component={"img"} src="/images/UseMemo.png" />
            <h4>This is the sandbox page where you can choose ReRender nested route or UseMemo nested route.
                <br />In the ReRender page you have a Toggle Active which changes the "Partial that should be changed" from red to blue and from blue to red.
                <br />The Clear Text button clears the text in the input field.
                <br />The "this button should not be changed" will stay the same.
                <br />In the UseMemo page, clicking the Add button will add 20000 to the counter, and every click will reach 20000 faster than before.
                <br />You can type anything in the text box and it won't rerender if you click Add.
            </h4>
            <hr />
            <Typography width={"100%"} border={5} color={"#ccc"} component={"img"} src="/images/Users.png" />
            <h4>This is the CRM page where you can see all the users and it can only be accessed by admins.
                <br />You can delete non-admin users.
                <br />Admin users cannot be deleted and you will see "Admin" instead of a delete button
                <br />You can change any user's business status by clicking the "Business Account" check button.
                <br />By clicking on a user card you will go to the user information page.
            </h4>
            <hr />
            <Typography width={"100%"} border={5} color={"#ccc"} component={"img"} src="/images/UserInfo.png" />
            <h4>This is the user info page where you can see all the information about the user, and it can only be accessed by admins.
                <br />You can delete non-admin users.
                <br />Admin users cannot be deleted and you will see "Admin" instead of a delete button
                <br />You can change any user's business status by clicking the "Business Account" check button.
            </h4>
            <hr />
        </Box>
    );
};

export default AboutPage;