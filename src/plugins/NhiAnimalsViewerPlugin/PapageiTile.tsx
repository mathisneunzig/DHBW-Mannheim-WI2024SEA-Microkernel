import React from "react";
import papageiImg from "./assets/papagei.jpg";


export const PapageiTile:React.FC = () => (
    <div style={{ width: "100%", height: "100%", overflow: "hidden", borderRadius: 8}}>
        <img src={papageiImg} alt="Papagei" style={{width: "100%", height: "100%", objectFit: "cover" }} />
    </div>

)