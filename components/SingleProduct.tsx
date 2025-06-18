"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Button,
  InputNumber,
  Tag,
  Breadcrumb,
  Divider,
  Space,
  Typography,
  Card,
  Image,
  Badge,
  Drawer,
} from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  ShareAltOutlined,
  CheckCircleOutlined,
  TruckOutlined,
  SafetyOutlined,
  GiftOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useProductBySlug } from "@/hooks/useProduct";
import MobileImageGallery from "@/components/MobileImageGallery";
import MobileProductActions from "@/components/MobileProductActions";
import EmptyBox from "@/components/EmptyBox";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { DateObject } from "react-multi-date-picker";

const { Title, Text, Paragraph } = Typography;

export default function SingleProduct() {
  const params = useParams();
  const slug = params?.slug as string;

  // State for product interactions
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Fetch product data
  const { product, loading, error } = useProductBySlug(slug);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Loading state
  if (loading) {
    return <LoadingSkeleton />;
  }

  // Error state
  if (error || !product) {
    return <EmptyBox />;
  }

  // Calculate discounted price
  const originalPrice = product.price;
  const discountAmount = product.discount || 0;
  const finalPrice = originalPrice - (originalPrice * discountAmount) / 100;
  const hasDiscount = discountAmount > 0;

  // Handle add to cart
  const handleAddToCart = async (qty: number) => {
    setIsAddingToCart(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsAddingToCart(false);
    console.log(`Added ${qty} of ${product.title} to cart`);
  };

  // Mobile Layout
  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        {/* Mobile Header */}
        <div className="bg-white border-b sticky top-0 z-20">
          <div className="px-4 py-3 flex items-center justify-between">
            <Button type="text" icon={<MenuOutlined />} className="p-0" />
            <Text className="font-medium truncate mx-4">{product.title}</Text>
            <Button type="text" icon={<ShareAltOutlined />} className="p-0" />
          </div>
        </div>

        <div className="px-4 py-4 space-y-6">
          {/* Mobile Image Gallery */}
          <MobileImageGallery
            images={product.images}
            productTitle={product.title}
          />

          {/* Product Info */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            {product.brand && (
              <Text className="text-blue-600 font-medium text-sm uppercase tracking-wide">
                {product.brand.name}
              </Text>
            )}
            <Title level={3} className="!mb-2 !mt-1">
              {product.title}
            </Title>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.is_pack && (
                <Tag color="orange" icon={<GiftOutlined />} className="text-xs">
                  پک
                </Tag>
              )}
              {product.category && (
                <Tag color="blue" className="text-xs">
                  {product.category.name}
                </Tag>
              )}
              {product.quantity > 0 ? (
                <Tag
                  color="green"
                  icon={<CheckCircleOutlined />}
                  className="text-xs"
                >
                  موجودی
                </Tag>
              ) : (
                <Tag color="red" className="text-xs">
                  اتمام موجودی
                </Tag>
              )}
            </div>

            {/* Price */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <Text className="text-2xl font-bold text-green-600">
                  ${finalPrice.toFixed(2)}
                </Text>
                {hasDiscount && (
                  <>
                    <Text className="text-lg text-gray-500 line-through">
                      ${originalPrice.toFixed(2)}
                    </Text>
                    <Badge
                      count={`-${discountAmount}%`}
                      style={{ backgroundColor: "#f50" }}
                    />
                  </>
                )}
              </div>
              {hasDiscount && (
                <Text className="text-green-600 text-sm">
                  پس اندازه شما ${(originalPrice - finalPrice).toFixed(2)}
                </Text>
              )}
            </div>

            {/* Description Preview */}
            {product.description && (
              <div>
                <Paragraph
                  className="text-gray-600 text-sm"
                  ellipsis={{ rows: 3, expandable: false }}
                >
                  {product.description}
                </Paragraph>
                <Button
                  type="link"
                  size="small"
                  onClick={() => setShowDetails(true)}
                  className="p-0 h-auto text-blue-600"
                >
                  View Details
                </Button>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <Title level={5} className="!mb-3">
              Features
            </Title>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-3">
                <TruckOutlined className="text-blue-500 text-lg" />
                <div>
                  <Text strong className="text-sm">
                    Free Shipping
                  </Text>
                  <br />
                  <Text className="text-gray-500 text-xs">
                    On orders over $50
                  </Text>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <SafetyOutlined className="text-green-500 text-lg" />
                <div>
                  <Text strong className="text-sm">
                    Secure Payment
                  </Text>
                  <br />
                  <Text className="text-gray-500 text-xs">SSL encrypted</Text>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircleOutlined className="text-orange-500 text-lg" />
                <div>
                  <Text strong className="text-sm">
                    Quality Guarantee
                  </Text>
                  <br />
                  <Text className="text-gray-500 text-xs">30-day return</Text>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sticky Actions */}
        <MobileProductActions
          price={finalPrice}
          originalPrice={originalPrice}
          discount={discountAmount}
          quantity={quantity}
          maxQuantity={product.quantity}
          isAddingToCart={isAddingToCart}
          onAddToCart={handleAddToCart}
          onQuantityChange={setQuantity}
        />

        {/* Details Drawer */}
        <Drawer
          title="Product Details"
          placement="bottom"
          height="80%"
          open={showDetails}
          onClose={() => setShowDetails(false)}
          className="rounded-t-lg"
        >
          <div className="space-y-4">
            <div>
              <Title level={5}>توضیحات</Title>
              <Paragraph className="text-gray-600">
                {product.description}
              </Paragraph>
            </div>

            <Divider />

            <div>
              <Title level={5}>Product Information</Title>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <Text className="text-gray-500">SKU:</Text>
                  <Text>{product.id}</Text>
                </div>
                <div className="flex justify-between">
                  <Text className="text-gray-500">Brand:</Text>
                  <Text>{product.brand?.name || "N/A"}</Text>
                </div>
                <div className="flex justify-between">
                  <Text className="text-gray-500">Category:</Text>
                  <Text>{product.category?.name || "N/A"}</Text>
                </div>
                <div className="flex justify-between">
                  <Text className="text-gray-500">Stock:</Text>
                  <Text>{product.quantity} units</Text>
                </div>
                <div className="flex justify-between">
                  <Text className="text-gray-500">Added:</Text>
                  <Text>
                    {new Date(product.created_at).toLocaleDateString()}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }

  // Desktop Layout (Original)
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb
            items={[
              { title: "Home" },
              { title: product.category?.name || "Products" },
              { title: product.brand?.name },
              { title: product.title },
            ]}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-sm border">
              <Image
                src={
                  product.images[selectedImageIndex] ||
                  "/placeholder-product.jpg"
                }
                alt={product.title}
                className="w-full h-full object-cover"
                preview={{
                  src: product.images[selectedImageIndex],
                }}
              />
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
                      selectedImageIndex === index
                        ? "border-blue-500 shadow-md"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Product Title and Brand */}
            <div>
              {product.brand && (
                <Text className="text-blue-600 font-medium text-sm uppercase tracking-wide">
                  {product.brand.name}
                </Text>
              )}
              <Title level={1} className="!mb-2 !mt-1">
                {product.title}
              </Title>

              {/* Product Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.is_pack && (
                  <Tag color="orange" icon={<GiftOutlined />}>
                    پک
                  </Tag>
                )}
                {product.category && (
                  <Tag color="blue">{product.category.name}</Tag>
                )}
                {product.quantity > 0 ? (
                  <Tag color="green" icon={<CheckCircleOutlined />}>
                    موجودی
                  </Tag>
                ) : (
                  <Tag color="red">اتمام موجودی</Tag>
                )}
              </div>
            </div>

            {/* Price Section */}
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                {hasDiscount ? (
                  <>
                    <Text className="text-3xl font-bold text-green-600">
                      ${finalPrice.toFixed(2)}
                    </Text>
                    <Text className="text-xl text-gray-500 line-through">
                      ${originalPrice.toFixed(2)}
                    </Text>
                    <Badge
                      count={`-${discountAmount}%`}
                      style={{ backgroundColor: "#f50" }}
                    />
                  </>
                ) : (
                  <Text className="text-3xl font-bold text-gray-900">
                    ${originalPrice.toFixed(2)}
                  </Text>
                )}
              </div>

              {hasDiscount && (
                <Text className="text-green-600 text-sm">
                  پس انداز شما ${(originalPrice - finalPrice).toFixed(2)}
                </Text>
              )}
            </div>

            {/* Product Description */}
            {product.description && (
              <div>
                <Title level={4}>توضیحات</Title>
                <Paragraph className="text-gray-600">
                  {product.description}
                </Paragraph>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="bg-white p-6 rounded-lg border shadow-sm space-y-4">
              <div className="flex items-center gap-4">
                <Text strong>تعداد:</Text>
                <InputNumber
                  min={1}
                  max={product.quantity}
                  value={quantity}
                  onChange={(value) => setQuantity(value || 1)}
                  className="w-24"
                />
                <Text className="text-gray-500 text-sm">
                  {product.quantity} در انبار
                </Text>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="primary"
                  size="large"
                  icon={<ShoppingCartOutlined />}
                  loading={isAddingToCart}
                  disabled={product.quantity === 0}
                  onClick={() => handleAddToCart(quantity)}
                  className="flex-1 h-12 hover:scale-105 transition-transform duration-200"
                >
                  اضافه به سبد خرید
                </Button>

                <div className="flex gap-2">
                  <Button
                    size="large"
                    icon={<HeartOutlined />}
                    className="h-12 px-4 hover:scale-105 transition-transform duration-200"
                  />
                  <Button
                    size="large"
                    icon={<ShareAltOutlined />}
                    className="h-12 px-4 hover:scale-105 transition-transform duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Product Meta */}
            <div className="text-sm text-gray-500 space-y-1">
              <div>SKU: {product.id}</div>
              <div></div>
              {product.updated_at !== product.created_at && <div></div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
