import React, { useMemo, useState, useEffect } from "react";
import type { PluginCtx } from "../../app/pluginRuntime";
import type { Recipe, Ingredient } from "../recipesProviderPlugin/types";


export const RecipeBookPage: React.FC<{ ctx: PluginCtx }> = ({ ctx }) => {
    const recipes = (ctx.read.entity("recipes") as Recipe[]) ?? [];
    const [title, setTitle] = useState("");
    const [ingredientsCSV, setIngredientsCSV] = useState(
        "Tomaten:3:Stk, Nudeln:1:Packung, Salz:1:Prise"
    );
    const [description, setDescription] = useState("");

    //Details
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const selectedRecipe = useMemo(
        () => recipes.find((r) => r.id === selectedId) ?? null,
        [recipes, selectedId]
    );

    const canWriteRecipes = ctx.can("recipes.write");
    const canPushToShopping = ctx.can("shoppingList.write");

    const parseIngredients = (s: string): Ingredient[] =>
        s
            .split(",")
            .map((x) => x.trim())
            .filter(Boolean)
            .map((pair) => {
                // Format: Name:Anzahl[:Einheit]
                const [nameRaw, qtyRaw, unitRaw] = pair.split(":").map((p) => p?.trim() ?? "");
                const name = nameRaw ?? "";
                const qty = Number(qtyRaw || 1);
                const unit = unitRaw || undefined;
                return { name, qty, unit };
            })
            .filter((i) => i.name);

    const addRecipe = () => {
        const t = title.trim();
        if (!t || !canWriteRecipes) return;
        ctx.write.exec("recipes", "add", {
            title: t,
            servings: 2,
            ingredients: parseIngredients(ingredientsCSV),
            description: description.trim() || undefined,
        });
        setTitle("");
        setDescription("");
    };

    const addToShopping = (r: Recipe) => {
        if (!canPushToShopping) return;
        for (const ing of r.ingredients) {
            ctx.write.addShopping(ing.name, ing.qty || 1);
        }
    };

    const removeRecipe = (id: string) => {
        if (!canWriteRecipes) return;
        ctx.write.exec("recipes", "remove", { id });
        if (selectedId === id) setSelectedId(null);
    };

    const formatIngredient = (i: Ingredient) =>
        `${i.qty}${i.unit ? ` ${i.unit}` : ""} ${i.name}`;

    // --- Beschreibung bearbeiten (Detailansicht) ---
    const [isEditingDesc, setIsEditingDesc] = useState(false);
    const [descDraft, setDescDraft] = useState("");
    useEffect(() => {
        setIsEditingDesc(false);
        setDescDraft(selectedRecipe?.description ?? "");
    }, [selectedRecipe?.id]);

    const saveDescription = () => {
        if (!selectedRecipe || !canWriteRecipes) return;
        ctx.write.exec("recipes", "setDescription", {
            id: selectedRecipe.id,
            description: descDraft,
        });
        setIsEditingDesc(false);
    };

    // --- Detailansicht ---
    if (selectedRecipe) {
        return (
            <div style={{ padding: 16, maxWidth: 800 }}>
                <button onClick={() => setSelectedId(null)} style={{ marginBottom: 12 }}>
                    ← Zurück zur Liste
                </button>

                <h2 style={{ margin: "8px 0 4px" }}>{selectedRecipe.title}</h2>
                <div style={{ color: "#555", marginBottom: 12 }}>
                    Portionen: <strong>{selectedRecipe.servings}</strong>
                </div>

                <h4>Zutaten</h4>
                {selectedRecipe.ingredients.length > 0 ? (
                    <ul>
                        {selectedRecipe.ingredients.map((i, idx) => (
                            <li key={`${selectedRecipe.id}-ing-${idx}`}>{formatIngredient(i)}</li>
                        ))}
                    </ul>
                ) : (
                    <div>Keine Zutaten hinterlegt.</div>
                )}

                <h4 style={{ marginTop: 16 }}>Beschreibung / Zubereitung</h4>
                {!isEditingDesc ? (
                    <div
                        style={{
                            whiteSpace: "pre-wrap",
                            background: "#f7f7f7",
                            padding: 12,
                            borderRadius: 6,
                            minHeight: 48,
                        }}
                    >
                        {selectedRecipe.description?.trim() || "Keine Beschreibung vorhanden."}
                    </div>
                ) : (
                    <textarea
                        value={descDraft}
                        onChange={(e) => setDescDraft(e.target.value)}
                        rows={8}
                        style={{ width: "100%", boxSizing: "border-box" }}
                        placeholder="Zubereitung hier eingeben (mehrzeilig, mit Zeilenumbrüchen)…"
                    />
                )}

                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                    {!isEditingDesc ? (
                        <button
                            onClick={() => setIsEditingDesc(true)}
                            disabled={!canWriteRecipes}
                            title={!canWriteRecipes ? "Benötigt recipes.write" : undefined}
                        >
                            Beschreibung bearbeiten
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={saveDescription}
                                disabled={!canWriteRecipes}
                                title={!canWriteRecipes ? "Benötigt recipes.write" : undefined}
                            >
                                Speichern
                            </button>
                            <button onClick={() => setIsEditingDesc(false)}>Abbrechen</button>
                        </>
                    )}
                    <button
                        onClick={() => addToShopping(selectedRecipe)}
                        disabled={!canPushToShopping}
                        title={!canPushToShopping ? "Benötigt shoppingList.write" : undefined}
                    >
                        Zutaten zur Einkaufsliste
                    </button>
                    <button
                        onClick={() => removeRecipe(selectedRecipe.id)}
                        disabled={!canWriteRecipes}
                        title={!canWriteRecipes ? "Benötigt recipes.write" : undefined}
                    >
                        Löschen
                    </button>
                </div>
            </div>
        );
    }

    // --- Listenansicht ---
    return (
        <div style={{ padding: 16 }}>
            <h3>Rezepte</h3>

            <div style={{ display: "grid", gap: 8, marginBottom: 12, maxWidth: 800 }}>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <input
                        placeholder="Rezepttitel"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        placeholder="Zutaten (Name:Anzahl[:Einheit], ...)"
                        value={ingredientsCSV}
                        onChange={(e) => setIngredientsCSV(e.target.value)}
                        style={{ minWidth: 360 }}
                    />
                </div>
                <textarea
                    placeholder="Beschreibung/Zubereitung (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    style={{ width: "100%", boxSizing: "border-box" }}
                />
                <div>
                    <button onClick={addRecipe} disabled={!canWriteRecipes}>
                        Rezept hinzufügen
                    </button>
                </div>
            </div>

            <ul style={{ paddingLeft: 16 }}>
                {recipes.map((r) => (
                    <li
                        key={r.id}
                        style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}
                    >
                        <button
                            onClick={() => setSelectedId(r.id)}
                            style={{ padding: "2px 6px" }}
                            title="Rezept anzeigen"
                        >
                            Anzeigen
                        </button>
                        <strong
                            onClick={() => setSelectedId(r.id)}
                            style={{ cursor: "pointer" }}
                            title="Rezept anzeigen"
                        >
                            {r.title}
                        </strong>
                        <span style={{ color: "#777" }}>({r.ingredients.length} Zutaten)</span>
                        <button
                            onClick={() => addToShopping(r)}
                            disabled={!canPushToShopping}
                            style={{ marginLeft: "auto" }}
                        >
                            Zutaten zur Einkaufsliste
                        </button>
                        <button onClick={() => removeRecipe(r.id)} disabled={!canWriteRecipes}>
                            Löschen
                        </button>
                    </li>
                ))}
            </ul>

            {recipes.length === 0 && <div>Keine Rezepte vorhanden.</div>}
        </div>
    );
};
