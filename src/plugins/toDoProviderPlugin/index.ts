import { pluginManager } from "../../app/pluginManager";
import { ToDo } from "./types";

pluginManager.register({
    id: "toDoProvider",
    route: "/toDoProvider",
    component: () => null,
    tile: "ToDo Provider",
    color1: "#444",
    color2: "#777",
    spin: 15,
    permissions: ["toDo.read","toDo.write"],
    provides: [
        {
            entity: "toDo",
            initial: [] as ToDo[],
            commands: {
                add: (state, payload: any) => {
                    const list = Array.isArray(state) ? state as ToDo[] : [];
                    const text = String(payload?.text ?? "");
                    if (!text) return list;
                    return [...list, { id: crypto.randomUUID(), text, done: false }];
                },
                check: (state, payload: any) => {
                    const list = Array.isArray(state) ? state as ToDo[] : [];
                    const id = String(payload?.id ?? "");
                    return list.map(todo =>
                        todo.id === id ? { ...todo, done: true } : todo
                    );
                }
            }
        }
    ]
});