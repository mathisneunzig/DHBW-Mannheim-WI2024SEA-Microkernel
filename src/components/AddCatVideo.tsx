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
            <div style={{position: "fixed", left: "30%", right: "30%", width: "40%", border: "2px solid black", borderRadius: "1rem", boxShadow: "-3px 5px 5px grey", backgroundColor: "#f1fafe", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center"}}>
                <button onClick={close} style={{float: "right", position: "absolute", right: 5, top: 5, border: "none", backgroundColor: "#ffffff"}}>X</button>
                {children}
            </div>
        );
    }
};

export default AddCatVideo;