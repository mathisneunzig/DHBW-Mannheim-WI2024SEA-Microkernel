import { pluginManager } from "../../app/pluginManager";
import { GambleViewerPage } from "./page";

pluginManager.register({
  id: "gambleViewer",
  route: "/gamble",
  component: GambleViewerPage,
  tile: "GAMBA 🤑🤑",
  color1: "yellow",
  color2: "blue",
  spin: 15,
  permissions: ["money.read", "money.write"],
  dependsOn: [
    { entity: "money", permissions: ["money.read", "money.write"] },
  ]
});