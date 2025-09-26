import React, { useEffect, useState } from "react";
import type { PluginCtx } from "../../app/pluginRuntime";
import './style.css'

type CatImage = {
  id: string;
  url: string;
  width: number;
  height: number;
};

export const CatProfilePicturePickerPlugin: React.FC<{ ctx: PluginCtx }> = ({ ctx }) => {
  useEffect(() => {
    awaitCatImages();
  }, []); 
  const catImages = (ctx.read.entity("catImages") as string[]) ?? [];

  const [cats, setCats] = useState<string[]>([]);

  return (
    <div className="main_wrapper">
    <div className="cat_grid_wrapper">
   {cats.map((url,index ) => (
      <div key={index} className="wrapper_cat">
       <div className="image_wrapper">
        <img src={url} alt={`Cat ${index}`}width={150}/>
       </div>
       <div className="button_wrapper">
        <button onClick={() => {ctx.write.exec("catImages","add", url );}}>speichern</button>
        <button onClick={() => setCatAsUserPFP(url)}>setze als profilbild</button>
       </div>
      </div>
   ))}
       </div>
       <div className= "button_wrapper" id="new_cat_button_wrapper">
    <button id="new_cat_button" onClick={awaitCatImages}>neue Katzen</button>
    </div>
  </div>
  );
  function setCatAsUserPFP(url:string){
    ctx.write.setProfileImage(url);
    console.log(ctx.read.profileImage());
  }

  async function awaitCatImages() {
    const newCats = await getCatImage();
    setCats(newCats);
  }

  async function getCatImage(): Promise<string[]> {
    const result = await fetch("https://api.thecatapi.com/v1/images/search?limit=10"); 
    if (!result.ok) throw new Error(` ${result.status}`);
    const resultData = (await result.json()) as CatImage[];
    return resultData.map(value => value.url);
  }
};


