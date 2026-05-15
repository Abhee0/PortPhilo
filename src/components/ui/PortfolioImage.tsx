import { useState } from "react";
import { cn } from "@/src/lib/utils";

interface PortfolioImageProps {
  src: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
}

export default function PortfolioImage({ src, alt, className, onLoad }: PortfolioImageProps) {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
    if (onLoad) onLoad();
  };

  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-stroke/10", className)}>
      {/* Shimmer Placeholder */}
      <div 
        className={cn(
          "absolute inset-0 bg-stroke animate-pulse transition-opacity duration-500",
          loaded ? "opacity-0 invisible" : "opacity-100 visible"
        )} 
      />
      
      {/* Actual Image */}
      <img
        src={src}
        alt={alt}
        onLoad={handleLoad}
        className={cn(
          "w-full h-full object-cover object-center transition-all duration-[600ms] ease-out",
          !loaded ? "opacity-0 scale-105" : "opacity-100 scale-100"
        )}
      />
    </div>
  );
}
