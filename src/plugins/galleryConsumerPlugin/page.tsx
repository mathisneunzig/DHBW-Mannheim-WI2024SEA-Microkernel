import React, { useState } from "react";
import type { PluginCtx } from "../../app/pluginRuntime";

type GalleryItem = {
  id: string;
  sketchUrl: string;
  finalUrl: string;
  title: string;
};

export const GalleryConsumerPage: React.FC<{ ctx: PluginCtx }> = ({ ctx }) => {
  const gallery = (ctx.read.entity("gallery") as GalleryItem[]) ?? [];
  const [title, setTitle] = useState("");
  const [sketchUrl, setSketchUrl] = useState("");
  const [finalUrl, setFinalUrl] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = gallery.find(g => g.id === selectedId);

  return (

    // Galerie an sich; Funktionen: Abfragen für Name, Skizze, Finale + Add- & Delete-Button + Finales Gemälde anzeigen
    <div style={{ padding: 20 }}>
      <h3>Kunstgalerie: Klicke, um die Zeichnung fertigzustellen!</h3>
      <div style={{ marginBottom: 12 }}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Wie heißt deine Zeichnung?"
          style={{ 
            marginRight: 12, 
            width: 400
            }}
        />
        <input
          value={sketchUrl}
          onChange={e => setSketchUrl(e.target.value)}
          placeholder="Skizzen-URL"
          style={{ 
            marginRight: 12,
            width: 400 
            }}
        />
        <input
          value={finalUrl}
          onChange={e => setFinalUrl(e.target.value)}
          placeholder="Finales Gemälde-URL"
          style={{ 
            marginRight: 12,
            width: 400
            }}
        />
        <button
          onClick={() => {
            if (title && sketchUrl && finalUrl) {
              ctx.write.exec("gallery", "add", { title, sketchUrl, finalUrl });
              setTitle("");
              setSketchUrl("");
              setFinalUrl("");
            }
          }}
          disabled={!ctx.can("gallery.write")}>
          Hinzufügen
        </button>
      </div>

    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {gallery.map(item => (
            <div key={item.id} style={{ border: "1px solid #c6e3e4ff", padding: 15, borderRadius: 5 }}>
            <h4>{item.title}</h4>
            <img
              src={item.sketchUrl}
              alt={item.title}
              style={{ width: 300, cursor: "pointer" }}
              onClick={() => setSelectedId(item.id)}
            />
                <div>
                    <button
                        onClick={() => ctx.write.exec("gallery", "remove", { id: item.id })}
                        disabled={!ctx.can("gallery.write")}>
                        Bild entfernen
                    </button>
                </div>
            </div>
        ))}
    </div>


      {selected && (
        <div style={{ marginTop: 20 }}>
          <h3>Fertiges Gemälde namens "{selected.title}"</h3>
          <img  src={selected.finalUrl}
                alt={selected.title} 
                style={{ width: 300, cursor: "pointer" }}/>
        </div>
      )}
    </div>
  );
};
