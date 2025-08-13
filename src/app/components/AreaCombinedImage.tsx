/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

interface AreaCombinedImageProps {
  src: string; 
  alt?: any; 
  fallbackSrc?: string;
  className?: string;
  width: number;
  height: number;
  quality?: number;
  priority?: any;
  style?: React.CSSProperties;
  zoomIn: any;
  sizes?: any;
}

const AreaCombinedImage: React.FC<AreaCombinedImageProps> = ({
  src,
  alt,
  fallbackSrc,
  className = "",
  width,
  height,
  quality,
  priority,
  zoomIn,
  sizes,
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [, setIsLoading] = useState(true);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const handleError = () => {
    if (fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <Image 
      src={imgSrc} 
      alt={alt}
      width={width} 
      height={height} 
      quality={quality}
      priority={priority}
      sizes={sizes}
      className={`w-full h-[345px] ${className} rounded-lg transition-transform duration-500 transform ${
        zoomIn ? "-translate-y-full" : "translate-y-0"
      }`}
      onLoadingComplete={() => setIsLoading(false)}
      onError={handleError} 
    />
  );
};

export default AreaCombinedImage;
