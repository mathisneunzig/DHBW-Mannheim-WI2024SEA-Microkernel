import { pluginManager } from "../../app/pluginManager";
import { ExpensePage } from "./Page";

pluginManager.register({
  id: "expensesConsumer",
  route: "/expenses",
  component: ExpensePage,
  tile: "Expense Manager",
  color1: "#8323",
  color2: "#8238",
  spin: 0,
  permissions: ["expenses.read", "expenses.write"],
  dependsOn: [
    { entity: "expenses", permissions: ["expenses.read", "expenses.write"] },
  ],
});
