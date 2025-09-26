import { pluginManager } from "../../app/pluginManager";
import {  nicosPage } from "./Page";

pluginManager.register({
  id: "nicosPlugin",
  route: "/nicosPlugin",
  component: nicosPage,
  tile: "NicosPage",
  color1: "blue",
  color2: "gray",
  spin: 150,
  permissions: ["decks.read","decks.write"],
  dependsOn: [
    { entity: "decks", permissions: ["decks.read","decks.write"] }
  ]
});
