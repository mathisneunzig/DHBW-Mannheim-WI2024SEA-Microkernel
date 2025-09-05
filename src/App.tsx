import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { pluginManager } from "./app/pluginManager";
import { Home } from "./components/Home";

const pluginModules = import.meta.glob("./plugins/**/*.ts", { eager: true });

export const App: React.FC = () => {
  const [plugins, setPlugins] = useState(pluginManager.getPlugins());

  useEffect(() => {
    // Falls du live-Reload unterstützen willst oder Plugins später registrierst
    setPlugins(pluginManager.getPlugins());
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {plugins.map((p) => (
          <Route key={p.id} path={p.route} element={<p.component />} />
        ))}
      </Routes>
    </Router>
  );
};
