import React, { useState } from "react";
import type { PluginCtx } from "../../../app/pluginRuntime.tsx";
import type { Recipe, Ingredient } from "../recipesProviderPlugin/types.ts";

export const RecipeBookPage: React.FC<{ ctx: PluginCtx }> = ({ ctx }) => {
    const recipes = (ctx.read.entity("recipes") as Recipe[]) ?? [];

    const [title, setTitle] = useState("");
    const [ingredientsCSV, setIngredientsCSV] = useState("");
    const [description, setDescription] = useState("");

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [descDraft, setDescDraft] = useState("");

    const canWrite = ctx.can("recipes.write");
    const canShop = ctx.can("shoppingList.write");

    const parseIngredients = (s: string): Ingredient[] => {
        const out: Ingredient[] = [];
        for (const raw of s.split(",")) {
            const part = raw.trim();
            if (!part) continue;
            const [name, qtyStr, unitRaw] = part.split(":").map(x => (x ?? "").trim());
            if (!name) continue;
            const qty = Number(qtyStr || 1);
            const unit = unitRaw || undefined;
            out.push({ name, qty, unit });
        }
        return out;
    };

    const addRecipe = () => {
        const t = title.trim();
        if (!t || !canWrite) return;
        ctx.write.exec("recipes", "add", {
            title: t,
            ingredients: parseIngredients(ingredientsCSV),
            description: description.trim() || undefined,
        });
        setTitle("");
        setIngredientsCSV("");
        setDescription("");
    };

    const addToShopping = (r: Recipe) => {
        if (!canShop) return;
        for (const ing of r.ingredients) {
            ctx.write.addShopping(ing.name, ing.qty || 1);
        }
    };

    const openRecipe = (r: Recipe) => {
        setSelectedId(r.id);
        setDescDraft(r.description ?? "");
    };

    const saveDescription = () => {
        if (!selectedId || !canWrite) return;
        ctx.write.exec("recipes", "setDescription", {
            id: selectedId,
            description: descDraft,
        });
        setSelectedId(null);
        setDescDraft("");
    };

    const ingredientLabel = (i: Ingredient) => {
        const hidePortion = i.unit && /^(portion(en)?)$/i.test(i.unit);
        const unitPart = i.unit && !hidePortion ? ` ${i.unit}` : "";
        return `${i.qty}${unitPart} ${i.name}`;
    };

    return (
        <div style={{ padding: 16 }}>
            <h3>Rezepte</h3>

            {/* Formular: Neues Rezept */}
            <div style={{ marginBottom: 8 }}>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Rezepttitel"
                />
                <input
                    value={ingredientsCSV}
                    onChange={(e) => setIngredientsCSV(e.target.value)}
                    placeholder="Zutaten (Name:Anzahl[:Einheit], ...)"
                    style={{ width: 380, marginLeft: 8 }}
                />
            </div>
            <div style={{ marginBottom: 8 }}>
        <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Beschreibung/Zubereitung (optional)"
            rows={4}
            style={{ width: "100%", boxSizing: "border-box" }}
        />
            </div>
            <button onClick={addRecipe} disabled={!canWrite}>Rezept hinzufügen</button>
            <ul style={{ marginTop: 12 }}>
                {recipes.map((r) => (
                    <li
                        key={r.id}
                        style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 8 }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <strong>{r.title}</strong>
                            <span>({r.ingredients.length} Zutaten)</span>
                            <button onClick={() => openRecipe(r)}>Anzeigen</button>
                            <button onClick={() => addToShopping(r)} disabled={!canShop}>
                                Zutaten zur Einkaufsliste
                            </button>
                            <button
                                onClick={() => ctx.write.exec("recipes", "remove", { id: r.id })}
                                disabled={!canWrite}
                            >
                                Löschen
                            </button>
                        </div>


                        {selectedId === r.id && (
                            <div style={{ padding: 8, border: "1px solid #ddd", borderRadius: 4 }}>
                                <div style={{ marginBottom: 6 }}>
                                    <strong>Zutaten:</strong>
                                    <ul>
                                        {r.ingredients.map((i, idx) => (
                                            <li key={idx}>{ingredientLabel(i)}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div style={{ marginBottom: 6 }}>
                                    <strong>Beschreibung/Zubereitung:</strong>
                                    <textarea
                                        value={descDraft}
                                        onChange={(e) => setDescDraft(e.target.value)}
                                        rows={6}
                                        style={{ width: "100%", boxSizing: "border-box" }}
                                    />
                                </div>
                                <div style={{ display: "flex", gap: 8 }}>
                                    <button onClick={saveDescription} disabled={!canWrite}>Speichern</button>
                                    <button onClick={() => setSelectedId(null)}>Schließen</button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            {recipes.length === 0 && <div>Keine Rezepte vorhanden.</div>}
        </div>
    );
};
