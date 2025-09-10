import { pluginManager } from "../../app/pluginManager";
import { ASCIIPluginPage } from "./Page";

pluginManager.register({
  id: "ASCIIPlugin",
  route: "/ASCIIPlugin",
  component: ASCIIPluginPage,
  tile: "ASCII",
  color1: "green",
  color2: "#777",
  spin: 45,
  permissions: ["ASCIIs.read", "ASCIIs.write"],
  dependsOn: [
    { entity: "ASCIIs", permissions: ["ASCIIs.read", "ASCIIs.write"] },
  ],
});
