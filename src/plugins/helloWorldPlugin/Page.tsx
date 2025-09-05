import React from "react";
import type { PluginCtx } from "../../app/pluginRuntime";

export const HelloWorldPluginPage: React.FC<{ ctx: PluginCtx }> = ({ ctx }) => {
  const users = ctx.read.users();             

  return (
    <div>
      <h2>Hello {users[0]?.firstName ?? "World"}!</h2>
    </div>
  );
};
