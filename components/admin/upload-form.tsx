"use client";

import Image from "next/image";
import { useState } from "react";

export default function UploadForm() {
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    dimensions: "",
    description: "",
    category: "painting",
    year: "",
    imageUrl: "",
  });

  const extractGoogleDriveFileId = (url: string) => {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
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
      // Extract the FILE_ID from the Google Drive link
      const fileId = extractGoogleDriveFileId(value);
      console.log(fileId);
      if (fileId) {
        setImagePreviewUrl(`https://drive.google.com/uc?id=${fileId}`);
      } else {
        setImagePreviewUrl("");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here, you can handle the form submission, for example, by sending formData to an API or saving it locally.
    console.log(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="flex px-4 flex-col mb-4">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="bg-zinc-900 border-zinc-800 border-[1px] p-1 rounded-md"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Dimensions */}
        <div className="flex px-4 flex-col mb-4">
          <label htmlFor="dimensions">Dimensions</label>
          <input
            type="text"
            id="dimensions"
            name="dimensions"
            className="bg-zinc-900 border-zinc-800 border-[1px] p-1 rounded-md"
            value={formData.dimensions}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="flex px-4 flex-col mb-4">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className="bg-zinc-900 border-zinc-800 border-[1px] p-1 rounded-md"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Category */}
        <div className="flex px-4 flex-col mb-4">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            className="bg-zinc-900 border-zinc-800 border-[1px] p-1 rounded-md"
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
        <div className="flex px-4 flex-col mb-4">
          <label htmlFor="year">Year</label>
          <input
            type="text"
            id="year"
            name="year"
            className="bg-zinc-900 border-zinc-800 border-[1px] p-1 rounded-md"
            value={formData.year}
            onChange={handleChange}
            required
          />
        </div>

        {/* Image URL */}
        <div className="flex px-4 flex-col mb-4">
          <label htmlFor="imageUrl">Image URL (Google Drive)</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            className="bg-zinc-900 border-zinc-800 border-[1px] p-1 rounded-md"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </div>

        {/* Image Preview */}
        {imagePreviewUrl && (
          <div className="flex px-4 flex-col mb-4">
            <h2>Image Preview:</h2>
            <Image
              src={imagePreviewUrl}
              alt="Preview"
              height={200}
              width={200}
            />
          </div>
        )}
        <div className="flex px-4 flex-col mb-4">
          <button
            type="submit"
            className="bg-zinc-100 text-zinc-900 p-2 rounded-md font-bold"
          >
            Add Image
          </button>
        </div>
      </form>
    </div>
  );
}
