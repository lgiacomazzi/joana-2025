"use client";

import { useState } from "react";
import Image from "next/image";
import { Art } from "@/lib/definitions";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

function ProcessedImage({ art }: { art: Art }) {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div className="relative">
      {hasError ? (
        <div className="bg-[--background-disabled] min-h-[200px] flex items-center justify-center">
          <ExclamationCircleIcon className="h-6 w-6 text-[--foreground-tertiary]" />
        </div>
      ) : (
        <Image
          className="w-full"
          src={art.image_url}
          alt={art.title}
          width={400}
          height={400}
          onLoad={handleLoadingComplete}
          onError={handleError}
          style={{
            opacity: loading ? 0 : 1,
            scale: loading ? 0.95 : 1,
            transition: ".4s",
          }}
        />
      )}
      {loading && (
        <div className="absolute inset-0 bg-[--background-disabled] animate-pulse -z-10" />
      )}
    </div>
  );
}

export default ProcessedImage;
