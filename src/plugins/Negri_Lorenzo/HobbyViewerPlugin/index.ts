import { pluginManager } from "../../../app/pluginManager.ts";
import { HobbiesViewerPage } from "./page.tsx";

pluginManager.register({
  id: "hobbiesViewer",
  route: "/hobbies",
  component: HobbiesViewerPage,
  tile: "Hobbyliste",
  color1: "#06af00ff",
  color2: "#02c04bff",
  spin: 180,
  permissions: ["hobbies.read","hobbies.write"],
  dependsOn: [
    { entity: "hobbies", permissions: ["hobbies.read","hobbies.write"] }
  ]
});
