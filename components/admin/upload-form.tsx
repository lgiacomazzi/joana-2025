"use client";

import Image from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function UploadForm() {
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [imageUrlError, setImageUrlError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    dimensions: "",
    description: "",
    category: "painting",
    year: new Date().getFullYear(),
    imageUrl: "",
  });

  const extractGoogleDriveFileId = (url: string): string | null => {
    const match = url.match(/(?:\/d\/|id=)([a-zA-Z0-9_-]{25,})/);
    return match ? match[1] : null;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "imageUrl") {
      const isValidDriveUrl = /(?:\/d\/|id=)[\w-]{25,}/.test(value);
      // console.log(isValidDriveUrl);
      if (isValidDriveUrl) {
        // Extract the FILE_ID from the Google Drive link
        const fileId = extractGoogleDriveFileId(value);
        // seta variavel com a URL
        setImagePreviewUrl(`https://drive.google.com/uc?id=${fileId}`);
        setImageUrlError("");
      } else {
        setImagePreviewUrl("");
        setImageUrlError("Insira um link válido do Google Drive.");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here, you can handle the form submission, for example, by sending formData to an API or saving it locally.
    console.log(formData);
  };

  return (
    <div className="flex m-auto justify-center gap-4">
      <form
        onSubmit={handleSubmit}
        className="w-full text-xs p-4 border border-[--border-color-default] rounded-md max-w-[400px]"
      >
        {/* Title */}
        <div className="flex flex-col mb-4">
          <label htmlFor="title" className="mb-2 font-bold">
            Título da Obra
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="bg-[--background-default] border-[--border-color-default] border p-2 rounded-md"
            value={formData.title}
            onChange={handleChange}
            placeholder="Nova Obra"
            required
          />
        </div>

        {/* Dimensions */}
        <div className="flex flex-col mb-4">
          <label htmlFor="dimensions" className="mb-2 font-bold">
            Dimensões
          </label>
          <input
            type="text"
            id="dimensions"
            name="dimensions"
            className="bg-[--background-default] border-[--border-color-default] border p-2 rounded-md"
            value={formData.dimensions}
            placeholder="100x100cm"
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col mb-4">
          <label htmlFor="description" className="mb-2 font-bold">
            Descrição
          </label>
          <textarea
            id="description"
            name="description"
            className="bg-[--background-default] border-[--border-color-default] border p-2 rounded-md"
            value={formData.description}
            onChange={handleChange}
            placeholder="Tinta acrílica sobre canvas"
            required
          ></textarea>
        </div>

        {/* Category */}
        <div className="flex flex-col mb-4">
          <label htmlFor="category" className="mb-2 font-bold">
            Categoria
          </label>
          <select
            id="category"
            name="category"
            className="bg-[--background-default] border-[--border-color-default] border p-2 rounded-md"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="painting">Pinturas</option>
            <option value="drawing">Desenhos</option>
            <option value="digital">Arte Digital</option>
            <option value="illustration">Ilustrações</option>
            <option value="collage">Colagens</option>
          </select>
        </div>

        {/* Year */}
        <div className="flex flex-col mb-4">
          <label htmlFor="year" className="mb-2 font-bold">
            Ano
          </label>
          <input
            type="number"
            id="year"
            name="year"
            className="bg-[--background-default] border-[--border-color-default] border p-2 rounded-md"
            value={formData.year}
            onChange={handleChange}
            placeholder="0000"
            required
          />
        </div>

        {/* Image URL */}
        <div className="flex flex-col mb-4">
          <label htmlFor="imageUrl" className="font-bold">
            Image URL (Google Drive)
          </label>
          <p className="text-[--foreground-secondary] mb-2 ">
            Colar o link da imagem no Google Drive.
          </p>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            className={twMerge(
              "bg-[--background-default] border-[--border-color-default] border p-2 rounded-md",
              imageUrlError && "border-red-500"
            )}
            value={formData.imageUrl}
            placeholder="https://drive.google.com/file/d/..."
            onChange={handleChange}
            required
          />
          {imageUrlError && (
            <p className="text-red-500 mt-2">{imageUrlError}</p>
          )}
          <div className="relative mb-4 max-w-40 max-h-40 rounded-md">
            {imagePreviewUrl ? (
              <Image
                src={imagePreviewUrl}
                alt="Preview"
                width={100}
                height={100}
                onError={() => console.log("erro")}
              />
            ) : (
              <div className="w-full h-full bg-[--background-disabled] flex items-center justify-center animate-pulse rounded-md" />
            )}
          </div>
        </div>

        <div className="flex flex-col mb-4">
          <button
            type="submit"
            className="flex flex-row gap-2 items-center justify-center font-bold h-10 px-4 bg-[--background-inverse] text-[--foreground-inverse] text-xs border rounded-full"
          >
            Add Art
          </button>
        </div>
      </form>
    </div>
  );
}
