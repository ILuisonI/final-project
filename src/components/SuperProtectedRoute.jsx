import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";

const SuperProtectedRoute = ({ element, isAdmin, isBiz, needPermission, logout }) => {
    const isLoggedIn = useSelector((bigState) => bigState.authSlice.loggedIn);
    const payload = useSelector((bigState) => bigState.authSlice.payload);
    if (isLoggedIn) {
        if (needPermission) {
            if (
                (isAdmin && payload && payload.isAdmin) ||
                (isBiz && payload && payload.isBusiness)
            ) {
                return element;
            }
            toast.error("You Do Not Have Permission!");
            return <Navigate to={ROUTES.HOME} />;
        } else {
            return element;
        }
    }
    if (!logout) {
        toast.error("You Need To Log In First!");
    } else {
        return <Navigate to={ROUTES.HOME} />;
    }
    return <Navigate to={ROUTES.LOGIN} />;
};

export default SuperProtectedRoute;