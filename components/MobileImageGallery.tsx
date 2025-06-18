"use client";

import React, { useState, useRef, useEffect } from "react";
import { Image } from "antd";

interface MobileImageGalleryProps {
  images: string[];
  productTitle: string;
}

export default function MobileImageGallery({
  images,
  productTitle,
}: MobileImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Handle touch scroll for thumbnail navigation
  const handleThumbnailScroll = (index: number) => {
    setCurrentIndex(index);
    if (scrollRef.current) {
      const thumbnail = scrollRef.current.children[index] as HTMLElement;
      thumbnail.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  };

  // Swipe gesture handling for main image
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="space-y-4">
      {/* Main Image with Swipe Support */}
      <div
        className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-sm border"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <Image
          src={images[currentIndex] || "/placeholder-product.jpg"}
          alt={`${productTitle} - Image ${currentIndex + 1}`}
          className="w-full h-full object-cover"
          preview={{
            src: images[currentIndex],
            onVisibleChange: setIsZoomed,
          }}
        />

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {/* Swipe Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex ? "bg-white" : "bg-white bg-opacity-50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail Scroll */}
      {images.length > 1 && (
        <div
          ref={scrollRef}
          className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailScroll(index)}
              className={`flex-shrink-0 w-16 h-16 bg-white rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                currentIndex === index
                  ? "border-blue-500 shadow-md"
                  : "border-gray-200"
              }`}
            >
              <img
                src={image}
                alt={`${productTitle} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
