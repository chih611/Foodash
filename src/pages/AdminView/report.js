import {
    Tab
} from "react-bootstrap";
import { useEffect } from "react";

const Report = (props) => {
    useEffect(() => {
    }, []);

    return (
        <>
            <Tab.Pane { ...props }>report</Tab.Pane>
        </>
    );
};

export default Report;
