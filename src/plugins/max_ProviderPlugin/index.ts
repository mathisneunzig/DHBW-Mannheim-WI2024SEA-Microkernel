import { pluginManager } from "../../app/pluginManager";
import { LinkEntity } from "./types";
pluginManager.register({
  id: "oiiaiProvider",
  route: "/oiiaiProvider",
  component: () => null,
  tile: "Oiiai Provider",
  color1: "#444",
  color2: "#777",
  spin: 15,
  permissions: ["oiiaiLink.read", "oiiaiLink.write"],
  provides: [
    {
      entity: "oiiaiLink",
      initial: [
        {
          id: "yt1",
          title: "OIIAI O-OIIAI",
          url: "https://www.youtube.com/watch?v=IxX_QHay02M&list=RDIxX_QHay02M&start_radio=1&t=32s",
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
