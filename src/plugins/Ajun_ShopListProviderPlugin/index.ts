import { pluginManager } from "../../app/pluginManager";
import { ShoppingItem } from "./types";

pluginManager.register({
  id: "shoppingProvider",
  route: "/shoppingProvider",
  component: () => null,
  tile: "Shopping Provider",
  color1: "#444",
  color2: "#777",
  spin: 15,
  permissions: ["shoppingList.read", "shoppingList.write"],
  provides: [
    {
      entity: "shoppingList",
      initial: [] as ShoppingItem[],
      commands: {
        add: (state, payload: any) => {
          const list = Array.isArray(state) ? (state as ShoppingItem[]) : [];
          const item = String(payload?.item ?? "").trim();
          const qty = Number(payload?.qty ?? 1);
          if (!item) return list;
          return [...list, { id: crypto.randomUUID(), item, qty }];
        },
        remove: (state, payload: any) => {
          const list = Array.isArray(state) ? (state as ShoppingItem[]) : [];
          const id = String(payload?.id ?? "");
          return list.filter((n) => n.id !== id);
        },
      },
    },
  ],
});
