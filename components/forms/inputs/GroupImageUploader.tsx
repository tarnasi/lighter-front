"use client";

import axios from "axios";
import React, { useRef, useState } from "react";

type Props = {
  images: string[];
  setImages: (images: string[]) => void;
};

const GroupImageUploader = ({ images, setImages }: Props) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("image-data", file);

    try {
      setUploading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${response.data.url}`;
      setImages([...images, imageUrl]);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  };

  const deleteImage = async (url: string) => {
    const parts = url.split("/");
    const filename = parts[parts.length - 1];

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setImages(images.filter((img) => img !== url));
    } catch (err) {
      console.error("Error deleting image:", err);
    }
  };

  return (
    <div className="space-y-4">
      <div
        onClick={() => fileInputRef.current?.click()}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
          uploading
            ? "border-gray-300 text-gray-400 bg-gray-100"
            : "hover:border-blue-600 hover:bg-blue-50"
        }`}
      >
        {uploading ? (
          <div className="animate-pulse">در حال آپلود...</div>
        ) : (
          <div className="text-gray-500">
            عکس را بکشید یا کلیک کنید برای آپلود
            <br />
            <span className="text-xs text-gray-400">(PNG, JPG, JPEG)</span>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={onFileChange}
          className="hidden"
        />
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {images.map((url, index) => (
            <div key={index} className="relative group">
              <img
                src={url}
                alt={`Image ${index + 1}`}
                className="w-full h-32 object-contain border rounded-lg"
              />
              <button
                type="button"
                onClick={() => deleteImage(url)}
                className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700 shadow hidden group-hover:block"
              >
                حذف
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupImageUploader;
