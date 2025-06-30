"use client";

import Image from "next/image";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { CreateArt, UpdateArt } from "@/app/actions";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Art } from "@/lib/definitions";
import Spinner from "@/public/spinner.svg";

const extractGoogleDriveFileId = (url: string): string | null => {
  const match = url.match(/(?:\/d\/|id=)([a-zA-Z0-9_-]{25,})/);
  return match ? match[1] : null;
};

const defaultFormData = {
  title: "",
  dimensions: "",
  description: "",
  category: "painting",
  year: new Date().getFullYear(),
  imageUrl: "",
  is_visible: true, // Default value
  is_available: false, // Default value
  in_carousel: false, // Default value
};

export default function UploadForm({
  selectedArt,
  handleClose,
}: {
  selectedArt?: Art;
  handleClose: Dispatch<SetStateAction<boolean>>;
}) {
  const [formData, setFormData] = useState(defaultFormData);
  const [isLoading, setIsLoading] = useState(false);

  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [imageUrlError, setImageUrlError] = useState("");

  useEffect(() => {
    // If selectedArt is provided, populate the formData with its values
    setFormData({
      title: selectedArt?.title || "",
      dimensions: selectedArt?.dimensions || "",
      description: selectedArt?.description || "",
      category: selectedArt?.category || "painting",
      year: selectedArt?.year
        ? parseInt(selectedArt.year)
        : new Date().getFullYear(),
      imageUrl: selectedArt?.image_url || "",
      is_visible: selectedArt?.is_visible || false,
      is_available: selectedArt?.is_available || false,
      in_carousel: selectedArt?.in_carousel || false,
    });

    if (selectedArt?.image_url) {
      setImagePreviewUrl(selectedArt.image_url);
    }
  }, [selectedArt]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setImagePreviewUrl("");

    if (name === "imageUrl") {
      const isValidDriveUrl = /(?:\/d\/|id=)([a-zA-Z0-9_-]{25,})/.test(value);
      if (isValidDriveUrl) {
        // Extract the FILE_ID from the Google Drive link
        const fileId = extractGoogleDriveFileId(value);
        if (fileId) {
          // Set the transformed URL in formData
          const transformedUrl = `https://drive.google.com/uc?id=${fileId}`;
          setFormData({
            ...formData,
            [name]: transformedUrl,
          });
          setImagePreviewUrl(transformedUrl); // Update the preview URL
          setImageUrlError(""); // Clear any previous error
          setImageUrlError("");
        }
      } else {
        // If the URL is invalid show an error
        setFormData({
          ...formData,
          [name]: value,
        });
        setImagePreviewUrl("");
        setImageUrlError("Insira um link válido do Google Drive.");
      }
    } else {
      // For other fields, update formData normally
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleCleanForm = () => {
    setFormData(defaultFormData);
    setImagePreviewUrl("");
    setImageUrlError("");
  };

  const handleCreateArt = async () => {
    const userConfirmed = window.confirm(
      `Tem certeza que deseja adicionar a arte '` + formData.title + `'?`
    );

    if (!userConfirmed) {
      return; // Exit if the user cancels
    }

    setIsLoading(true);

    const art = {
      title: formData.title,
      dimensions: formData.dimensions,
      description: formData.description,
      category: formData.category,
      year: formData.year.toString(), // Ensure year is a string
      image_url: formData.imageUrl,
      is_visible: formData.is_visible,
      is_available: formData.is_available,
      in_carousel: formData.in_carousel,
    };

    try {
      const response = await CreateArt(art);
      if (response.success) {
        console.log("Art created successfully!");
        handleCleanForm();
      } else {
        console.error("Failed to create art:", response.error);
      }
    } catch (error) {
      console.error("Error while creating art:", error);
    } finally {
      // Set loading state to false
      setIsLoading(false);
      alert("Arte adicionada com sucesso!");
      handleClose(false);
    }
  };

  const handleSaveArt = async () => {
    const userConfirmed = window.confirm(
      "Tem certeza que deseja salvar as alterações da arte: '" +
        formData.title +
        "'?"
    );
    if (!userConfirmed) {
      return; // Exit if the user cancels
    }
    setIsLoading(true);

    const art = {
      title: formData.title,
      dimensions: formData.dimensions,
      description: formData.description,
      category: formData.category,
      year: formData.year.toString(), // Ensure year is a string
      image_url: formData.imageUrl,
      is_visible: formData.is_visible,
      is_available: formData.is_available,
      in_carousel: formData.in_carousel,
    };

    if (selectedArt) {
      try {
        const response = await UpdateArt(selectedArt.id, art);
        if (response.success) {
          console.log("Art created successfully!");
          handleCleanForm();
        } else {
          console.error("Failed to create art:", response.error);
        }
      } catch (error) {
        console.error("Error while creating art:", error);
      } finally {
        // Set loading state to false
        setIsLoading(false);
        handleClose(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedArt) {
      handleSaveArt();
    } else {
      handleCreateArt();
    }
  };

  return (
    <div className="fixed top-0 left-0 flex w-full h-full z-30 py-[--header-height] overflow-y-scroll">
      <div className="flex flex-col m-auto justify-center p-4 gap-4 bg-[--background-default] border border-[--border-color-default] rounded-lg md:w-[600px] z-30">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-[--foreground-primary] font-bold text-xl">
            {selectedArt ? "Editar Arte" : "Nova Arte"}
          </h1>
          <button onClick={() => handleClose(false)}>
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="w-full text-xs">
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
                "bg-[--background-default] border-[--border-color-default] border p-2 rounded-md placeholder:text-[--foreground-tertiary]",
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
            {imagePreviewUrl && (
              <div className="flex my-4 max-w-20 border border-[--border-color-default] rounded-md bg-[--background-disabled] overflow-hidden">
                <Image
                  src={imagePreviewUrl}
                  alt="Preview"
                  width={48}
                  height={48}
                  className="w-full h-auto"
                  onError={() => {
                    setImagePreviewUrl("");
                    setImageUrlError("Erro ao carregar a imagem.");
                  }}
                />
                {/* <Spinner className="w-6 h-6 absolute top-50" /> */}
              </div>
            )}
          </div>

          {/* Title */}
          <div className="flex flex-col mb-4">
            <label htmlFor="title" className="mb-2 font-bold">
              Título da Obra
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="bg-[--background-default] border-[--border-color-default] border p-2 rounded-md placeholder:text-[--foreground-tertiary]"
              value={formData.title}
              onChange={handleChange}
              placeholder="Nova Obra"
              required
            />
          </div>

          {/* Dimensions */}
          <div className="flex flex-col mb-4">
            <label htmlFor="dimensions" className="mb-2 font-bold">
              Dimensões (Opcional)
            </label>
            <input
              type="text"
              id="dimensions"
              name="dimensions"
              className="bg-[--background-default] border-[--border-color-default] border p-2 rounded-md placeholder:text-[--foreground-tertiary]"
              value={formData.dimensions}
              placeholder="100x100cm"
              onChange={handleChange}
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
              className="bg-[--background-default] border-[--border-color-default] border p-2 rounded-md placeholder:text-[--foreground-tertiary]"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tinta acrílica sobre canvas"
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
              className="appearance-none bg-[--background-default] border-[--border-color-default] border p-2 rounded-md placeholder:text-[--foreground-tertiary]"
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
              className="bg-[--background-default] border-[--border-color-default] border p-2 rounded-md placeholder:text-[--foreground-tertiary]"
              value={formData.year}
              onChange={handleChange}
              placeholder="0000"
              required
            />
          </div>

          {/* Boolean Fields */}
          <div className="flex flex-col mb-4">
            <label className="mb-2 font-bold">Opções</label>
            <div className="flex flex-col gap-4">
              {/* Is Visible */}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="is_visible"
                  checked={formData.is_visible}
                  onChange={(e) =>
                    setFormData({ ...formData, is_visible: e.target.checked })
                  }
                />
                Visível
              </label>

              {/* Is Available */}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="is_available"
                  checked={formData.is_available}
                  onChange={(e) =>
                    setFormData({ ...formData, is_available: e.target.checked })
                  }
                />
                Disponível para venda
              </label>

              {/* In Carousel */}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="in_carousel"
                  checked={formData.in_carousel}
                  onChange={(e) =>
                    setFormData({ ...formData, in_carousel: e.target.checked })
                  }
                />
                No carrossel
              </label>
            </div>
          </div>

          {/* Submit action */}
          <div className="flex flex-col mb-4">
            <button
              type="submit"
              className="flex flex-row gap-2 items-center justify-center h-10 px-4 
              text-sm font-bold text-[--foreground-inverse] 
              bg-[--background-inverse] rounded-full 
              disabled:bg-[--background-disabled] disabled:text-[--foreground-disabled]"
              disabled={isLoading || !formData.imageUrl || imageUrlError !== ""}
            >
              {isLoading ? (
                <Spinner className="text-[--foreground-secondary]" />
              ) : selectedArt ? (
                "Salvar"
              ) : (
                "Adicionar Arte"
              )}
            </button>
          </div>
        </form>
      </div>
      <div
        id="overlay"
        className="hidden fixed top-0 left-0 w-full h-full bg-[--background-default-blur] z-10"
        onClick={() => handleClose(false)}
      ></div>
    </div>
  );
}
