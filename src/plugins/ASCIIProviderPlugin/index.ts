import { pluginManager } from "../../app/pluginManager";

pluginManager.register({
  id: "notesProvider",
  route: "/notesProvider",
  component: () => null,
  tile: "Notes Provider",
  color1: "#7e1b1bff",
  color2: "#111",
  spin: 15,
  permissions: ["ASCIIs.read", "ASCIIs.write"],
  provides: [
    {
      entity: "ASCIIs",
      initial: [
        {
          id: "f1",
          frame: `
  (•_•)
 <)   )╯
  /   \\`,
        },
        {
          id: "f2",
          frame: `
  (•_•)
 \\(   )>
  /   \\`,
        },
        {
          id: "f3",
          frame: `
  (•_•)
 <)   )>
  /   \\`,
        },
      ],
      commands: {
        setSpeed: (speed: any) => {
          const newSpeed =
            typeof speed === "number" && !isNaN(speed) ? speed : 0;
        },
      },
    },
  ],
});
