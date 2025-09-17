import React from "react";
import catImg from "./assets/hauskatze.jpg";


export const CatTile:React.FC = () => (
    <div style={{ width: "100%", height: "100%", overflow: "hidden", borderRadius: 100}}>
        <img src={catImg} alt="Cat" style={{width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
);
