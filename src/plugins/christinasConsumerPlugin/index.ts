import { pluginManager } from "../../app/pluginManager";
import { christinasPlugin } from "./page";

pluginManager.register({
  id: "christinasPlugin",
  route: "/christina",
  component: christinasPlugin,
  tile: "Christinas Plugin Viewer",
  color1: "#E6B2BA",
  color2: "#C599B6",
  spin: 220,
  permissions: ["emotionsLinks.read", "emotionsLinks.write"],
});