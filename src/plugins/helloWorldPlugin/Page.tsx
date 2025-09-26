import React, { useState } from "react";
import type { PluginCtx } from "../../app/pluginRuntime";

export const HelloWorldPluginPage: React.FC<{ ctx: PluginCtx }> = ({ ctx }) => {
  const users = ctx.read.users();
  const todos = ctx.read.todos();
  const [text, setText] = useState("");


  return (
    <div style={{ padding: 16 }}>
      <h3>Hello {users[0]?.firstName ?? "World"}!</h3>

      <div style={{ marginBottom: 8 }}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Neues Todo"
        />
        <button onClick={() => { if (text.trim()) { ctx.write.addTodo(text.trim()); setText(""); } }} disabled={!ctx.can("todos.write")}>
          Hinzufügen
        </button>
      </div>

      <ul>
        {todos.map(t => (
          <li key={t.id}>
            <label>
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => ctx.write.toggleTodo(t.id)}
                disabled={!ctx.can("todos.write")}
              />
              {t.text}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
