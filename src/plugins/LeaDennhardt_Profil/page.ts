import React, { useState } from "react";

export default function Profil() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

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

  return React.createElement('div', { className: 'p-6' },
    React.createElement('h1', { className: 'text-2xl font-bold text-darkolivegreen' }, 'Profil'),
    React.createElement('p', { className: 'mt-2 text-gray-700' },
      'Willkommen in deinem Profilbereich. Hier kannst du deine Daten verwalten und dein Profilbild ändern.'
    ),
    
    React.createElement('div', { className: 'mt-6' },
      React.createElement('h2', { className: 'text-lg font-semibold mb-4' }, 'Profilbild'),
      
      React.createElement('div', {
        className: 'relative inline-block',
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false)
      },
        React.createElement('div', {
          className: 'w-32 h-32 rounded-full border-4 border-darkolivegreen overflow-hidden bg-antiquewhite flex items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-lg',
          style: {
            backgroundImage: profileImage ? `url(${profileImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }
        },
          !profileImage && React.createElement('div', { className: 'text-center text-darkolivegreen' },
            React.createElement('div', { className: 'text-3xl mb-1' }, '👤'),
            React.createElement('div', { className: 'text-xs' }, 'Bild hinzufügen')
          ),
          
          isHovered && profileImage && React.createElement('div', {
            className: 'absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center'
          },
            React.createElement('span', { className: 'text-white text-sm' }, 'Ändern')
          )
        ),
        
        React.createElement('input', {
          type: 'file',
          accept: 'image/*',
          onChange: handleImageUpload,
          className: 'absolute inset-0 w-full h-full opacity-0 cursor-pointer'
        })
      ),
      
      React.createElement('div', { className: 'mt-4 space-x-2' },
        React.createElement('label', {
          className: 'inline-block bg-darkolivegreen text-white px-4 py-2 rounded cursor-pointer hover:bg-opacity-80 transition-colors'
        },
          'Bild hochladen',
          React.createElement('input', {
            type: 'file',
            accept: 'image/*',
            onChange: handleImageUpload,
            className: 'hidden'
          })
        ),
        
        profileImage && React.createElement('button', {
          onClick: removeImage,
          className: 'bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors'
        }, 'Bild entfernen')
      ),
      
      React.createElement('p', { className: 'mt-2 text-sm text-gray-600' },
        'Unterstützte Formate: JPG, PNG, GIF (max. 5MB)'
      )
    )
  );
}
