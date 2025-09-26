import { pluginManager } from "../../../app/pluginManager";
import { Hobby } from "./types";

pluginManager.register({
  id: "hobbiesProvider",
  route: "/hobbiesProvider",
  component: () => null,
  tile: "Hobbies Provider",
  color1: "#FFAA33",
  color2: "#FFDD88",
  spin: 25,
  permissions: ["hobbies.read","hobbies.write"],
  provides: [
    {
      entity: "hobbies",
      initial: [] as Hobby[],
      commands: {
        add: (state, payload: any) => {
          const list = Array.isArray(state) ? state as (Hobby[]) : [];
          const benutzername = String(payload?.benutzername ?? "");
          const name = String(payload?.name?? ""); 
          if (!benutzername || !name) return list;
          return [...list, { id: crypto.randomUUID(), benutzername, name }];
        },
        remove: (state, payload: any) => {
          const list = Array.isArray(state) ? state as (Hobby[]) : [];
          const id = String(payload?.id ?? "");
          return list.filter((h) => h.id !== id);
        }
      }
    }
  ]
});
