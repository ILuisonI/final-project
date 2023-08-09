import { memo } from "react";

const RRPButton2Partial = ({ children, onClick }) => {
    return <button onClick={onClick}>{children}</button>;
};
export default memo(RRPButton2Partial, (prevProps, nextProps) => true);