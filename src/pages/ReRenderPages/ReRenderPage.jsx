import { Fragment, useCallback, useState } from "react";
import RRPButtonPartial from "./RRPButtonPartial";
import RRPH3Partial from "./RRPH3Partial";
import RRPButton2Partial from "./RRPButton2Partial";

const ReRenderPage = () => {
    const [isActive, setIsActive] = useState(true);
    const [txt, setTxt] = useState("");
    const handleToggleClick = () => {
        setIsActive(!isActive);
    };

    const handleTxtChange = (e) => {
        setTxt(e.target.value);
    };

    const handleBtn2Click = useCallback(() => {
        setTxt("");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [txt]);

    return (
        <Fragment>
            <h1>Re Render Page</h1>
            <input type="text" value={txt} onChange={handleTxtChange} />
            <button onClick={handleToggleClick}>Toggle Active</button>
            <RRPButtonPartial />
            <RRPButton2Partial onClick={handleBtn2Click}>Clear Text</RRPButton2Partial>
            <RRPH3Partial isActive={isActive} />
        </Fragment>
    )
};

export default ReRenderPage;