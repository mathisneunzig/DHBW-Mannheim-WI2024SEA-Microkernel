import React, { useState } from "react";
import type { PluginCtx } from "../../../app/pluginRuntime.tsx";
import type { Hobby } from "../HobbyProviderPlugin/types.ts"
import "./page.css"; 

export const HobbiesViewerPage: React.FC<{ ctx: PluginCtx }> = ({ ctx }) => {
  const hobbies = (ctx.read.entity("hobbies") as Hobby[]) ?? [];
  const [benutzername, setBenutzername] = useState("");
  const [name, setName] = useState(""); 

  const handleAdd = () => {
    const u = benutzername.trim(); 
    const n = name.trim(); 
    if (!u || !n) return; 
    ctx.write.exec("hobbies", "add", { benutzername: u, name: n });
    setName(""); 
  }; 

  return (
    <div className="Outer">
    <div className="Body">
    <div className="hobbiesContainer" style={{ padding: 16 }}>
      <h3>Guten Tag {benutzername}</h3>
      <h3>Trage deine Hobbies in die Liste ein</h3>
      
      <div style={{ marginBottom: 8 }}>
        <input value={benutzername} onChange={(e) => setBenutzername(e.target.value)} placeholder="Name" />
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Was ist dein Hobby?" />
        <button onClick={handleAdd} disabled={!ctx.can("hobbies.write")}>Hinzufügen</button>

</div>
        <ul>
            {hobbies.map((h) => (
                <li key={h.id} style={{display: "flex", alignItems: "center", gap: 8}}>
                <span>
                {h.benutzername}: {h.name}
                </span>
                <button onClick={() => ctx.write.exec("hobbies", "remove", { id: h.id })}
                disabled={!ctx.can("hobbies.write")}>Löschen</button></li>            
            ))}
        </ul>

        {hobbies.length === 0 && <div><b>Aktuell keine Hobbys vorhanden.</b></div>}
        </div>
        </div>
        </div>
    ); 
}; 