import { pluginManager } from "../../app/pluginManager";
import { Mood } from "./types";

pluginManager.register({
  id: "moodProvider",
  route: "/moodProvider",
  component: () => null,
  tile: "Mood Provider",
  color1: "black",
  color2: "white",
  spin: 15, 
  permissions: ["mood.read","mood.write"],
  provides: [
      {
        entity: "mood",
        initial: null as Mood | null,
        commands: {
          set: (state, payload: any) => {
            const value = Number(payload?.value ?? 0);
            const status = String(payload?.status ?? "");
            
            if (!status || value == 0) return state

            return {value, status};
          },
          reset: () => null
        }
      }
    ]
});