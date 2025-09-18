import React, { useState } from "react";

export default function Profil() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false); //vielleicht entfernen

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
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

return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-darkolivegreen">Profil</h1>
      <p className="mt-2 text-gray-700">
        Willkommen in der Microkernel Welt. Erstelle dir hier dein eigenes Profil und erkunde die Microkernels! 🧑🏻‍🚀
      </p>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Profilbild</h2>

        <div
          className="relative inline-block"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="w-32 h-32 rounded-full border-4 border-darkolivegreen overflow-hidden bg-antiquewhite flex items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-lg"
            style={{
              backgroundImage: profileImage ? `url(${profileImage})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {!profileImage && (
              <div className="text-center text-darkolivegreen">
                <div className="text-3xl mb-1">👤</div>
                <div className="text-xs">Bild hinzufügen</div>
              </div>
            )}

            {isHovered && profileImage && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">Ändern</span>
              </div>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>


        <div className="mt-4 space-x-2">
          <label className="bg-darkolivegreen text-white px-4 py-2 rounded cursor-pointer hover:bg-opacity-80">
            Bild hochladen
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden" />
          </label>

          {/* <label className="inline-block bg-darkolivegreen text-white px-4 py-2 rounded cursor-pointer hover:bg-opacity-80 transition-colors">
            Bild hochladen
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>*/}

          {profileImage && (
            <button
              onClick={removeImage}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Bild entfernen
            </button>
          )}
        </div>

        <p className="mt-2 text-sm text-gray-600">
          Unterstützte Formate: JPG, PNG, GIF (max. 5MB)
        </p>
      </div>
    </div>
  );
}
