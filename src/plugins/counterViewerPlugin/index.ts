import { pluginManager } from "../../app/pluginManager";
import { CounterViewerPage } from "./page";




pluginManager.register({
  id: "counterViewer",
  route: "/counter",
  component: CounterViewerPage,
  tile: "Counter App",
  color1: "#00cc66",
  color2: "#66ffcc",
  spin: 120,
  permissions: ["counter.read", "counter.write"],
  dependsOn: [
    { entity: "counter", permissions: ["counter.read", "counter.write"] }
  ]
});
