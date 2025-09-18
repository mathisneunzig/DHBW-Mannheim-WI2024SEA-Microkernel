import React, { useState } from "react";

export default function Profil() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const headingStyle: React.CSSProperties = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "darkolivegreen",
    marginBottom: "8px",
  };

  const textStyle: React.CSSProperties = {
    color: "#4b5563", // grau
    marginBottom: "16px",
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    padding: "24px",
    maxWidth: "400px",
  };

  const subHeadingStyle: React.CSSProperties = {
    fontSize: "18px",
    fontWeight: 600,
    color: "darkolivegreen",
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
    display: "block",
  };

  const overlayStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    fontSize: "14px",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: 500,
  };

  const uploadButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: "darkolivegreen",
    color: "white",
  };

  const removeButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: "#ef4444", // rot
    color: "white",
  };

  const infoTextStyle: React.CSSProperties = {
    fontSize: "12px",
    color: "#6b7280",
    textAlign: "center",
    marginTop: "12px",
  };

  return (
    <div style={pageStyle}>
      <h1 style={headingStyle}>Profil</h1>
      <p style={textStyle}>
        Willkommen! Erstelle hier dein Profilbild um die Welt der Microkernels zu erkunden!
      </p>

      <div style={cardStyle}>
        <h2 style={subHeadingStyle}>Profilbild</h2>

        {/* Profilbild */}
        <div
          style={avatarContainerStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {profileImage ? (
            <img src={profileImage} alt="Profil" style={avatarImageStyle} />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "darkolivegreen",
                fontSize: "12px",
              }}
            >
              <div style={{ fontSize: "32px", marginBottom: "4px" }}>👤</div>
              <div>Bild hinzufügen</div>
            </div>
          )}

          {isHovered && profileImage && (
            <div style={overlayStyle}>Ändern</div>
          )}
        </div>

        {/* Buttons */}
        <div
          style={{
            marginTop: "24px",
            display: "flex",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <label style={uploadButtonStyle}>
            Bild hochladen
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </label>

          {profileImage && (
            <button style={removeButtonStyle} onClick={removeImage}>
              Entfernen
            </button>
          )}
        </div>

        <p style={infoTextStyle}>
          Unterstützte Formate: JPG, PNG, GIF (max. 5MB)
        </p>
      </div>
    </div>
  );
}




