import { pluginManager } from "../../app/pluginManager";
import { NotesViewerPage } from "./page";

pluginManager.register({
  id: "notesViewer",
  route: "/notes",
  component: NotesViewerPage,
  tile: "Notes Viewer",
  color1: "#00aaff",
  color2: "#66ccff",
  spin: 220,
  permissions: ["notes.read","notes.write"],
  dependsOn: [
    { entity: "notes", permissions: ["notes.read","notes.write"] }
  ]
});
