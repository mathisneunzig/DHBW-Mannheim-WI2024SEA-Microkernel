import { pluginManager } from "../../app/pluginManager";
import { KoenigseggViewerPage } from "./page";
pluginManager.register({
  id: "koenigseggViewer",
  route: "/koenigsegg",
  component: KoenigseggViewerPage,
  tile: "Koenigsegg Viewer",
  color1: "#ff0000",
  color2: "#000000",
  spin: 90,
  permissions: ["koenigseggLink.read", "koenigseggLink.write"],
  dependsOn: [
    {
      entity: "koenigseggLink",
      permissions: ["koenigseggLink.read", "koenigseggLink.write"],
    },
  ],
});
