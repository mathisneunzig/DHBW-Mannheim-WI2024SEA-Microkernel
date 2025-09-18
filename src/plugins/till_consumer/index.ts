import { pluginManager } from "../../app/pluginManager";
import { CoffeePlugin } from "./CoffeePlugin";

pluginManager.register({
  id: "coffeeConsumer",
  route: "/coffee",
  component: CoffeePlugin,
  tile: "Coffee ☕",
  color1: "#white",
  color2: "white",
  spin: 120,
  permissions: ["coffee.read", "coffee.write"],
  dependsOn: [
    { entity: "coffee", permissions: ["coffee.read", "coffee.write"] },
  ],
});
