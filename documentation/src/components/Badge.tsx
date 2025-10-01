import Image, { ImageProps } from 'next/image';
import Link from 'next/link';

interface BadgeProps extends ImageProps {
    href: string;
}
const Badge = ({ src, alt, width, height, href, ...props }: BadgeProps) => {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <Image 
        src={src}
        alt={alt}
        width={width}
        height={height}
        unoptimized
        loading="eager"
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
        onError={(e) => {
          // Hide broken images gracefully
          e.currentTarget.style.display = 'none';
        }}
        {...props}
      />
    </Link>
  );
};

export default Badge;
