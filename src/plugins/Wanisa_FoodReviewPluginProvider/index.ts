import { pluginManager } from "../../app/pluginManager";
import { Food } from "./page";

pluginManager.register({
  id: "FoodProvider",
  route: "/FoodProvider",
  component: () => null,
  tile: "Food Provider",
  color1: "#444",
  color2: "#777",
  spin: 15,
  permissions: ["reviews.read","reviews.write"],
  provides: [
    {
      entity: "reviews",
      initial: [] as Food[],
      commands: {
        add: (state, payload: any) => {
          const list = Array.isArray(state) ? state as { id: string; text: string }[] : [];
          const text = String(payload?.text ?? "");
          if (!text) return list;
          return [...list, { id: crypto.randomUUID(), text }];
        },
        remove: (state, payload: any) => {
          const list = Array.isArray(state) ? state as { id: string; text: string }[] : [];
          const id = String(payload?.id ?? "");
          return list.filter(n => n.id !== id);
        }
      }
    }
  ]
});
