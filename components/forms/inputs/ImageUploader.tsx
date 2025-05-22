"use client";

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  setImage: (url: string) => void;
  initialImage: string | null;
};

const ImageUploader = ({ setImage, initialImage }: Props) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(initialImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialImage) {
      setPreview(initialImage);
      setImage(initialImage); // optional, keeps parent in sync
    }
  }, [initialImage]);

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("image-data", file);

    try {
      setUploading(true);
      const response = await axios.post(
        "https://lighterapi.devdiaries.work/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const imageUrl = `https://lighterapi.devdiaries.work${response.data.url}`;
      setImage(imageUrl);
      setPreview(imageUrl);
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

  const deleteImage = async () => {
    if (!preview) return;

    // extract filename from url
    const parts = preview.split("/");
    const filename = parts[parts.length - 1];

    try {
      const res = await fetch("https://lighterapi.devdiaries.work/upload/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      console.log("Deleted successfully:", data);
      setImage("");
      setPreview(null);
    } catch (err) {
      console.error("Error deleting image:", err);
    }
  };

  return (
    <div className="relative">
      <div
        onClick={() => fileInputRef.current?.click()}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
          uploading
            ? "border-gray-300 text-gray-400 bg-gray-100"
            : "hover:border-teal-600 hover:bg-teal-50"
        }`}
      >
        {uploading ? (
          <div className="animate-pulse">در حال آپلود...</div>
        ) : preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="h-40 mx-auto object-contain"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                deleteImage();
              }}
              className="absolute top-2 right-2 bg-red-600 text-white text-xs px-3 py-1 rounded hover:bg-red-700 shadow"
            >
              حذف
            </button>
          </div>
        ) : (
          <div className="text-gray-500">
            عکس را بکشید یا کلیک کنید برای انتخاب
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
    </div>
  );
};

export default ImageUploader;
