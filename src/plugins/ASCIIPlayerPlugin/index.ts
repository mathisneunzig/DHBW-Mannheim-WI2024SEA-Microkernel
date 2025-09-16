import { pluginManager } from "../../app/pluginManager";
import { ASCIIPlayerPage } from "./Page";

pluginManager.register({
  id: "ASCIIPlayer",
  route: "/ASCIIPlayer",
  component: ASCIIPlayerPage,
  tile: "ASCII",
  color1: "#43cea2",
  color2: "#185a9d",
  spin: 135,
  permissions: ["ASCIIs.read", "ASCIIs.write"],
  dependsOn: [
    { entity: "ASCIIs", permissions: ["ASCIIs.read", "ASCIIs.write"] },
  ],
});
