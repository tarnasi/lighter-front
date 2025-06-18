"use client";

import React, { useState } from "react";
import { Button, InputNumber, Typography, Space, Divider } from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  ShareAltOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

interface MobileProductActionsProps {
  price: number;
  originalPrice: number;
  discount?: number;
  quantity: number;
  maxQuantity: number;
  isAddingToCart: boolean;
  onAddToCart: (quantity: number) => void;
  onQuantityChange: (quantity: number) => void;
}

export default function MobileProductActions({
  price,
  originalPrice,
  discount,
  quantity,
  maxQuantity,
  isAddingToCart,
  onAddToCart,
  onQuantityChange,
}: MobileProductActionsProps) {
  const hasDiscount = discount && discount > 0;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      onQuantityChange(newQuantity);
    }
  };

  return (
    <div className="sticky bottom-0 bg-white border-t shadow-lg p-4 z-10">
      {/* Price Display */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Text className="text-2xl font-bold text-green-600">
              ${price.toFixed(2)}
            </Text>
            {hasDiscount && (
              <Text className="text-lg text-gray-500 line-through">
                ${originalPrice.toFixed(2)}
              </Text>
            )}
          </div>
          {hasDiscount && (
            <Text className="text-green-600 text-sm">
              Save ${(originalPrice - price).toFixed(2)} ({discount}% off)
            </Text>
          )}
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center gap-2">
          <Button
            size="small"
            icon={<MinusOutlined />}
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            className="w-8 h-8 flex items-center justify-center"
          />
          <Text className="min-w-[2rem] text-center font-medium">
            {quantity}
          </Text>
          <Button
            size="small"
            icon={<PlusOutlined />}
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= maxQuantity}
            className="w-8 h-8 flex items-center justify-center"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          type="primary"
          size="large"
          icon={<ShoppingCartOutlined />}
          loading={isAddingToCart}
          disabled={maxQuantity === 0}
          onClick={() => onAddToCart(quantity)}
          className="flex-1 h-12 font-medium"
        >
          Add to Cart
        </Button>

        <Button size="large" icon={<HeartOutlined />} className="h-12 px-4" />

        <Button
          size="large"
          icon={<ShareAltOutlined />}
          className="h-12 px-4"
        />
      </div>

      {maxQuantity === 0 && (
        <Text className="text-red-500 text-sm mt-2 block text-center">
          Out of stock
        </Text>
      )}
    </div>
  );
}
