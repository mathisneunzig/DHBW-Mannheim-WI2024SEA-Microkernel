
import { pluginManager } from "../../app/pluginManager";
import { AnimalsViewerPage } from "./page";

pluginManager.register({
  id: "animalsViewer",
  route: "/animalsViewer",
  component: AnimalsViewerPage,
  tile: "DHBW ZOO",
  color1: "#2e7d32",
  color2: "#dde80aff",
  spin: 200,
  permissions: ["animals.read", "animals.write"],
  dependsOn: [
    { entity: "animals", permissions: ["animals.read", "animals.write"] }
  ]
});

