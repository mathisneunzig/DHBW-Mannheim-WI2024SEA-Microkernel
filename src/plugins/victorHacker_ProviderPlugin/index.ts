import { pluginManager } from "../../app/pluginManager";
import { DefinitionsEntity } from "./types";

pluginManager.register({
  id: "victorsProvider",
  route: "/victorsProvider",
  component: () => null,
  tile: "Victors Provider",
  color1: "#444",
  color2: "#777",
  spin: 15,
  permissions: ["definitions.read","definitions.write"],
  provides: [
    {
      entity: "definitions",
      initial: [] as DefinitionsEntity[],
      commands: {
        add: (state, payload: any) => {
          const list = Array.isArray(state) ? (state as DefinitionsEntity[]) : [];
          const word = String(payload?.word ?? "");
          const definition = String(payload?.definition ?? "");
          if (!word) return list;
          return [...list, { id: crypto.randomUUID(), word, definition }];
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
