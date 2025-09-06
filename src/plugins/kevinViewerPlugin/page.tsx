import React, { useState, useRef } from "react";
import "./page.css"
import type { PluginCtx } from "../../app/pluginRuntime";
import Cat1 from "./images/cat1.png"
import Cat2 from "./images/cat2.png"
import Cat3 from "./images/cat3.png"
import Cat4 from "./images/cat4.png"
import Cat5 from "./images/cat5.png"
import Cat6 from "./images/cat6.png"
import Cat7 from "./images/cat7.png"
import Cat8 from "./images/cat7.png"
import Cat9 from "./images/cat7.png"
import Cat10 from "./images/cat7.png"

export const GambleViewerPage: React.FC<{ ctx: PluginCtx }> = ({ ctx }) => {
  const money = ctx.read.entity("money") as number
  let gambling: boolean = false;
  let gamblor1 = useRef<HTMLImageElement>(null);
  let gamblor2 = useRef<HTMLImageElement>(null);
  let gamblor3 = useRef<HTMLImageElement>(null);
  let images = [Cat1, Cat2, Cat3, Cat4, Cat5, Cat6, Cat7, Cat8, Cat9, Cat10];

  function gamble(){
    gambling = true;
    ctx.write.exec("money","subtract", 10);
    gamblor1.current ? gamblor1.current.src = images[Math.floor(Math.random() * 10)] : "";
    gamblor2.current ? gamblor2.current.src = images[Math.floor(Math.random() * 10)] : "";
    gamblor3.current ? gamblor3.current.src = images[Math.floor(Math.random() * 10)] : "";
    let image1 = gamblor1.current ? gamblor1.current.src : "";
    let image2 = gamblor2.current ? gamblor2.current.src : "";
    let image3 = gamblor3.current ? gamblor3.current.src : "";
    if(image1 == image2 && image2 == image3) {
      ctx.write.exec("money","add", 30);
    }else if(image1 == image2 || image2 == image3 || image1 == image3) {
      ctx.write.exec("money","add", 5)
    }
    gambling = false;
  }

  return (
    <>
    <div className = "flex">
      <h1>GAMBLE TIME!!!</h1>
      <div className = "gamba">
        <div className="gamblor">
          <img ref={gamblor1} style={{width: "100%", height: "100%"}}>

          </img>
        </div>
        <div className="gamblor">
          <img ref={gamblor2} style={{width: "100%", height: "100%"}}>
          
          </img>
        </div>
        <div className="gamblor">
          <img ref={gamblor3} style={{width: "100%", height: "100%"}}>
          
          </img>
        </div>
      </div>
      <div className="stats">
        <div><h2>Current dabloons: {money}</h2></div>
      </div>
      <div className="gambler">
        {money > 0 ? <button className="overengineeredButton"
        onClick={() => gambling ? "" : gamble()}>GAMBLE NOWWW🤑🤑</button> : <h1>uh oh, you lost :/</h1>}
      </div>
    </div>
    </>
  );
};
