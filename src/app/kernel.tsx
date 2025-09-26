import React, { createContext, useContext, useMemo, useReducer, useEffect, useRef } from "react";

export type Address = {
  street: string;
  houseNr: string;
  zipCode: string;
  city: string;
  country: string;
};

export type KernelData = {
  users: {
    id: string;
    firstName: string;
    lastName: string;
    address: Address;
    favColor: string | null;
    favAnimal: string | null;
    birthday: Date;
  }[];
  shoppingList: { id: string; item: string; qty: number }[];
  profileImage: string | null;
  todos: { id: string; text: string; done: boolean }[];
  entities: Record<string, unknown>;
};

export type Permission =
  | "users.read" | "users.write"
  | "shoppingList.read" | "shoppingList.write"
  | "profileImage.read" | "profileImage.write"
  | "todos.read" | "todos.write"
  | "gallery.read" | "gallery.write";

type Cmd =
  | {
      type: "users.add";
      firstName: string;
      lastName: string;
      address: Address;
      favColor?: string | null;
      favAnimal?: string | null;
      birthday: Date;
    }
  | { type: "shopping.add"; item: string; qty?: number }
  | { type: "shopping.remove"; id: string }
  | { type: "profile.set"; dataUrl: string | null }
  | { type: "todo.add"; text: string }
  | { type: "todo.toggle"; id: string }
  | { type: "entity.set"; entity: string; next: unknown }
  | { type: "entity.exec"; entity: string; command: string; payload: unknown };

function reducer(state: KernelData, cmd: Cmd): KernelData {
  switch (cmd.type) {
    case "users.add": {
      const user = {
        id: crypto.randomUUID(),
        firstName: cmd.firstName,
        lastName: cmd.lastName,
        address: cmd.address,
        favColor: cmd.favColor ?? null,
        favAnimal: cmd.favAnimal ?? null,
        birthday: cmd.birthday,
      };
      return { ...state, users: [...state.users, user] };
    }
    case "shopping.add":
      return {
        ...state,
        shoppingList: [
          ...state.shoppingList,
          { id: crypto.randomUUID(), item: cmd.item, qty: cmd.qty ?? 1 },
        ],
      };
    case "shopping.remove":
      return {
        ...state,
        shoppingList: state.shoppingList.filter((x) => x.id !== cmd.id),
      };
    case "profile.set":
      return { ...state, profileImage: cmd.dataUrl };
    case "todo.add":
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: crypto.randomUUID(), text: cmd.text, done: false },
        ],
      };
    case "todo.toggle":
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === cmd.id ? { ...t, done: !t.done } : t
        ),
      };
    case "entity.set":
      return {
        ...state,
        entities: { ...state.entities, [cmd.entity]: cmd.next },
      };
    case "entity.exec":
      return state;
    default:
      return state;
  }
}

export type KernelAPI = {
  data: Readonly<KernelData>;
  dispatch: (cmd: Cmd) => void;
  registerEntity: (entity: string, initial: unknown, commands: Record<string, (state: unknown, payload: unknown) => unknown>) => void;
  execEntity: (entity: string, command: string, payload: unknown) => void;
};


const KernelCtx = createContext<KernelAPI | null>(null);

type KernelProviderProps = {
  initial: KernelData;
  children: React.ReactNode;
};

const STORAGE_KEY = "kernelState:v2";

function revive(data: any): KernelData {
  return {
    ...data,
    users: (data.users ?? []).map((u: any) => ({
      ...u,
      birthday: u.birthday ? new Date(u.birthday) : new Date(),
    })),
    entities: data.entities ?? {},
  };
}

export const KernelProvider: React.FC<KernelProviderProps> = ({ initial, children }) => {
  const commandsRef = useRef<Record<string, Record<string, (state: unknown, payload: unknown) => unknown>>>({});
  const [state, dispatch] = useReducer(
    reducer,
    undefined,
    (): KernelData => {
      try {
        const raw = sessionStorage.getItem(STORAGE_KEY);
        if (raw) return revive(JSON.parse(raw));
      } catch {}
      return { ...initial, entities: initial.entities ?? {} };
    }
  );

  useEffect(() => {
    try {
      const serializable = {
        ...state,
        users: state.users.map((u) => ({ ...u, birthday: u.birthday.toISOString() })),
      };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
    } catch {}
  }, [state]);

  const registerEntity = (entity: string, initialValue: unknown, commands: Record<string, (state: unknown, payload: unknown) => unknown>) => {
    if (!commandsRef.current[entity]) {
      commandsRef.current[entity] = { ...commands };
    } else {
      commandsRef.current[entity] = { ...commandsRef.current[entity], ...commands };
    }
    if (!(entity in state.entities)) {
      dispatch({ type: "entity.set", entity, next: initialValue });
    }
  };

  const execEntity = (entity: string, command: string, payload: unknown) => {
    const reg = commandsRef.current[entity];
    const fn = reg ? reg[command] : undefined;
    if (!fn) return;
    const current = state.entities[entity];
    const next = fn(current, payload);
    dispatch({ type: "entity.set", entity, next });
  };

  const api = useMemo<KernelAPI>(() => ({ data: state, dispatch, registerEntity, execEntity }), [state]);
  return <KernelCtx.Provider value={api}>{children}</KernelCtx.Provider>;
};

export const useKernel = (): KernelAPI => {
  const ctx = useContext(KernelCtx);
  if (!ctx) throw new Error("Kernel not available");
  return ctx;
};
