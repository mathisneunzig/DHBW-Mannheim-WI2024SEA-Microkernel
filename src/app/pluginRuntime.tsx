import React from "react";
import { useKernel, type KernelData, type Permission, type Address } from "./kernel";
import type { Plugin } from "./pluginManager";

export type PluginCtx = {
  can: (perm: Permission) => boolean;
  read: {
    users: () => Readonly<KernelData["users"]>;
    shoppingList: () => Readonly<KernelData["shoppingList"]>;
    profileImage: () => Readonly<KernelData["profileImage"]>;
    todos: () => Readonly<KernelData["todos"]>;
  };
  write: {
    addUser: (args: {
      firstName: string;
      lastName: string;
      address: Address;
      favColor?: string | null;
      favAnimal?: string | null;
      birthday: Date;
    }) => void;
    addShopping: (item: string, qty?: number) => void;
    removeShopping: (id: string) => void;
    setProfileImage: (dataUrl: string | null) => void;
    addTodo: (text: string) => void;
    toggleTodo: (id: string) => void;
  };
};

export const withPluginRuntime = (
  plugin: Plugin,
  Comp: React.FC<{ ctx: PluginCtx }>
) => {
  const Wrapped: React.FC = () => {
    const kernel = useKernel();
    const perms = new Set<Permission>(plugin.permissions ?? []);

    const require = (p: Permission) => {
      if (!perms.has(p)) throw new Error(`Plugin "${plugin.id}" fehlt Berechtigung: ${p}`);
    };

    const ctx: PluginCtx = {
      can: (p) => perms.has(p),
      read: {
        users:        () => { require("users.read");        return kernel.data.users; },
        shoppingList: () => { require("shoppingList.read"); return kernel.data.shoppingList; },
        profileImage: () => { require("profileImage.read"); return kernel.data.profileImage; },
        todos:        () => { require("todos.read");        return kernel.data.todos; },
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
        addShopping:   (item, qty) => { require("shoppingList.write"); kernel.dispatch({ type: "shopping.add", item, qty }); },
        removeShopping:(id)        => { require("shoppingList.write"); kernel.dispatch({ type: "shopping.remove", id }); },
        setProfileImage:(dataUrl)  => { require("profileImage.write"); kernel.dispatch({ type: "profile.set", dataUrl }); },
        addTodo:       (text)      => { require("todos.write");        kernel.dispatch({ type: "todo.add", text }); },
        toggleTodo:    (id)        => { require("todos.write");        kernel.dispatch({ type: "todo.toggle", id }); },
      },
    };

    return <Comp ctx={ctx} />;
  };

  return Wrapped;
};