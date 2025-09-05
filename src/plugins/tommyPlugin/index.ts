import { pluginManager } from "../../app/pluginManager";
import { HelloWorldPluginPage } from "./Page";

pluginManager.register({
  id: "tommy",
  route: "/tommy",
  component: HelloWorldPluginPage,
  tile: "Tommy the cat!",
  color1: "orange",
  color2: "purple",
  spin: 15
});
