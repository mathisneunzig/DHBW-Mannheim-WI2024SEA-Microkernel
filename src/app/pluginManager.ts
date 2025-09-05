import type React from "react";
import type { Permission } from "./kernel";
import type { PluginCtx } from "./pluginRuntime";

export interface Plugin {
  id: string;
  route: string;
  component: React.FC<{ ctx: PluginCtx }>; 
  tile: string;
  color1: string;
  color2: string;
  spin: number;
  permissions: Permission[];
}

class PluginManager {
  private plugins: Plugin[] = [];
  private invalid: { id: string; errors: string[] }[] = [];

  register(plugin: Plugin) {
    if (this.plugins.some(p => p.id === plugin.id)) return;

    const errors: string[] = [];
    if (!plugin.permissions?.length) errors.push("Keine Berechtigungen deklariert (permissions).");
    if (!plugin.id || !plugin.route || !plugin.component || !plugin.tile) {
      errors.push("Pflichtfelder fehlen (id/route/component/tile).");
    }
    
    const valid = new Set(["users","shoppingList","profileImage","todos"]);
    for (const perm of plugin.permissions ?? []) {
      const [prefix, rw] = perm.split(".");
      if (!valid.has(prefix) || (rw !== "read" && rw !== "write")) {
        errors.push(`Ungültige Permission: "${perm}"`);
      }
    }

    if (errors.length) { this.invalid.push({ id: plugin.id ?? "(unbekannt)", errors }); return; }
    this.plugins.push(plugin);
  }

  getPlugins() { return this.plugins; }
  getInvalidPlugins() { return this.invalid; }
}

export const pluginManager = new PluginManager();