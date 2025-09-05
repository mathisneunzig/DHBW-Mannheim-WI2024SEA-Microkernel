import { pluginManager } from "../../app/pluginManager";

pluginManager.register({
  id: "notesProvider",
  route: "/notesProvider",
  component: () => null,
  tile: "Notes Provider",
  color1: "#7e1b1bff",
  color2: "#111",
  spin: 15,
  permissions: [],
  provides: []
});
