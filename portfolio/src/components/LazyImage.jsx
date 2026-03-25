import { useEffect, useRef, useState } from "react";
import "./LazyImage.css";

export default function LazyImage({
  src,
  alt = "",
  placeholder = "",
  className = "",
  wrapperClassName = "",
}) {
  const imgRef = useRef(null);
  const [currentSrc, setCurrentSrc] = useState(placeholder || "");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    setIsInView(false);
    setCurrentSrc(placeholder || "");
  }, [src, placeholder]);

  useEffect(() => {
    const imgElement = imgRef.current;
    if (!imgElement) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        const [entry] = entries;

        if (!entry.isIntersecting) return;

        setIsInView(true);
        setCurrentSrc(src);
        obs.unobserve(entry.target);
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "200px",
      }
    );

    observer.observe(imgElement);

    return () => observer.disconnect();
  }, [src]);

  const handleLoad = () => {
    if (isInView && currentSrc === src) {
      setIsLoaded(true);
    }
  };

  return (
    <div className={`lazy-image-wrapper ${wrapperClassName}`}>
      {!isLoaded && <div className="lazy-image-skeleton" />}

      <img
        ref={imgRef}
        src={currentSrc || undefined}
        alt={alt}
        loading="lazy"
        onLoad={handleLoad}
        className={`lazy-image ${isLoaded ? "loaded" : "lazy"} ${className}`}
      />
    </div>
  );
}