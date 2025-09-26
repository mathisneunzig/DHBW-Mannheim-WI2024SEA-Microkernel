import React, { useState } from "react";
import type { PluginCtx } from "../../app/pluginRuntime";

export const NotesViewerPage: React.FC<{ ctx: PluginCtx }> = ({ ctx }) => {
  const notes = (ctx.read.entity("notes") as { id: string; text: string }[]) ?? [];
  const [text, setText] = useState("");

  return (
    <div style={{ padding: 16 }}>
      <h3>Notes</h3>
      <div style={{ marginBottom: 8 }}>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Neue Notiz" />
        <button onClick={() => { const v = text.trim(); if (v) { ctx.write.exec("notes","add",{ text: v });} }} disabled={!ctx.can("notes.write")}>
          Hinzufügen
        </button>
      </div>
      <ul>
        {notes.map(n => (
          <li key={n.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span>{n.text}</span>
            <button onClick={() => ctx.write.exec("notes","remove",{ id: n.id })} disabled={!ctx.can("notes.write")}>
              Löschen
            </button>
          </li>
        ))}
      </ul>
      {notes.length === 0 && <div>Keine Notizen vorhanden.</div>}
    </div>
  );
};
