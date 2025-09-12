import { pluginManager } from "../../app/pluginManager";
import { ASCIIPlayerPage } from "./Page";

pluginManager.register({
  id: "ASCIIPlayer",
  route: "/ASCIIPlayer",
  component: ASCIIPlayerPage,
  tile: "ASCII",
  color1: "green",
  color2: "#777",
  spin: 45,
  permissions: ["ASCIIs.read", "ASCIIs.write"],
  dependsOn: [
    { entity: "ASCIIs", permissions: ["ASCIIs.read", "ASCIIs.write"] },
  ],
});
