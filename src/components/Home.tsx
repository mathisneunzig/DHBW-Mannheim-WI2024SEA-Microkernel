import React from "react";
import { pluginManager } from "../app/pluginManager";
import { Link as RouterLink } from "react-router-dom";

export const Home: React.FC = () => {
  const plugins = pluginManager.getVisiblePlugins();
  const invalids = pluginManager.getInvalidPlugins();

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ textAlign: "center" }}>Microkernel Home</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px,1fr))", gap: 16 }}>
        {plugins.map((plugin) => (
          <RouterLink key={plugin.id} to={plugin.route} style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{
              position: "relative",
              width: "100%",
              paddingTop: "100%",
              background: `linear-gradient(${plugin.spin}deg, ${plugin.color1}, ${plugin.color2})`,
              borderRadius: 12,
              boxShadow: "0 2px 10px rgba(0,0,0,0.15)"
            }}>
              <div style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600
              }}>
                {plugin.tile}
              </div>
            </div>
          </RouterLink>
        ))}
      </div>

      {invalids.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Fehlerhafte Plugins</div>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {invalids.map(iv => (
              <li key={iv.id}>
                <span style={{ fontWeight: 600 }}>{iv.id}</span>: {iv.errors.join("; ")}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
