import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { pluginManager } from "./app/pluginManager";
import { Home } from "./components/Home";
import { PluginRoute } from "./components/PluginRoute";
import { EntitiesRegistrar } from "./components/EntitiesRegistrar";

import.meta.glob("./plugins/**/*/index.{ts,tsx}", { eager: true });
pluginManager.finalize();

export const App: React.FC = () => {
  const [plugins, setPlugins] = useState(pluginManager.getPlugins());
  useEffect(() => setPlugins(pluginManager.getPlugins()), []);
  return (
    <Router> 
      <EntitiesRegistrar />
      <Routes>
        <Route path="/" element={<Home />} />
        {plugins.map((p) => (
          <Route key={p.id} path={p.route} element={<PluginRoute plugin={p} />} />
        ))}
      </Routes>
    </Router>
  );
};
