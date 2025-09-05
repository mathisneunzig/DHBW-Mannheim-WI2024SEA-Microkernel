import React, { useState } from "react";
import type { PluginCtx } from "../../app/pluginRuntime";
import tommy from "./img/tommy.png";
export const KoenigseggViewerPage: React.FC<{ ctx: PluginCtx }> = ({ ctx }) => {
  const links =
    (ctx.read.entity("koenigseggLink") as {
      id: string;
      title: string;
      url: string;
    }[]) ?? [];
  const link = links[0];
  const [url, setUrl] = useState(link?.url ?? "");
  if (!link) {
    return (
      <div style={{ padding: 16 }}>ERROR: Kein Koenigsegg-Link verfügbar.</div>
    );
  }
  return (
    <div style={{ padding: 16 }}>
      {" "}
      <img
        src={tommy}
        alt="Tommy"
        style={{
          width: 300,
          height: "auto",
          borderRadius: 12,
          marginBottom: 12,
        }}
      />{" "}
      <h3>{link.title}</h3>{" "}
      <div style={{ marginBottom: 8 }}>
        {" "}
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Link ändern"
        />{" "}
        <button
          onClick={() => {
            const v = url.trim();
            if (v) {
              ctx.write.exec("koenigseggLink", "update", {
                id: link.id,
                url: v,
              });
            }
          }}
          disabled={!ctx.can("koenigseggLink.write")}
        >
          {" "}
          Speichern{" "}
        </button>{" "}
      </div>{" "}
      <div style={{ marginTop: 12 }}>
        {" "}
        <button
          onClick={() => window.open(link.url, "_blank")}
          disabled={!ctx.can("koenigseggLink.read")}
        >
          {" "}
          KATZE KATZE KATZE{" "}
        </button>{" "}
      </div>{" "}
    </div>
  );
};
