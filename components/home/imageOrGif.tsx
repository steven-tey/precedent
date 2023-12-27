import React from 'react';

interface ImageOrGifProps {
  src: string;
  alt?: string;
}

const ImageOrGif: React.FC<ImageOrGifProps> = ({ src, alt = 'Image or gif' }) => {
  return (
    <img 
      src={src} 
      alt={alt} 
      style={{
        width: '100%', // Full width of the card
        height: '100%', // Full height of the card
        objectFit: 'cover', // Cover the entire area of the card
        borderRadius: 'inherit' // If the card has rounded corners
      }} 
    />
  );
};

export default ImageOrGif;
