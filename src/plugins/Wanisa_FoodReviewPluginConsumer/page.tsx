import React, { useState } from "react";
import type { PluginCtx } from "../../app/pluginRuntime";

export const Food: React.FC<{ ctx: PluginCtx }> = ({ ctx }) => {
  const reviews = (ctx.read.entity("reviews") as { id: string; text: string}[]) ?? [];
  const [text, setText] = useState("");

  return (
    <div style={{ padding: 10}}>
      <h3>FOOD REVIEWS</h3>
      <h4>Füge dir einfach selbsterstellte Food Reviews hinzu, um nie wieder die besten Spots zu vergessen! </h4>
      <h5>Folgendes Format: <br></br> Food Spot Name 🍔 | Bewertung 1-5 💯| Kleine Beschreibung 🖹</h5>
    
      <div style={{ marginBottom: 8}}>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="FANG AN!"/>
        <button 
          onClick={() => {
            const v = text.trim();
            if (v) {
              window.open("https://www.youtube.com/watch?v=DW5so6wyXIY");
              ctx.write.exec("reviews","add",{ text: v});
              setText("");
            }}}
        disabled={!ctx.can("reviews.write")}>
        Fang an
        </button>
      </div>
      <ul>
        {reviews.map(n => (
          <li key={n.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span>{n.text}</span>
            <button onClick={() => ctx.write.exec("reviews","remove",{ id: n.id })} disabled={!ctx.can("reviews.write")}>
              Löschennnn
            </button>
          </li>
        ))}
      </ul>
      <br></br>
      <br></br> 
      <br></br> {/*Kleiner Zeilenabstand zwischen Katze und Review*/}
    <div style ={{ width: 220, marginLeft: 3}}>
      <img src = "https://haustiereleben.net/wp-content/images/welches-fleisch-durfen-katzen-essen-atmq0o28.jpg" alt="KatzeIsstBVBaufWeilBayernBesserIst" style={{ width: "100%", borderRadius: 10 }}/>
    </div>
    </div>
  );
};