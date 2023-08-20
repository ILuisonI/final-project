import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage"
import LoginPage from "../pages/LoginPage";
import ROUTES from "./ROUTES";
import EditCardPage from "../pages/EditPlantPage";
import ProfilePage from "../pages/ProfilePage";
import SuperProtectedRoute from "../components/SuperProtectedRoute";
import LogoutPage from "../pages/LogoutPage";
import FavPlantsPage from "../pages/FavPlantsPage";
import AddPlantPage from "../pages/AddPlantPage";
import AboutPage from "../pages/AboutPage";
import CallingPage from "../pages/CallingPage";
import CRMPage from "../pages/CRMPage";
import UserInfoPage from "../pages/UserInfoPage";
import MyPlantsPage from "../pages/MyPlantsPage";
import PlantInfoPage from "../pages/PlantInfoPage";
import CartPage from "../pages/CartPage";

const Router = () => {
    return (
        <Routes>
            <Route path={ROUTES.FAKEHOME} element={<Navigate to={ROUTES.HOME} />}></Route>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.ABOUT} element={<AboutPage />} />
            <Route path={ROUTES.CALLING} element={<CallingPage />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.PLANTINFO} element={<PlantInfoPage />} />
            <Route path={ROUTES.CART} element={<SuperProtectedRoute
                needPermission={false}
                element={<CartPage />} />} />
            <Route path={ROUTES.USERINFO} element={<SuperProtectedRoute
                needPermission={true}
                isAdmin={true}
                element={<UserInfoPage />} />} />
            <Route path={ROUTES.EDIT} element={<SuperProtectedRoute
                needPermission={true}
                isAdmin={true}
                isBiz={true}
                element={<EditCardPage />} />} />
            <Route path={ROUTES.PROFILE} element={<SuperProtectedRoute
                needPermission={false}
                element={<ProfilePage />} />} />
            <Route path={ROUTES.MYPLANTS} element={<SuperProtectedRoute
                needPermission={true}
                isBiz={true}
                element={<MyPlantsPage />} />} />
            <Route path={ROUTES.FAVPLANTS} element={<SuperProtectedRoute
                needPermission={false}
                element={<FavPlantsPage />} />} />
            <Route path={ROUTES.ADDPLANT} element={<SuperProtectedRoute
                needPermission={true}
                isBiz={true}
                element={<AddPlantPage />} />} />
            <Route path={ROUTES.CRM} element={<SuperProtectedRoute
                needPermission={true}
                isAdmin={true}
                element={<CRMPage />} />} />
            <Route path={ROUTES.LOGOUT} element={<SuperProtectedRoute
                needPermission={false}
                logout={true}
                element={<LogoutPage />} />} />
            <Route path="*" element={<h1>404</h1>} />
        </Routes >
    )
};

export default Router;