import { pluginManager } from "../../app/pluginManager";
import { CatImageViewerPlugin } from "./Page";

pluginManager.register({
  id: "catImageViewer",
  route: "/catImageViewer",
  component: CatImageViewerPlugin,
  tile: "Saved Cat Images 😺",
  color1: "#0099ee",
  color2: "#ee00cc",
  spin: 23,
  permissions: ["catImages.read","catImages.write","profileImage.read","profileImage.write"],
  dependsOn: [
    { entity: "catImages", permissions: ["catImages.read","catImages.write"] }
  ],
});
