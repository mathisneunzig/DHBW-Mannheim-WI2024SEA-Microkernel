import { pluginManager } from "../../app/pluginManager";
import { ShoppingViewerPage } from "./page";

pluginManager.register({
  id: "shoppingViewer",
  route: "/shopping",
  component: ShoppingViewerPage,
  tile: "Shopping List",
  color1: "#33aa33",
  color2: "#88dd88",
  spin: 150,
  permissions: ["shoppingList.read", "shoppingList.write"],
  dependsOn: [
    { entity: "shoppingList", permissions: ["shoppingList.read", "shoppingList.write"] }
  ]
});
