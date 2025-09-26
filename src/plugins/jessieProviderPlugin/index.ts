import { pluginManager } from "../../app/pluginManager";
import { List } from "./types";

pluginManager.register({
  id: "bucketlistProvider",
  route: "/bucketlistProvider",
  component: () => null,
  tile: "Bucket-Liste Provider",
  color1: "#CDAF95",
  color2: "#ba9a7eff",
  spin: 45,
  permissions: ["list.read", "list.write", "list.edit"],
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
        edit: (state, payload: any) => {
          const list = Array.isArray(state) ? (state as List[]) : [];
          const id = String(payload?.id ?? "").trim();
          const newText = String(payload?.text ?? "").trim();
          const newImageUrl =
            typeof payload?.imageUrl === "string"
              ? payload.imageUrl.trim()
              : undefined;
          const newDescription = String(payload?.description ?? "").trim();

          if (!id) return list;

          return list.map((item) =>
            item.id === id
              ? {
                  ...item,
                  text: newText || item.text,
                  imageUrl: newImageUrl ?? item.imageUrl,
                  description: newDescription || item.description,
                }
              : item
          );
        },
      },
    },
  ],
});
