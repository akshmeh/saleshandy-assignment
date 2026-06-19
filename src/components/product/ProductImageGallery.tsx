import { useState, useEffect } from 'react';

interface ProductImageGalleryProps {
  images: string[];
  name: string;
}

export default function ProductImageGallery({ images, name }: ProductImageGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    setActiveIdx(0);
  }, [images]);

  return (
    <div className="flex flex-col gap-4">
      
      <div className="relative aspect-square w-full bg-brand-muted-bg rounded-primary overflow-hidden border border-brand-border flex items-center justify-center">
        <img
          src={images[activeIdx] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'}
          alt={`${name} perspective view ${activeIdx + 1}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-all duration-300"
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
          {images.map((src, idx) => (
            <button
              key={`${src}_${idx}`}
              id={`thumb-btn-${idx}`}
              onClick={() => setActiveIdx(idx)}
              className={`aspect-square rounded-card overflow-hidden bg-brand-muted-bg border transition-all cursor-pointer ${
                activeIdx === idx 
                  ? 'border-brand-blue ring-2 ring-brand-blue/10 bg-white scale-95' 
                  : 'border-brand-border hover:border-text-fg/20 hover:scale-[1.02]'
              }`}
            >
              <img 
                src={src} 
                alt={`${name} thumbnail ${idx + 1}`} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover" 
              />
            </button>
          ))}
        </div>
      )}

    </div>
  );
}
