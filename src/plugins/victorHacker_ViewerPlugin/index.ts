import { pluginManager } from "../../app/pluginManager";
import { VictorsPluginPage } from "./page"; 

pluginManager.register({
  id: "victorsPlugin",
  route: "/victorsPlugin",
  component: VictorsPluginPage,
  tile: "Victors Plugin",
  color1: "#c31432",
  color2: "#240b36",
  spin: 135,
  permissions: ["definitions.read","definitions.write"]
});