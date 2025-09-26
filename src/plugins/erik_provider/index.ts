import { pluginManager } from "../../app/pluginManager";
import { Expense } from "./types";

pluginManager.register({
  id: "expensesProvider",
  route: "/expensesProvider",
  component: () => null,
  tile: "Expenses Provider",
  color1: "#123",
  color2: "#000",
  spin: 45,
  permissions: ["expenses.read", "expenses.write"],
  provides: [
    {
      entity: "expenses",
      initial: [] as Expense[],
      commands: {
        add: (state, payload: any) => {
          const expense_list = Array.isArray(state)
            ? (state as { id: string; value: number; month: string }[])
            : [];
          const value = payload?.value;
          const month = String(payload?.month ?? "");
          if (!value || !month) return expense_list;
          return [...expense_list, { id: crypto.randomUUID(), value, month }];
        },
        reset: (state, payload: any) => {
          let expense_list = Array.isArray(state)
            ? (state as { id: string; value: number; month: string }[])
            : [];
          expense_list = [];
          return expense_list;
        },
      },
    },
  ],
});
