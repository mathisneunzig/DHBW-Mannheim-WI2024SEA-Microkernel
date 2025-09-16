import React, { useState } from "react";
import type { PluginCtx } from "../../app/pluginRuntime";
import type { WishlistItem } from "../Ajun_WishlistProviderPlugin/types";

export const WishlistViewerPage: React.FC<{ ctx: PluginCtx }> = ({ ctx }) => {
  const items = (ctx.read.entity("wishlist") as WishlistItem[]) ?? [];
  const [item, setItem] = useState("");
  const [qty, setQty] = useState(1);
  const totalItems = items.reduce((sum, x) => sum + x.qty, 0);

  return (
    <div style={{ padding: 24, maxWidth: 500, margin: "0 auto", fontFamily: "sans-serif" }}>
      <h2>Wunsch hinzufügen:</h2>

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <input
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="Wunsch"
          style={{ flex: 1, padding: 6 }}
        />
        <input
          type="number"
          value={qty}
          min={1}
          onChange={(e) => setQty(Number(e.target.value))}
          style={{ width: 60, padding: 6 }}
        />
        <button
          onClick={() => {
            const v = item.trim();
            if (v) {
              ctx.write.exec("wishlist", "add", { item: v, qty });
              setItem(""); setQty(1);
            }
          }}
          style={{ backgroundColor: "#33aa33", color: "white", cursor: "pointer" }}
        >
          Hinzufügen
        </button>
      </div>

      <br/>
      <h2>🌟 Wunschliste:</h2>

      <div style={{ padding: 8 }}>
        {items.length === 0 && (
          <div style={{ textAlign: "center", color: "grey" }}>Keine Wünsche</div>
        )}

        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {items.map((x) => (
            <li
              key={x.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "4px",
              }}
            >
              <span style={{ textDecoration: x.done ? "line-through" : "none" }}>
                {x.item} ({x.qty})
              </span>
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  onClick={() => ctx.write.exec("wishlist", "toggleDone", { id: x.id })}
                  style={{ backgroundColor: "#888", color: "white", cursor: "pointer" }}
                >
                  {x.done ? "Rückgängig" : "Erfüllt"}
                </button>
                <button
                  onClick={() => ctx.write.exec("wishlist", "remove", { id: x.id })}
                  style={{ backgroundColor: "red", color: "white", cursor: "pointer" }}
                >
                  Entfernen
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: 20, textAlign: "right", fontWeight: "bold" }}>
          Gesamtanzahl: {totalItems}
        </div>
      </div>
    </div>
  );
};
