import { pluginManager } from "../../app/pluginManager";
import { GalleryItem } from "./types.ts";

pluginManager.register({
  id: "galleryProvider",
  route: "/galleryProvider",
  component: () => null,
  tile: "Gallery Provider",
  color1: "#8e44ad",
  color2: "#9b59b6",
  spin: 25,
  permissions: ["gallery.read", "gallery.write"],

  provides: [
    {
      entity: "gallery",
      initial: [] as GalleryItem[],
      commands: {
        add: (state, payload: any) => {
          const list = Array.isArray(state) ? state as GalleryItem[] : [];
          const item: GalleryItem = {
            id: crypto.randomUUID(),
            sketchUrl: String(payload?.sketchUrl ?? ""),
            finalUrl: String(payload?.finalUrl ?? ""),
            title: String(payload?.title ?? "Untitled")
          };
            if (!item.sketchUrl || !item.finalUrl) return list;
            return [...list, item];
        },
        remove: (state, payload: any) => {
          const list = Array.isArray(state) ? state as GalleryItem[] : [];
          const id = String(payload?.id ?? "");
          return list.filter(n => n.id !== id);
        }
      }
    }
  ]
});
