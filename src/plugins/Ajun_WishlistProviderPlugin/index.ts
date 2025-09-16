import { pluginManager } from "../../app/pluginManager";
import { WishlistItem } from "./types";

pluginManager.register({
  id: "wishlistProvider",
  route: "/wishlistProvider",
  component: () => null,
  tile: "Wishlist Provider",
  color1: "#444",
  color2: "#777",
  spin: 15,
  permissions: ["wishlist.read", "wishlist.write"],
  provides: [
    {
      entity: "wishlist",
      initial: [] as WishlistItem[],
      commands: {
        add: (state, payload: any) => {
          const list = Array.isArray(state) ? (state as WishlistItem[]) : [];
          const item = String(payload?.item ?? "").trim();
          const qty = Number(payload?.qty ?? 1);
          if (!item) return list;
          return [...list, { id: crypto.randomUUID(), item, qty, done: false }];
        },
        remove: (state, payload: any) => {
          const list = Array.isArray(state) ? (state as WishlistItem[]) : [];
          const id = String(payload?.id ?? "");
          return list.filter((n) => n.id !== id);
        },
        toggleDone: (state, payload: any) => {
          const list = Array.isArray(state) ? (state as WishlistItem[]) : [];
          const id = String(payload?.id ?? "");
          return list.map((n) =>
            n.id === id ? { ...n, done: !n.done } : n
          );
        },
      },
    },
  ],
});
