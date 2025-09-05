import { pluginManager } from "../../app/pluginManager";
import { LinkEntity } from "./types";
pluginManager.register({
  id: "koenigseggProvider",
  route: "/koenigseggProvider",
  component: () => null,
  tile: "Koenigsegg Provider",
  color1: "#444",
  color2: "#777",
  spin: 15,
  permissions: ["koenigseggLink.read", "koenigseggLink.write"],
  provides: [
    {
      entity: "koenigseggLink",
      initial: [
        {
          id: "yt1",
          title: "BRUMM BRUUUUUUUUMM",
          url: "https://www.youtube.com/watch?v=cO8a07sbBAc",
        },
      ] as LinkEntity[],
      commands: {
        update: (state, payload: any) => {
          const list = Array.isArray(state) ? (state as LinkEntity[]) : [];
          const id = String(payload?.id ?? "");
          const url = String(payload?.url ?? "");
          return list.map((link) => (link.id === id ? { ...link, url } : link));
        },
      },
    },
  ],
});
