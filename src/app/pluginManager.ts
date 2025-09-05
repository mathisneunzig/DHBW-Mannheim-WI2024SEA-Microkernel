export interface Plugin {
    id: string;
    route: string;
    component: React.FC;
    tile: string;
    color1: string;
    color2: string;
    spin: number;
}
  
class PluginManager {
    private plugins: Plugin[] = [];

    register(plugin: Plugin) {
      const alreadyRegistered = this.plugins.some(p => p.id === plugin.id);
      if (!alreadyRegistered) {
        this.plugins.push(plugin);
      }
    }
  
    getPlugins() {
        return this.plugins;
    }
}
  
export const pluginManager = new PluginManager();
  