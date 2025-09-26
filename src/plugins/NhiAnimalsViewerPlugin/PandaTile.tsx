import React from "react";
import pandaImg from "./assets/panda.jpg";


export const PandaTile:React.FC = () => (
    <div style={{ width: "100%", height: "100%", overflow: "hidden", borderRadius: 8}}>
        <img src={pandaImg} alt="Panda" style={{width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
);
