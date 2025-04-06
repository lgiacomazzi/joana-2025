"use client";

import { useState } from "react";
import Image from "next/image";
import { Art } from "@/lib/definitions";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

function ProcessedImage({ art }: { art: Art }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <>
      {hasError && (
        <div className="bg-[--background-disabled] min-h-[200px] flex items-center justify-center">
          <ExclamationCircleIcon className="h-6 w-6 text-[--foreground-tertiary]" />
        </div>
      )}
      {!hasError && (
        <Image
          src={art.image_url}
          alt={art.title}
          width={400}
          height={400}
          onLoad={handleLoadingComplete}
          onError={handleError}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 1s ease",
          }}
        />
      )}
    </>
  );
}

export default ProcessedImage;
