import { pluginManager } from "../../app/pluginManager";
import { money } from "./variables";

pluginManager.register({
  id: "gambleProvider",
  route: "/gambleProvider",
  component: () => null,
  tile: "Gambling Provider 🤑",
  color1: "yellow",
  color2: "blue",
  spin: 15,
  permissions: ["money.read", "money.write"],
  provides: [{
    entity: "money",
    initial: money,
    commands: {
        add: (state: any, amount: any) => {
            return state + amount;
        },
        subtract: (state: any, amount: any) => {
            return state - amount;
        }
    }
  }]
});
