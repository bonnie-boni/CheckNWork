import React, { useState, useRef } from 'react';

const uploadImage = ({ onImageChange }) => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const resizeImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > 800) {
            width = 800;
            height = img.height * (800 / img.width);
          }

          if (height > 600) {
            height = 600;
            width = img.width * (600 / img.height);
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          let quality = 0.9;
          let dataUrl = canvas.toDataURL('image/jpeg', quality);
          let fileSize = dataUrl.length * (3/4) - (dataUrl.match(/==/g) || []).length; // Approximate file size in bytes

          while (fileSize > 50000 && quality > 0.1) {
            quality -= 0.1;
            dataUrl = canvas.toDataURL('image/jpeg', quality);
            fileSize = dataUrl.length * (3/4) - (dataUrl.match(/==/g) || []).length;
            console.log('Quality:', quality, 'File size:', fileSize);
          }

          console.log('Original width:', img.width, 'Original height:', img.height);
          console.log('Resized width:', width, 'Resized height:', height);
          console.log('Data URL length:', dataUrl.length);
          resolve(dataUrl);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.substring(0, 5) === "image") {
      const resizedImage = await resizeImage(file);
      setImage(file);
      setPreviewUrl(resizedImage);
      if (onImageChange) {
        onImageChange(resizedImage);
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.substring(0, 5) === "image") {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div >
      <h2> Post A Job </h2>
      
      <div 
        className="card-image"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {previewUrl ? (
          <img 
            src={previewUrl} 
            alt="Profile preview" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="image-icon">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <p>Drag & drop or click to upload</p>
          </div>
        )}
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />

      <button type='file' onClick={handleButtonClick} >
        {previewUrl ? 'Change Photo' : 'Upload Photo'}
      </button>
    </div>
  );
};

export default uploadImage;
