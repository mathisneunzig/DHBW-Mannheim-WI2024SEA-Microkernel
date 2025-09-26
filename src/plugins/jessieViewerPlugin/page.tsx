import React, { useState } from "react";
import type { PluginCtx } from "../../app/pluginRuntime";

export const BucketlistViewerPage: React.FC<{ ctx: PluginCtx }> = ({ ctx }) => {
  const list =
    (ctx.read.entity("list") as {
      id: string;
      text: string;
      imageUrl?: string;
      description?: string;
    }[]) ?? [];

  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = () => {
    const trimmedText = text.trim();
    const trimmedImage = imageUrl.trim();
    const trimmedDescription = description.trim();

    if (!trimmedText) return;

    if (editingId) {
      ctx.write.exec("list", "edit", {
        id: editingId,
        text: trimmedText,
        imageUrl: trimmedImage || undefined,
        description: trimmedDescription || undefined,
      });
      setEditingId(null);
    } else {
      ctx.write.exec("list", "add", {
        text: trimmedText,
        imageUrl: trimmedImage || undefined,
        description: trimmedDescription || undefined,
      });
    }

    setText("");
    setImageUrl("");
    setDescription("");
  };

  return (
    <div
      style={{
        marginRight: 150,
        marginLeft: 150,
        padding: 5,
        textAlign: "center",
      }}
    >
      <div style={{ marginBottom: 1, fontSize: 50 }}>
        <h3>Bucket-List</h3>
      </div>

      <div style={{ marginBottom: 12 }}>
        <input
          type="text"
          placeholder="Ziel oder Beschreibung"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: 300, marginRight: 8 }}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <input
          type="url"
          placeholder="Bild-Link (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          style={{ width: 300, marginRight: 8 }}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Beschreibung hinzufügen (optional)"
          style={{ width: 300, marginRight: 8 }}
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={!ctx.can("list.write") || !text.trim()}
      >
        {editingId ? "Speichern" : "Hinzufügen"}
      </button>
      {editingId && (
        <button
          onClick={() => {
            setEditingId(null);
            setText("");
            setImageUrl("");
            setDescription("");
          }}
          style={{ marginLeft: 8 }}
        >
          Abbrechen
        </button>
      )}

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          marginTop: 40,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "50px",
          justifyItems: "center",
        }}
      >
        {list.map((n) => (
          <li
            key={n.id}
            style={{
              marginBottom: 15,
              padding: 16,
              border: "1px solid #ccc",
              borderRadius: 8,
              minHeight: 350,
              maxWidth: 400,
              margin: "auto",
              textAlign: "center",
              width: "100%",
              fontWeight: "bold",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <p style={{ margin: 10, fontWeight: "bold" }}>{n.text}</p>
            {n.imageUrl && (
              <img
                src={n.imageUrl}
                alt="Bucketlist-Bild"
                style={{
                  marginTop: 8,
                  maxWidth: "100%",
                  maxHeight: 200,
                  borderRadius: 4,
                }}
                onError={(e) =>
                  ((e.target as HTMLImageElement).style.display = "none")
                }
              />
            )}
            {n.description && (
              <p
                style={{
                  margin: "20 0 12px 0",
                  color: "#555",
                  fontSize: "0.9em",
                  textAlign: "left",
                }}
              >
                {n.description}
              </p>
            )}
            <div
              style={{
                marginTop: "auto",
                textAlign: "center",
              }}
            >
              <button
                onClick={() => ctx.write.exec("list", "remove", { id: n.id })}
                disabled={!ctx.can("list.write")}
              >
                Löschen
              </button>
              {ctx.can("list.edit") && (
                <button
                  onClick={() => {
                    setEditingId(n.id);
                    setText(n.text);
                    setImageUrl(n.imageUrl ?? "");
                    setDescription(n.description ?? "");
                  }}
                  style={{ marginLeft: 8 }}
                >
                  Bearbeiten
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {list.length === 0 && (
        <div style={{ color: "#6d0505ff", fontSize: 30 }}>
          {" "}
          Füge ein Reiseziel hinzu
        </div>
      )}
    </div>
  );
};
