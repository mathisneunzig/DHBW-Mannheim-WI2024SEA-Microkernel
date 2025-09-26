import React, { useEffect, useState } from "react";
import type { PluginCtx } from "../../app/pluginRuntime";

export const ASCIIPlayerPage: React.FC<{ ctx: PluginCtx }> = ({ ctx }) => {
  const frames = (ctx.read.entity("ASCIIs") as { id: string; frame: string }[]) ?? [];
  const [speed, setSpeed] = useState(1); // 0 = Pause, 1 = langsam, 2 = schnell
  const [frameIndex, setFrameIndex] = useState(0);
  const [newFrame, setNewFrame] = useState("");

  useEffect(() => {
    if (speed === 0 || frames.length === 0) return;

    const interval = setInterval(
      () => {
        setFrameIndex((prev) => (prev + 1) % frames.length);
      },
      speed === 1 ? 1000 : 300
    );

    return () => clearInterval(interval);
  }, [speed, frames]);

  return (
    <div
      style={{
        fontFamily: "monospace",
        whiteSpace: "pre",
        padding: "1em",
        background: "#111",
        color: "#0f0",
      }}
    >
      <div>{frames[frameIndex]?.frame ?? "No frames loaded."}</div>
      <div style={{ marginTop: "1em" }}>
        <button onClick={() => setSpeed(0)}>&lt; Pause</button>
        <button onClick={() => setSpeed(1)}>| Langsam</button>
        <button onClick={() => setSpeed(2)}>&gt; Schnell</button>
      </div>
      <div style={{ marginTop: "1em" }}>
        <textarea
          rows={4}
          cols={40}
          placeholder="Neuen Frame hier eingeben..."
          onChange={(e) => setNewFrame(e.target.value)}
          style={{ fontFamily: "monospace"}}
        ></textarea>
        <button onClick={() => {
          const f = newFrame.trim();
          if (f) {
            ctx.write.exec("ASCIIs", "addFrame", { frame: f });
            setNewFrame("");
          }
        }}>Frame hinzufügen</button>
      </div>  
      <div style={{ marginTop: "1em" }}>
        <h4>Frames ({frames.length})</h4>
        <ul>
          {frames.map((f) => (
            <li key={f.id}>
              <pre style={{ display: "inline", marginRight: "1em" }}>{f.frame}</pre>
              <button onClick={() => ctx.write.exec("ASCIIs", "removeFrame", { id: f.id })}>Löschen</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
