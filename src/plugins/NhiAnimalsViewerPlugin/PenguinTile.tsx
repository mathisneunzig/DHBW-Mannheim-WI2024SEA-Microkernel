import React from "react";
import pinguinImg from "./assets/pinguin.jpg";


export const PinquinTile:React.FC = () => (
    <div style={{ width: "100%", height: "100%", overflow: "hidden", borderRadius: 8}}>
        <img src={pinguinImg} alt="Penguin" style={{width: "100%", height: "100%", objectFit: "cover" }} />
    </div>

)