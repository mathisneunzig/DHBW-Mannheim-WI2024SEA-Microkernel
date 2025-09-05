import { pluginManager } from "../../app/pluginManager";
import { HelloWorldPluginPage } from "./Page";

pluginManager.register({
  id: "helloworld",
  route: "/helloworld",
  component: HelloWorldPluginPage,
  tile: "Hello World! 🚀",
  color1: "red", 
  color2: "yellow",
  spin: 135
});
