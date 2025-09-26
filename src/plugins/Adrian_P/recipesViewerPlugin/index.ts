import { pluginManager } from "../../../app/pluginManager.ts";
import { RecipeBookPage } from "./page.tsx";

pluginManager.register({
    id: "recipeBook",
    route: "/recipeBook",
    component: RecipeBookPage,
    tile: "Recipe Book",
    color1: "#00b894",
    color2: "#55efc4",
    spin: 45,
    permissions: ["recipes.read","recipes.write","shoppingList.write"],
    dependsOn: [
        { entity: "recipes",
            permissions: ["recipes.read","recipes.write"] }
    ]
});