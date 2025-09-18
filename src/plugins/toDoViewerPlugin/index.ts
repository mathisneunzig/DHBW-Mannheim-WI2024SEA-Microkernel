import { pluginManager } from "../../app/pluginManager";
import { ToDoViewerPage } from "./page";

pluginManager.register({
    id: "toDoViewer",
    route: "/toDo",
    component: ToDoViewerPage,
    tile: "ToDo Viewer",
    color1: "#9b4fffff",
    color2: "#f700ffff",
    spin: 220,
    permissions: ["toDo.read","toDo.write"],
    dependsOn: [
        { entity: "toDo", permissions: ["toDo.read","toDo.write"] }
    ]
});