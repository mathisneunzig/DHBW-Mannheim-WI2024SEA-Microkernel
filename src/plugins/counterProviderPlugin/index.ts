import { pluginManager } from "../../app/pluginManager";
import { counterProvider } from "./types";

pluginManager.register({
  id: "counterProvider",
  route: "/counterProvider",
  component: counterProvider,
  tile: "Counter Provider",
  color1: "#8844ff",
  color2: "#aa77ff",
  spin: 45,
  permissions: ["counter.read", "counter.write"],
  provides: [
    {
      entity: "counter",
      initial: 0 as number,
      commands: {
        increment: (state: unknown) => (state as number) + 1,
        decrement: (state: unknown) => (state as number) - 1,
        reset: () => 0
      }
    }
  ]
});
