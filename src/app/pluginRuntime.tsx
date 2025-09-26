import React from "react";
import { useKernel, type KernelData, type Permission } from "./kernel";
import type { Plugin } from "./pluginManager";

export type PluginCtx = {
  can: (
    perm: Permission | `${string}.read` | `${string}.write` | `${string}.edit`
  ) => boolean;
  read: {
    users: () => Readonly<KernelData["users"]>;
    shoppingList: () => Readonly<KernelData["shoppingList"]>;
    profileImage: () => Readonly<KernelData["profileImage"]>;
    todos: () => Readonly<KernelData["todos"]>;
    entity: (entity: string) => unknown;
  };
  write: {
    addUser: (args: {
      firstName: string;
      lastName: string;
      address: KernelData["users"][number]["address"];
      favColor?: string | null;
      favAnimal?: string | null;
      birthday: Date;
    }) => void;
    addShopping: (item: string, qty?: number) => void;
    removeShopping: (id: string) => void;
    setProfileImage: (dataUrl: string | null) => void;
    addTodo: (text: string) => void;
    toggleTodo: (id: string) => void;
    exec: (entity: string, command: string, payload: unknown) => void;
  };
};

export const withPluginRuntime = (
  plugin: Plugin,
  Comp: React.FC<{ ctx: PluginCtx }>
) => {
  const Wrapped: React.FC = () => {
    const kernel = useKernel();
    const perms = new Set<string>(plugin.permissions ?? []);

    const require = (p: string) => {
      if (!perms.has(p))
        throw new Error(`Plugin "${plugin.id}" fehlt Berechtigung: ${p}`);
    };

    const ctx: PluginCtx = {
      can: (p) => perms.has(String(p)),
      read: {
        users: () => {
          require("users.read");
          return kernel.data.users;
        },
        shoppingList: () => {
          require("shoppingList.read");
          return kernel.data.shoppingList;
        },
        profileImage: () => {
          require("profileImage.read");
          return kernel.data.profileImage;
        },
        todos: () => {
          require("todos.read");
          return kernel.data.todos;
        },
        entity: (entity) => {
          require(`${entity}.read`);
          return kernel.data.entities[entity];
        },
      },
      write: {
        addUser: (args) => {
          require("users.write");
          kernel.dispatch({
            type: "users.add",
            firstName: args.firstName,
            lastName: args.lastName,
            address: args.address,
            favColor: args.favColor ?? null,
            favAnimal: args.favAnimal ?? null,
            birthday: args.birthday,
          });
        },
        addShopping: (item, qty) => {
          require("shoppingList.write");
          kernel.dispatch({ type: "shopping.add", item, qty });
        },
        removeShopping: (id) => {
          require("shoppingList.write");
          kernel.dispatch({ type: "shopping.remove", id });
        },
        setProfileImage: (dataUrl) => {
          require("profileImage.write");
          kernel.dispatch({ type: "profile.set", dataUrl });
        },
        addTodo: (text) => {
          require("todos.write");
          kernel.dispatch({ type: "todo.add", text });
        },
        toggleTodo: (id) => {
          require("todos.write");
          kernel.dispatch({ type: "todo.toggle", id });
        },
        exec: (entity, command, payload) => {
          require(`${entity}.write`);
          kernel.execEntity(entity, command, payload);
        },
      },
    };

    return <Comp ctx={ctx} />;
  };

  return Wrapped;
};
