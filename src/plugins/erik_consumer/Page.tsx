import React, { useState } from "react";
import type { PluginCtx } from "../../app/pluginRuntime";
import ChartComponent from "./ChartComponent";

export const ExpensePage: React.FC<{ ctx: PluginCtx }> = ({ ctx }) => {
  const expenses =
    (ctx.read.entity("expenses") as {
      id: string;
      value: number;
      month: string;
    }[]) ?? [];
  const [expense, setExpense] = useState<number>();
  const [month, setMonth] = useState("Jan");

  return (
    <div
      style={{
        padding: 16,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Expenses</h1>
      <div
        style={{
          marginBottom: 8,
          display: "flex",
          flexDirection: "row",
          gap: "8px",
        }}
      >
        <span>€</span>
        <input
          value={expense}
          onChange={(e) => {
            const input = e.target.value.replace(",", ".");
            setExpense(Number(input));
          }}
          placeholder="New Expense"
        />
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          <option value="Jan">January</option>
          <option value="Feb">February</option>
          <option value="Mar">March</option>
          <option value="Apr">April</option>
          <option value="May">May</option>
          <option value="Jun">June</option>
          <option value="Jul">July</option>
          <option value="Aug">August</option>
          <option value="Sep">September</option>
          <option value="Oct">October</option>
          <option value="Nov">November</option>
          <option value="Dec">December</option>
        </select>
        <button
          onClick={() => {
            const e = expense;
            const m = month;
            if (e && m) {
              ctx.write.exec("expenses", "add", { value: e, month: m });
              setExpense(0);
            }
          }}
          disabled={!ctx.can("expenses.write")}
        >
          Add
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3>Monthly Expenses</h3>
          <div style={{ minWidth: "700px", minHeight: "500px" }}>
            <ChartComponent data={expenses} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3>List</h3>
          <ul>
            {expenses
              .filter((n) => n.value > 0)
              .map((n) => (
                <li
                  key={n.id}
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <span>{n.value}€, </span>
                  <span>Month: {n.month}</span>
                </li>
              ))}
          </ul>
          {expenses.length === 0 && <div>No Expenses</div>}
          <button
            onClick={() => ctx.write.exec("expenses", "reset", {})}
            disabled={!ctx.can("expenses.write")}
          >
            Reset
          </button>
        </div>
      </div>
      <h5>Disclaimer: Please do not enter decimal numbers</h5>
    </div>
  );
};
