import React from "react";

interface AddCatVideoProperties {
    show: boolean;
    close: () => void;
    children: React.ReactNode;
}

function AddCatVideo({show, close, children}: AddCatVideoProperties) {
    if (!show) {
        return null
    } else {
        return (
            <div style={{position: "fixed", left: "25%", right: "25%", width: "50%", border: "2px solid black", borderRadius: "1rem", boxShadow: "-3px 5px 5px grey", backgroundColor: "white", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center"}}>
                <button onClick={close}>Close AddCatVideo</button>
                {children}
            </div>
        );
    }
};

export default AddCatVideo;