import React, { useState , useEffect } from "react";
import type { PluginCtx } from "../../app/pluginRuntime";
import type { SpotifyData } from "../LeaDennhardt_ProviderProfil/type";


export default function Profil({ ctx }: { ctx: PluginCtx }) {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Spotify-URL aus Provider lesen
  const [catchUrl, setTrackUrl] = useState<string | null>(null);
  const [inputUrl, setInputUrl] = useState("");

  useEffect(() => {
    const data = (ctx.read as any).entity("SpotifyData") as SpotifyData[] | undefined;
    if (data && data.length > 0) {
      setTrackUrl(data[0].spotifyUrl);
      setInputUrl(data[0].spotifyUrl ?? "");
    }
  }, [ctx.read]);

  // Spotify-URL speichern 
  const SaveTrack = () => {
    if (!inputUrl.startsWith("https://open.spotify.com/embed/")) {
      alert("Bitte eine gültige Spotify Embed URL eingeben!");
      return;
    }
    ctx.write.exec("SpotifyData", "add", inputUrl);
    setTrackUrl(inputUrl);
  };

  // Profilbild hochladen
  const ImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Datei zu groß! Max. 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfileImage(null);
  };

  // Styles
  const pageStyle: React.CSSProperties = {
    padding: "24px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    padding: "24px",
    maxWidth: "400px",
    marginBottom: "16px",
  };

  const avatarContainerStyle: React.CSSProperties = {
    width: "128px",
    height: "128px",
    borderRadius: "50%",
    border: "4px solid darkolivegreen",
    overflow: "hidden",
    backgroundColor: "antiquewhite",
    position: "relative",
    margin: "0 auto",
  };

  const avatarImageStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: 500,
    marginRight: "8px",
  };

  const uploadButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: "darkolivegreen",
    color: "white",
  };

  const removeButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: "#ef4444",
    color: "white",
  };

  const saveButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: "#1DB954", // Spotify grün
    color: "white",
  };

  const spotifyStyle: React.CSSProperties = {
    borderRadius: "12px",
    width: "100%",
    height: "152px",
    border: "0",
  };

  return (
    <div style={pageStyle}>

      <div style={cardStyle}>
        <h2>Profilbild</h2>
        <div
          style={avatarContainerStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {profileImage ? (
            <img src={profileImage} alt="Profil" style={avatarImageStyle} />
          ) : (
            <div style={{ textAlign: "center", marginTop: "40px" }}>👤 Bild hinzufügen</div>
          )}
          {isHovered && profileImage && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
              }}
            >
              Ändern
            </div>
          )}
        </div>

        <div style={{ marginTop: "16px", textAlign: "center" }}>
          <label style={uploadButtonStyle}>
            Bild hochladen
            <input type="file" accept="image/*" onChange={ImageUpload} style={{ display: "none" }} />
          </label>
          {profileImage && (
            <button style={removeButtonStyle} onClick={removeImage}>
              Entfernen
            </button>
          )}
        </div>
      </div>

      <div style={cardStyle}>
        <h2>Meine Lieblingsmusik</h2>
        <div style={{ display: "flex", marginBottom: "12px" }}>
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            style={{ flex: 1, padding: "8px", border: "1px solid #ccc", borderRadius: "6px" }}
          />
          <button style={saveButtonStyle} onClick={SaveTrack}>
            Speichern
          </button>
        </div>
        {catchUrl && (
          <iframe
            style={spotifyStyle}
            src={catchUrl}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Embed"
          />
        )}
      </div>
    </div>
  );
}