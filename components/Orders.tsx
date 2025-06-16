"use client";

import { useOrderStore } from "@/stores/useOrderStore";
import { Button, Card, Empty, Divider, Tooltip } from "antd";
import { DeleteOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import Image from "next/image";

export default function OrdersPage() {
  const { items, clearOrder, decreaseQty, increaseQty, removeFromOrder } = useOrderStore();

  const getDiscountedPrice = (item: any) => {
    return item.discount && item.discount > 0
      ? item.price - item.price * (item.discount / 100)
      : item.price;
  };

  const totalPrice = items.reduce(
    (sum, item) => sum + getDiscountedPrice(item) * item.quantity,
    0
  );

  return (
    <div className="p-4 max-w-3xl mx-auto">
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
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                  {/* تصویر محصول سمت راست در موبایل */}
                  <div className="w-28 h-28 relative flex-shrink-0 border rounded-lg overflow-hidden bg-white">
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

                  {/* اطلاعات محصول */}
                  <div className="flex-1 text-right sm:text-left flex flex-col justify-between h-full">
                    <div>
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
                    </div>

                    {/* کنترل تعداد و حذف */}
                    <div className="mt-4 flex items-center gap-3">
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
            <div className="text-2xl font-extrabold text-green-700">
              مجموع کل: {totalPrice.toLocaleString()} تومان
            </div>

            <Button
              onClick={clearOrder}
              danger
              icon={<DeleteOutlined />}
              className="font-semibold"
              size="large"
            >
              پاک کردن کل سفارش
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
