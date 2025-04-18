import React, { useState, useRef, ChangeEvent } from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  value?: string | null;
  onChange: (file: File | null) => void;
  label?: string;
  error?: string;
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  label = 'Upload Image',
  error,
  className = '',
}) => {
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      onChange(file);
    } else {
      setPreview(null);
      onChange(null);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <div className="flex items-center space-x-4">
        <div 
          className={`flex-shrink-0 h-32 w-32 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer ${
            preview ? 'border-transparent' : 'border-gray-300 hover:border-gray-400'
          }`}
          onClick={handleClick}
        >
          {preview ? (
            <div className="relative h-full w-full">
              <img 
                src={preview} 
                alt="Preview" 
                className="h-full w-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveImage();
                }}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="text-center">
              <Upload className="mx-auto h-8 w-8 text-gray-400" />
              <p className="mt-1 text-xs text-gray-500">Click to upload</p>
            </div>
          )}
        </div>
        
        <div className="text-sm text-gray-500">
          <p>Upload a featured image for your blog post.</p>
          <p className="mt-1">Recommended size: 1200x630 pixels</p>
        </div>
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}; 