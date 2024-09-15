"use client";

import { useState } from "react";
import Image from "next/image";
import { Art } from "@/lib/definitions";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

function ProcessedImage({ art }: { art: Art }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoadingComplete = () => {
    console.log("loaded");
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  if (!art.image_url || hasError) {
    // If the src is undefined or there was an error loading the image, show an error message
    return (
      <div className="bg-zinc-900 min-h-[300px] flex items-center justify-center">
        <ExclamationCircleIcon className="h-6 w-6" />
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 min-h-10">
      <Image
        src={art.image_url}
        alt={art.title}
        width={400}
        height={400}
        onLoadingComplete={handleLoadingComplete}
        onError={handleError}
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      />
    </div>
  );
}

export default ProcessedImage;
