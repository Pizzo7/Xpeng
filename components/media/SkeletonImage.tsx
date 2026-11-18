"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/Skeleton";

type SkeletonImageProps = Omit<ImageProps, "onLoad" | "onError" | "unoptimized"> & {
  /** Extra class on the outer fill wrapper when using fill */
  wrapperClassName?: string;
  /** Keep skeleton visible until the first paint of the image */
  skeletonClassName?: string;
};

/**
 * next/image with a shimmer skeleton until load completes.
 * Defaults to lazy loading unless priority is set.
 */
export function SkeletonImage({
  className = "",
  wrapperClassName = "",
  skeletonClassName = "",
  alt,
  fill,
  priority = false,
  quality = 75,
  sizes,
  src,
  ...props
}: SkeletonImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [useRaw, setUseRaw] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setFailed(false);
    setUseRaw(false);
  }, [src]);

  const image = (
    <Image
      {...props}
      src={src}
      alt={alt}
      fill={fill}
      priority={priority}
      quality={quality}
      sizes={sizes ?? (fill ? "100vw" : undefined)}
      loading={priority ? undefined : "lazy"}
      decoding="async"
      unoptimized={useRaw}
      onLoad={() => setLoaded(true)}
      onError={() => {
        // Production optimizer can reject a file the browser can still draw.
        if (!useRaw) {
          setUseRaw(true);
          setLoaded(false);
          return;
        }
        setFailed(true);
        setLoaded(true);
      }}
      className={[className, failed ? "opacity-0" : "opacity-100"].join(" ")}
    />
  );

  if (fill) {
    return (
      <div className={["absolute inset-0", wrapperClassName].join(" ")}>
        {!loaded && !failed ? (
          <Skeleton
            className={["absolute inset-0 h-full w-full", skeletonClassName].join(
              " ",
            )}
          />
        ) : null}
        {image}
      </div>
    );
  }

  return (
    <span className={["relative inline-block", wrapperClassName].join(" ")}>
      {!loaded && !failed ? (
        <Skeleton
          className={["absolute inset-0 h-full w-full", skeletonClassName].join(
            " ",
          )}
        />
      ) : null}
      {image}
    </span>
  );
}
