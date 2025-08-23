import Image, { ImageProps } from "next/image";

type SafeImageProps = Omit<ImageProps, "src"> & {
  src: string;
  alt: string;
};

function SafeImage({ src, alt, ...props }: SafeImageProps) {
  const cleanSrc = src.split("?")[0];
  return (
    <Image
      src={cleanSrc}
      alt={alt}
      {...props}
    />
  );
}

export default SafeImage;
