function ASCIIPlayer() {
  const frames = useEntity("ASCIIs") ?? [];
  const [speed, setSpeed] = useState(1); // 0 = Pause, 1 = langsam, 2 = schnell
  const [frameIndex, setFrameIndex] = useState(0);

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
    </div>
  );
}
