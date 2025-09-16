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
          frame: String.raw`
                              _
                            | \
                            | |
                            | |
        |\                   | |
      /, ~\                / /
      X     \`-.....-------./ /
      ~-. ~  ~              |
          \             /    |
          \  /_     ___\   /
          | /\ ~~~~~   \ |
          | | \        || |
          | |\ \       || )
          (_/ (_/      ((_/ 
          `,
        },
        {
          id: "f2",
          frame: String.raw`
                              _
                            / |
                            |  |
                            |  |
        |\                   | |
      /, ~\                / /
      X     \`-.....-------./ /
      ~-. ~  ~              |
          \             /    |
          \  /_     ___\   /
          | /\ ~~~~~   \ |
          | | \        || |
          | |\ \       || )
          (_/ (_/      ((_/ 
          `,
        },
        {
          id: "f3",
          frame: String.raw`
                              _
                            /  |
                          /   |
                          |   |
        |\                   | |
      /, ~\                / /
      X     \`-.....-------./ /
      ~-. ~  ~              |
          \             /    |
          \  /_     ___\   /
          | /\ ~~~~~   \ |
          | | \        || |
          | |\ \       || )
          (_/ (_/      ((_/ 
          `,
        },
        {
          id: "f4",
          frame: String.raw`
                              _
                            |  /
                            | | 
                            | | 
        |\                   | |
      /, ~\                / /
      X     \`-.....-------./ /
      ~-. ~  ~              |
          \             /    |
          \  /_     ___\   /
          | /\ ~~~~~   \ |
          | | \        || |
          | |\ \       || )
          (_/ (_/      ((_/ 
          `,
        },
        {
          id: "f5",
          frame: String.raw`
                              _
                            | /
                            |/ 
                            |  
        |\                   | |
      /, ~\                / /
      X     \`-.....-------./ /
      ~-. ~  ~              |
          \             /    |
          \  /_     ___\   /
          | /\ ~~~~~   \ |
          | | \        || |
          | |\ \       || )
          (_/ (_/      ((_/ 
          `,
        },
      ],
      commands: {
        addFrame: (state , payload: any) => {
          const list = Array.isArray(state) ? (state as { id: string; frame: string }[]) : [];
          const frame = String(payload?.frame ?? "");
          if (!frame) return list;
          const id = crypto.randomUUID();
          return [...list, { id, frame }];
        },
        removeFrame: (state , payload: any) => {
          const list = Array.isArray(state) ? state as { id: string; frame: string }[] : [];
          const id = String(payload?.id ?? "");
          return list.filter(n => n.id !== id);
        },
      },
    },
  ],
});
