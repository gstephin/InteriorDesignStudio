import React, { useState, useRef } from 'react';
import { 
  PlaceholderImage1, 
  PlaceholderImage2, 
  PlaceholderImage3,
  PlaceholderImage4,
  PlaceholderImage5,
  PlaceholderImage6,
  PlaceholderImage7,
  PlaceholderImage8,
  PlaceholderImage9
} from './portfolio-placeholders';

// Replace with your own images through the admin interface
const IMAGE_MAP: Record<number, React.FC> = {
  1: PlaceholderImage1,
  2: PlaceholderImage2,
  3: PlaceholderImage3,
  4: PlaceholderImage4,
  5: PlaceholderImage5,
  6: PlaceholderImage6,
  7: PlaceholderImage7,
  8: PlaceholderImage8,
  9: PlaceholderImage9
};

// This will store base64 encoded uploaded images
const UPLOADED_IMAGES: Record<number, string> = {};

interface PortfolioItemProps {
  id: number;
  altText: string;
}

export function PortfolioItem({ id, altText }: PortfolioItemProps) {
  // If we have an uploaded image for this ID, show that instead of the placeholder
  if (UPLOADED_IMAGES[id]) {
    return (
      <div className="w-full h-full">
        <img 
          src={UPLOADED_IMAGES[id]} 
          alt={altText} 
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  // Otherwise show the placeholder
  const Placeholder = IMAGE_MAP[id];
  return <Placeholder />;
}

interface PortfolioUploaderProps {
  isAdmin?: boolean;
}

export function PortfolioUploader({ isAdmin = false }: PortfolioUploaderProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isAdmin) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedId || !e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Store the uploaded image
      UPLOADED_IMAGES[selectedId] = base64String;
      // Reset selection
      setSelectedId(null);
      // Force a re-render
      window.location.reload();
    };
    
    reader.readAsDataURL(file);
  };

  const promptUpload = (id: number) => {
    setSelectedId(id);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white p-4 rounded-lg shadow-xl">
      <h3 className="text-lg font-semibold mb-2">Portfolio Admin</h3>
      <p className="text-sm mb-3">Select an image to upload:</p>
      
      <div className="grid grid-cols-3 gap-2 mb-3">
        {Object.keys(IMAGE_MAP).map(idStr => {
          const id = parseInt(idStr);
          return (
            <button 
              key={id}
              onClick={() => promptUpload(id)}
              className={`p-2 text-xs rounded ${
                UPLOADED_IMAGES[id] 
                  ? 'bg-green-100 hover:bg-green-200' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Image {id} {UPLOADED_IMAGES[id] ? '✓' : ''}
            </button>
          );
        })}
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}