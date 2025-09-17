import { pluginManager } from "../../app/pluginManager";
import { CoffeePlugin } from "./CoffeePlugin";

pluginManager.register({
  id: "coffeeConsumer",
  route: "/coffee",
  component: CoffeePlugin,
  tile: "Get your daily cup of Coffee",
  color1: "<Farbe 1>",
  color2: "<Farbe 2>",
  spin: 45,
  permissions: ["coffee.read", "coffee.write"],
  dependsOn: [
    { entity: "coffee", permissions: ["coffee.read", "coffee.write"] },
  ],
});
