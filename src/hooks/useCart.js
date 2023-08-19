import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cartUpdate";
import axios from "axios";

const useCart = () => {
    const dispatch = useDispatch();
    const payload = useSelector((bigPie) => bigPie.authSlice.payload);
    return async () => {
        try {
            if (payload) {
                const cart = await axios.get("/plants/my-cart/");
                if (cart.data.length > 0) {
                    dispatch(cartActions.cartItems(cart.data.length));
                    return;
                }
            }
            dispatch(cartActions.cartItems(0));
        } catch (err) {
            console.log("User Error", err);
        }
    };
};

export default useCart;