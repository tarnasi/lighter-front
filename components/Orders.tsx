"use client";

import { useOrderStore } from "@/stores/useOrderStore";
import { Button, Card, Empty, Divider, Tooltip, message } from "antd";
import { DeleteOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useState } from "react";

export default function OrdersPage() {
  const { items, clearOrder, decreaseQty, increaseQty, removeFromOrder } = useOrderStore();
  const [loading, setLoading] = useState(false);

  const getDiscountedPrice = (item: any) => {
    return item.discount && item.discount > 0
      ? item.price - item.price * (item.discount / 100)
      : item.price;
  };

  const totalPrice = items.reduce(
    (sum, item) => sum + getDiscountedPrice(item) * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      message.warning("سفارشی برای ثبت وجود ندارد.");
      return;
    }
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1500)); // شبیه‌سازی
      message.success("سفارش شما با موفقیت ثبت شد!");
      clearOrder();
    } catch (error) {
      message.error("خطا در ثبت سفارش، لطفا دوباره تلاش کنید.");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto mb-12">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-6">سفارش‌های شما</h2>

      {items.length === 0 ? (
        <Empty description="هیچ محصولی در سفارش نیست 😕" />
      ) : (
        <>
          <div className="space-y-6">
            {items.map((item: any) => (
              <Card
                key={item.id}
                className="shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-row-reverse items-center gap-4">
                  {/* تصویر محصول همیشه سمت راست */}
                  <div className="w-24 h-24 relative flex-shrink-0 border rounded-lg overflow-hidden bg-white">
                    {item.images?.[0] ? (
                      <Image
                        src={item.images[0]}
                        alt={item.title}
                        fill
                        className="object-contain p-3"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                        بدون تصویر
                      </div>
                    )}
                  </div>

                  {/* اطلاعات محصول سمت چپ */}
                  <div className="flex-1 text-right sm:text-left">
                    <h3 className="font-bold text-lg text-gray-800">{item.title}</h3>

                    <div className="mt-1 text-sm text-gray-600">
                      قیمت واحد:
                      {item.discount > 0 ? (
                        <>
                          <span className="line-through mr-2 text-gray-400">
                            {item.price.toLocaleString()} تومان
                          </span>
                          <span className="text-red-600 font-semibold">
                            {getDiscountedPrice(item).toLocaleString()} تومان
                          </span>
                        </>
                      ) : (
                        <span className="text-gray-700 ml-1">
                          {item.price.toLocaleString()} تومان
                        </span>
                      )}
                    </div>

                    <div className="mt-1 text-sm text-gray-700">
                      جمع:
                      <span className="font-semibold text-green-700 mr-1">
                        {(getDiscountedPrice(item) * item.quantity).toLocaleString()} تومان
                      </span>
                    </div>

                    {/* کنترل تعداد و حذف */}
                    <div className="mt-3 flex items-center gap-3 justify-end sm:justify-start">
                      <Tooltip title="کم کردن تعداد">
                        <Button
                          type="default"
                          size="small"
                          icon={<MinusOutlined />}
                          onClick={() => decreaseQty(item.id)}
                          disabled={item.quantity <= 1}
                        />
                      </Tooltip>

                      <span className="min-w-[24px] text-center font-semibold text-lg">
                        {item.quantity}
                      </span>

                      <Tooltip title="افزایش تعداد">
                        <Button
                          type="default"
                          size="small"
                          icon={<PlusOutlined />}
                          onClick={() => increaseQty(item.id)}
                        />
                      </Tooltip>

                      <div className="flex-1" />

                      <Tooltip title="حذف محصول">
                        <Button
                          type="primary"
                          danger
                          size="small"
                          icon={<DeleteOutlined />}
                          onClick={() => removeFromOrder(item.id)}
                        />
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Divider className="my-8" />

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-base sm:text-lg font-extrabold text-green-700">
              مجموع کل: {totalPrice.toLocaleString()} تومان
            </div>

            <Button
              type="primary"
              size="large"
              loading={loading}
              onClick={handlePlaceOrder}
              className="font-semibold rounded-md shadow-lg"
            >
              ثبت نهایی سفارش و پرداخت
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
