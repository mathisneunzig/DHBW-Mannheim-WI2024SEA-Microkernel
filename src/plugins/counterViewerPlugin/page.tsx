import React from "react";
import type { PluginCtx } from "../../app/pluginRuntime";

export const CounterViewerPage: React.FC<{ ctx: PluginCtx }> = ({ ctx }) => {
  const counter = (ctx.read.entity("counter") as number) ?? 0;

  return (
    <div style={{ padding: 16 }}>
      <h3>Counter: {counter}</h3>
      <button
        onClick={() => ctx.write.exec("counter", "increment", {})}
        disabled={!ctx.can("counter.write")}
      >
        + Increment
      </button>
      <button
        onClick={() => ctx.write.exec("counter", "decrement", {})}
        disabled={!ctx.can("counter.write")}
        style={{ marginLeft: 8 }}
      >
        - Decrement
      </button>
      <button
        onClick={() => ctx.write.exec("counter", "reset", {})}
        disabled={!ctx.can("counter.write")}
        style={{ marginLeft: 8 }}
      >
        Reset
      </button>
    </div>
  );
};
