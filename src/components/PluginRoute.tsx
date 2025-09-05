import React from "react";
import type { Plugin } from "../app/pluginManager";
import { withPluginRuntime } from "../app/pluginRuntime";

export const PluginRoute: React.FC<{ plugin: Plugin }> = ({ plugin }) => {
  const Wrapped = React.useMemo(
    () => withPluginRuntime(plugin, plugin.component),
    [plugin]
  );
  return <Wrapped />;
};