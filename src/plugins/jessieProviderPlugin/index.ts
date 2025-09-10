import { pluginManager } from "../../app/pluginManager";
import { List } from "./types";

pluginManager.register({
  id: "bucketlistProvider",
  route: "/bucketlistProvider",
  component: () => null,
  tile: "Bucket-Liste Provider",
  color1: "#444",
  color2: "#777",
  spin: 15,
  permissions: ["list.read", "list.write"],
  provides: [
    {
      entity: "list",
      initial: [] as List[],
      commands: {
        add: (state, payload: any) => {
          const list = Array.isArray(state)
            ? (state as { id: string; text: string }[])
            : [];
          const text = String(payload?.text ?? "");
          const imageUrl =
            typeof payload?.imageUrl === "string"
              ? payload.imageUrl.trim()
              : undefined;
          const description = String(payload?.description ?? "");
          if (!text) return list;
          return [
            ...list,
            {
              id: crypto.randomUUID(),
              text,
              imageUrl: imageUrl || undefined,
              description: description || undefined,
            },
          ];
        },
        remove: (state, payload: any) => {
          const list = Array.isArray(state)
            ? (state as { id: string; text: string }[])
            : [];
          const id = String(payload?.id ?? "");
          return list.filter((n) => n.id !== id);
        },
      },
    },
  ],
});
