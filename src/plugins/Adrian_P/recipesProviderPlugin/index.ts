import { pluginManager } from "../../../app/pluginManager.ts";
import type { Recipe, Ingredient } from "./types.ts";

pluginManager.register({
    id: "recipesProvider",
    route: "/recipesProvider",
    component: () => null,
    tile: "Recipes Provider",
    color1: "#6a5acd",
    color2: "#b19cd9",
    spin: 10,
    permissions: ["recipes.read", "recipes.write"],
    provides: [
        {
            entity: "recipes",
            initial: [] as Recipe[],
            commands: {
                add: (state, payload: any) => {
                    const list = Array.isArray(state) ? (state as Recipe[]) : [];
                    const title = String(payload?.title ?? "").trim();
                    const ingredients = Array.isArray(payload?.ingredients)
                        ? (payload.ingredients as Ingredient[])
                        : [];
                    const servings = Number(payload?.servings ?? 2);
                    const description =
                        typeof payload?.description === "string" ? payload.description : undefined;
                    if (!title) return list;
                    return [
                        ...list,
                        { id: crypto.randomUUID(), title, servings, ingredients, description },
                    ];
                },
                remove: (state, payload: any) => {
                    const list = Array.isArray(state) ? (state as Recipe[]) : [];
                    const id = String(payload?.id ?? "");
                    return list.filter((r) => r.id !== id);
                },
                addIngredient: (state, payload: any) => {
                    const list = Array.isArray(state) ? (state as Recipe[]) : [];
                    const id = String(payload?.id ?? "");
                    const ing = payload?.ingredient as Ingredient | undefined;
                    if (!id || !ing) return list;
                    return list.map((r) =>
                        r.id === id ? { ...r, ingredients: [...r.ingredients, ing] } : r
                    );
                },
                removeIngredient: (state, payload: any) => {
                    const list = Array.isArray(state) ? (state as Recipe[]) : [];
                    const id = String(payload?.id ?? "");
                    const name = String(payload?.name ?? "");
                    return list.map((r) =>
                        r.id === id
                            ? { ...r, ingredients: r.ingredients.filter((i) => i.name !== name) }
                            : r
                    );
                },
                setDescription: (state, payload: any) => {
                    const list = Array.isArray(state) ? (state as Recipe[]) : [];
                    const id = String(payload?.id ?? "");
                    const description =
                        typeof payload?.description === "string" ? payload.description : "";
                    if (!id) return list;
                    return list.map((r) => (r.id === id ? { ...r, description } : r));
                },
            },
        },
    ],
});