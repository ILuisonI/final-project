import { memo } from "react";

const RRPButtonPartial = () => {
    console.log("button initialize");
    return <button>this button should not be change</button>;
};
export default memo(RRPButtonPartial, (a, b) => true);