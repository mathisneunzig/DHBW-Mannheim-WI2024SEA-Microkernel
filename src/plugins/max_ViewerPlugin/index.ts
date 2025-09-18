import { pluginManager } from "../../app/pluginManager";
import { OiiaiViewerPage } from "./page";
pluginManager.register({
  id: "oiiaiViewer",
  route: "/oiiai",
  component: OiiaiViewerPage,
  tile: "Oiiai Viewer",
  color1: "#ff0000",
  color2: "#000000",
  spin: 90,
  permissions: ["oiiaiLink.read", "oiiaiLink.write"],
  dependsOn: [
    {
      entity: "oiiaiLink",
      permissions: ["oiiaiLink.read", "oiiaiLink.write"],
    },
  ],
});
