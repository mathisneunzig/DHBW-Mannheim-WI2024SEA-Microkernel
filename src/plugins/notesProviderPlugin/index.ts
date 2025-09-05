import { pluginManager } from "../../app/pluginManager";
import { Note } from "./types";

pluginManager.register({
  id: "notesProvider",
  route: "/notesProvider",
  component: () => null,
  tile: "Notes Provider",
  color1: "#444",
  color2: "#777",
  spin: 15,
  permissions: ["notes.read","notes.write"],
  provides: [
    {
      entity: "notes",
      initial: [] as Note[],
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
