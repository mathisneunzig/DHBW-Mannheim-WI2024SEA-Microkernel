import { pluginManager } from "../../app/pluginManager";
import { MemoryViewerPage } from "./page";

pluginManager.register({
  id: "memoryViewer",
  route: "/memory",
  component: MemoryViewerPage,
  tile: "Memory Viewer",
  color1: "#00aaff",
  color2: "#66ccff",
  spin: 220,
  permissions: ["array.read","array.write"],
  dependsOn: [
    { entity: "array", permissions: ["array.read","array.write"] }
  ]
});
