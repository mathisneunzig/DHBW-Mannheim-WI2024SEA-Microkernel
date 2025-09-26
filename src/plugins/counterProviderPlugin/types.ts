import React, { useEffect } from "react";
import type { PluginCtx } from "../../app/pluginRuntime";

export const counterProvider: React.FC<{ ctx: PluginCtx }> = ({  }) => {
  useEffect(() => {
  }, []);
  return("Error 404: In dem Plugin findest du nichts :(\n Matrikelnummer: 1038455");
 

}; 