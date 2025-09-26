import React, { useState } from "react";
import type { PluginCtx } from "../../app/pluginRuntime";
import dackel from "./img/cat.jpg";

export const christinasPlugin: React.FC<{ ctx: PluginCtx }> = ({ ctx }) => {
  const emotions = (ctx.read.entity("emotionsLinks") as { id: string; emotion: string; url:string}[]) ?? [];
  const [emotion, setEmotion] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  return (
  <div style={{ background:"#FFF7F3", padding:0, margin:0, textAlign:"center" }}>
    {/* schönes Header */}
    <div style={{ margin:"32px auto", background:"#FAD0C4", borderRadius:24, padding:32 }}>
      <h3 style={{ color:"#C599B6", textAlign:"center", marginBottom:24 }}>Willkommen auf der Seite :3</h3>
      {/* Image */}
      <img
      src={dackel}
      alt="Dackel"
      style={{
      width:"100%",
      maxWidth:300,
      height:"auto",
      borderRadius:16,
      margin:"0 auto 24px auto",
      display:"block",
      boxShadow:"0 2px 12px #E6B2BA66"
      }}
      />
      <div style={{ color:"#6D466B", fontWeight:500, marginBottom:12 }}>Welche Emotion beschreibt dich am besten:</div>
      <ul style={{ padding:0, marginBottom:24, alignItems:"center", justifyContent:"center", display:"flex", flexDirection:"column" }}>


    {/*Alle Emotionen aus dem Provider Plugin einmal ausgeben mit Löschen Button hinter jedem*/}
    {emotions.map(e=> (
      <li key={e.id}style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
        <button
          onClick={() =>window.open(e.url, "_blank")}
          disabled={!ctx.can("emotionsLinks.read")}
          style={{ background:"#C599B6", color:"#FFF7F3", borderRadius:8, padding:"6px 16px", fontWeight:500, border:"none" }}>
        {e.emotion}
        </button>
        <button
          onClick={() => { ctx.write.exec("emotionsLinks","remove",{ id:e.id }) }}
          disabled={!ctx.can("emotionsLinks.write")}
          style={{ background:"#E6B2BA", color:"#6D466B", border:"none", borderRadius:8, padding:"6px 12px", fontWeight:500 }}>
          Löschen
        </button>
      </li>
    ))}
  </ul>

  {/* Neue Emotionen hinzufügen */}
  <div style={{ color:"#6D466B", fontWeight:500, marginBottom:8 }}>Füge eine neue Emotion hinzu:</div>
  <div style={{ marginBottom:20 }}>
    <input value={emotion} onChange={e=>setEmotion(e.target.value)} placeholder="Name Neue Emotion" style={{ padding:8, borderRadius:8, border:"1px solid #E6B2BA", width:"25%" }} />
    <br></br>
    <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="Url eines passenden Bildes" style={{ padding:8, borderRadius:8, border:"1px solid #E6B2BA", width:"25%" }} />
    {error && <div style={{ color:"#C599B6", marginTop:8, marginBottom:8 }}>{error}</div>}
    <br></br>
    <button onClick={() => {
        const e = emotion.trim();
        const u = url.trim();
        if (!e || !u) {
          setError("Bitte beide Felder ausfüllen.");
        return;
        }
        else{
          ctx.write.exec("emotionsLinks","add",{ text:e, url:u });
          setEmotion("");
          setUrl("");
          setError("");
        }
    }} disabled={!ctx.can("emotionsLinks.write")}
      style={{ background:"#C599B6", color:"#FFF7F3", borderRadius:8, padding:"8px 24px", fontWeight:500, marginTop:8, border:"none" }}>
      Hinzufügen
    </button>
      </div>
      {/* Fehler falls nicht beide Felder befüllt wurden */}
      {emotions.length === 0 && <div style={{ color:"#E6B2BA", textAlign:"center", marginTop:24 }}>Keine Emotionen vorhanden :0 </div>}
      </div>
    </div>
  );
};