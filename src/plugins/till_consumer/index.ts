import { pluginManager } from "../../app/pluginManager";
import { CoffeePlugin } from "./CoffeePlugin";

pluginManager.register({
  id: "coffeeConsumer",
  route: "/coffee",
  component: CoffeePlugin,
  tile: "Get your daily cup of Coffee",
  color1: "#121212",
  color2: "#121212",
  spin: 10,
  permissions: ["coffee.read", "coffee.write"],
  dependsOn: [
    { entity: "coffee", permissions: ["coffee.read", "coffee.write"] },
  ],
});
