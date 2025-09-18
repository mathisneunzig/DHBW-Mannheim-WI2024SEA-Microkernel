import React, { useState } from "react";
import type { PluginCtx } from "../../app/pluginRuntime";

type TodoItem = { id: string; text: string; done?: boolean };

export const ToDoViewerPage: React.FC<{ ctx: PluginCtx }> = ({ ctx }) => {
  const todos = (ctx.read.entity("toDo") as TodoItem[]) ?? [];
  const [text, setText] = useState("");

  const addTodo = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    ctx.write.exec("toDo", "add", { text: trimmed });
    setText("");
  };

  const toggleDone = (id: string) => ctx.write.exec("toDo", "check", { id });

  return (
    <div style={{ padding: 16, width: "80%", margin: "0 auto", maxWidth: 1200 }}>
      <h3>ToDo 🐱</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {todos.map((todo) => (
          <div
            key={todo.id}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <div
              onClick={() => toggleDone(todo.id)}
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                border: "2px solid gray",
                cursor: ctx.can("toDo.write") ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: todo.done ? "#00ff26ff" : "transparent",
                color: "white",
                fontSize: 14,
                lineHeight: 1,
              }}
              title={todo.done ? "Erledigt" : "Als erledigt markieren"}
            >
              {todo.done ? "🐾" : ""}
            </div>
            <span
              style={{
                flex: 1,
                textDecoration: todo.done ? "line-through" : "none",
                overflowWrap: "break-word",
                wordBreak: "break-word",
              }}
            >
              {todo.text}
            </span>
          </div>
        ))}

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              border: "2px solid lightgray",
            }}
          />
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="Neues ToDo"
            style={{ flex: 1 }}
          />
        </div>
      </div>
    </div>
  );
};