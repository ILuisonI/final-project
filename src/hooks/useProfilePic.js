import { useDispatch, useSelector } from "react-redux";
import { profilePicActions } from "../store/profilePicUpdate";
import axios from "axios";

const useProfilePic = () => {
    const dispatch = useDispatch();
    const payload = useSelector((bigPie) => bigPie.authSlice.payload);
    return async () => {
        try {
            if (payload) {
                const user = await axios.get("/users/userInfo/");
                dispatch(profilePicActions.profilePic(user.data.imageUrl));
            }
        } catch (err) {
            console.log("User Error", err);
        }
    };
};

export default useProfilePic;