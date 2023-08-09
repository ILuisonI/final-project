import { Fragment, useState, useMemo } from "react";

const UseMemoPage = () => {
    const [number, setNumber] = useState(0);
    const [txt, setTxt] = useState("");
    const calcNumber = useMemo(() => {
        let count = 0;
        for (let i = 0; i < 20000; i++) {
            count += number;
        }
        return count;
    }, [number]);
    const handleBtnClick = () => {
        setNumber(number + 1);
    };
    const handleTxtChange = (e) => {
        setTxt(e.target.value);
    };
    return (
        <Fragment>
            <h1>{calcNumber}</h1>
            <button onClick={handleBtnClick}>Add</button>
            <input type="text" value={txt} onChange={handleTxtChange} />
        </Fragment>
    );
};
export default UseMemoPage;