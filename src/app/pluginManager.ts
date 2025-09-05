import type React from "react";
import type { Permission } from "./kernel";
import type { PluginCtx } from "./pluginRuntime";

export type EntityPermission = `${string}.read` | `${string}.write`;

export interface ProvidedEntity {
  entity: string;
  initial: unknown;
  commands: Record<string, (state: unknown, payload: unknown) => unknown>;
}

export interface Dependency {
  entity: string;
  permissions: EntityPermission[];
  optional?: boolean;
}

export interface Plugin {
  id: string;
  route: string;
  component: React.FC<{ ctx: PluginCtx }>;
  tile: string;
  color1: string;
  color2: string;
  spin: number;
  permissions: (Permission | EntityPermission)[];
  provides?: ProvidedEntity[];
  dependsOn?: Dependency[];
}

type Invalid = { id: string; errors: string[] };

function isHeadless(comp: React.FC<any>): boolean {
  const s = String(comp);
  return /^\(\)\s*=>\s*null\s*$/m.test(s) || /\breturn\s+null\b/.test(s);
}

export class PluginManager {
  private plugins: Plugin[] = [];
  private invalid: Invalid[] = [];
  private provided = new Map<string, { by: string; def: ProvidedEntity }>();
  private finalized = false;
  private headless = new Set<string>();

  register(plugin: Plugin) {
    if (this.plugins.some(p => p.id === plugin.id)) return;
    const errors: string[] = [];
    if (!plugin.id || !plugin.route || !plugin.component || !plugin.tile) errors.push("Pflichtfelder fehlen (id/route/component/tile).");
    if (!plugin.permissions?.length) errors.push("Keine Berechtigungen deklariert (permissions).");
    for (const perm of plugin.permissions ?? []) {
      const parts = String(perm).split(".");
      if (parts.length !== 2 || (parts[1] !== "read" && parts[1] !== "write")) {
        errors.push(`Ungültige Permission: ${perm}`);
      }
    }
    for (const e of plugin.provides ?? []) {
      if (!/^[a-z][a-z0-9_]*$/i.test(e.entity)) errors.push(`Ungültiger Entity-Name: ${e.entity}`);
      if (this.provided.has(e.entity)) errors.push(`Entity-Kollision: ${e.entity}`);
    }
    if (errors.length) { this.invalid.push({ id: plugin.id, errors }); return; }
    for (const e of plugin.provides ?? []) {
      this.provided.set(e.entity, { by: plugin.id, def: e });
    }
    if (isHeadless(plugin.component)) this.headless.add(plugin.id);
    this.plugins.push(plugin);
  }

  finalize() {
    if (this.finalized) return;
    this.finalized = true;
    const invalidIds = new Set(this.invalid.map(i => i.id));
    for (const p of this.plugins) {
      const errs: string[] = [];
      for (const dep of p.dependsOn ?? []) {
        const prov = this.provided.get(dep.entity);
        if (!prov) {
          if (dep.optional) continue;
          errs.push(`Fehlender Provider für Entity: ${dep.entity}`);
          continue;
        }
        if (invalidIds.has(prov.by)) errs.push(`Dependency-Provider fehlerhaft: ${dep.entity} von ${prov.by}`);
        for (const perm of dep.permissions) {
          const need = String(perm);
          if (!p.permissions.includes(need as any)) errs.push(`Fehlende Permission im Plugin: ${need}`);
        }
      }
      for (const perm of p.permissions) {
        const [entity] = String(perm).split(".");
        const isBuiltin = entity === "users" || entity === "shoppingList" || entity === "profileImage" || entity === "todos";
        if (!isBuiltin) {
          if (!this.provided.get(entity)) errs.push(`Permission auf unbekannte Entity: ${perm}`);
        }
      }
      if (errs.length) this.invalid.push({ id: p.id, errors: errs });
    }
    const stillValid = this.plugins.filter(p => !this.invalid.find(i => i.id === p.id));
    this.plugins = stillValid;
  }

  getPlugins() { return this.plugins; }
  getVisiblePlugins() { return this.plugins.filter(p => !this.headless.has(p.id)); }
  getInvalidPlugins() { return this.invalid; }
  getProvidedEntities(): Array<{ entity: string; initial: unknown; commands: Record<string, (state: unknown, payload: unknown) => unknown> }> {
    return Array.from(this.provided.values()).map(v => ({ entity: v.def.entity, initial: v.def.initial, commands: v.def.commands }));
  }
}

export const pluginManager = new PluginManager();
