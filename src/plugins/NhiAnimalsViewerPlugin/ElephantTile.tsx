import React from "react";
import elephantImg from "./assets/elefant.jpg";


export const ElephantTile:React.FC = () => (
    <div style={{ width: "100%", height: "100%", overflow: "hidden", borderRadius: 8}}>
        <img src={elephantImg} alt="Elephant" style={{width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
);
