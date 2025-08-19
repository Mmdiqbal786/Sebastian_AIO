'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface LogoProps {
  width?: number;
  height?: number;
  quality?: number;
  priority?: boolean;
  alt?: string;
  className?: string;
  variant?: 'default' | 'small' | 'xs' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = ({
  width = 75,
  height = 15,
  quality = 100,
  priority = true,
  alt = process.env.NEXT_PUBLIC_COMPANY_NAME || 'Company Logo',
  className,
  variant = 'small',
}) => {
  const sizeMap = {
    default: { width: 100, height: 20 },
    xs: { width: 25, height: 10 },
    small: { width: 75, height: 15 },
    medium: { width: 150, height: 50 },
    large: { width: 300, height: 300 },
  };

  const finalWidth = width || sizeMap[variant].width;
  const finalHeight = height || sizeMap[variant].height;

  const baseSrc = process.env.NEXT_PUBLIC_COMPANY_LOGO_PATH || '/logo.png';
  const [logoSrc, setLogoSrc] = useState(`${baseSrc}?v=${Date.now()}`);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogoSrc(`${baseSrc}?v=${Date.now()}`);
      setImgError(false);
    }, 30000);

    return () => clearInterval(interval);
  }, [baseSrc]);

  return (
    <Image
      width={finalWidth}
      height={finalHeight}
      quality={quality}
      priority={priority}
      src={imgError || !logoSrc ? "/logo_placeholder.png" : logoSrc}
      alt={alt}
      suppressHydrationWarning={true}
      className={className}
      onError={() => setImgError(true)}
    />
  );
};

export default Logo;