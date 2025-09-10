import React, { useState } from "react";
import type { PluginCtx } from "../../app/pluginRuntime";
import type { ShoppingItem } from "../Ajun_ShopListProviderPlugin/types";

export const ShoppingViewerPage: React.FC<{ ctx: PluginCtx }> = ({ ctx }) => {
  const items = (ctx.read.entity("shoppingList") as ShoppingItem[]) ?? [];
  const [item, setItem] = useState("");
  const [qty, setQty] = useState(1);
  const totalItems = items.reduce((sum, x) => sum + x.qty, 0);

  return (
    <div style={{ padding: 24, maxWidth: 500, margin: "0 auto", fontFamily: "sans-serif" }}>
      <h2>Artikel eingeben:</h2>

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <input
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="Artikel"
          style={{ flex: 1, padding: 6 }}
        />
        <input
          type="number"
          value={qty}
          min={1}
          onChange={(e) => setQty(Number(e.target.value))}
          style={{ width: 60, padding: 6 }}
        />
        <button onClick={() => { const v = item.trim();
            if (v) {
              ctx.write.exec("shoppingList", "add", { item: v, qty });
              setItem(""); setQty(1);
            }
          }}
          style={{ backgroundColor: "#33aa33", color: "white", cursor: "pointer" }}>
          Hinzufügen
        </button>
      </div>

      <br/>
      <h2>🛒 Einkaufsliste:</h2>

      <div style={{ padding: 8 }}>
        {items.length === 0 && <div style={{ textAlign: "center", color: "grey" }}>Keine Artikel</div>}

        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {items.map((x) => (
            <li key={x.id} style={{ display: "flex", justifyContent: "space-between", padding: "4px" }}>
              <span>{x.item} ({x.qty})</span>
              <button onClick={() => ctx.write.exec("shoppingList", "remove", { id: x.id })}
                style={{ backgroundColor: "red", color: "white", cursor: "pointer" }}>
                Löschen
              </button>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: 20, textAlign: "right", fontWeight: "bold"}}>
          Gesamtanzahl: {totalItems}
        </div>
      </div>
    </div>
  );
};
