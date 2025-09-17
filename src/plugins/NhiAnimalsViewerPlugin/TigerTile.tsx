import React from "react";
import tigerImg from "./assets/sibirischer-tiger.jpg";


export const TigerTile:React.FC = () => (
    <div style={{ width: "100%", height: "100%", overflow: "hidden", borderRadius: 8}}>
        <img src={tigerImg} alt="Tiger" style={{width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
);
