import React, { useEffect } from "react";
import { pluginManager } from "../app/pluginManager";
import { useKernel } from "../app/kernel";

export const EntitiesRegistrar: React.FC = () => {
  const kernel = useKernel();
  useEffect(() => {
    const defs = pluginManager.getProvidedEntities();
    for (const d of defs) {
      kernel.registerEntity(d.entity, d.initial, d.commands);
    }
  }, []);
  return null;
};
