import { pluginManager } from "../../app/pluginManager";
import { Food } from "./page";

pluginManager.register({
  id: "FoodViewer",
  route: "/Food",
  component: Food,
  tile: "FOoD REvIewER",
  color1: "#FFD700",
  color2: "#A020F0",
  spin: 220,
  permissions: ["reviews.read","reviews.write"],
  dependsOn: [
    { entity: "reviews", permissions: ["reviews.read","reviews.write"] }
  ]
});
