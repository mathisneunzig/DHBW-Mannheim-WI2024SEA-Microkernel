import React, { useEffect, useState } from "react";
import type { PluginCtx } from "../../app/pluginRuntime";

type CatImage = {
  id: string;
  url: string;
  width: number;
  height: number;
};


export const CatImageViewerPlugin: React.FC<{ ctx: PluginCtx }> = ({ ctx }) => {
  useEffect(() => {
  }, []); 
  const catImages = (ctx.read.entity("catImages") as string[]) ?? [];

  

  return (
      <div className="main_wrapper">
    <div className="cat_grid_wrapper">
   {catImages.map((url,index ) => (
    <div key={index} className="wrapper_cat">
       <div className="image_wrapper">
    <img src={url} alt={`Cat ${index}`}width={150}/>
    </div>
    <div className="button_wrapper">
       <button onClick={() => {ctx.write.exec("catImages", "remove", url);}}>Katze löschen :(</button>
       <button onClick={() => {setCatAsUserPFP(url)}}>setze als profilbild</button>
    </div>
      </div>
   ))}
  </div>
  </div>
  );

  function setCatAsUserPFP(url:string){
    ctx.write.setProfileImage(url);
    console.log(ctx.read.profileImage);
  }

};


