import React, { useState } from "react";
import type { PluginCtx } from "../../app/pluginRuntime";

export const HelloWorldPluginPage: React.FC<{ ctx: PluginCtx }> = ({ ctx }) => {
  const users = ctx.read.users();

  return (
    <div style={{ padding: 16 }}>
      <h3>Hello {users[0]?.firstName ?? "World"}!</h3>
    </div>
  );
};
