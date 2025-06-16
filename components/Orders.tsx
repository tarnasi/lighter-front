"use client";

import { useOrderStore } from "@/stores/useOrderStore";
import { Button, Card, Empty, Divider } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Image from "next/image";

export default function OrdersPage() {
  const { items, clearOrder } = useOrderStore();

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
      <h2 className="text-xl font-bold text-gray-800 mb-4">سفارش‌های شما</h2>

      {items.length === 0 ? (
        <Empty description="هیچ محصولی در سفارش نیست 😕" />
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item: any) => (
              <Card key={item.id} className="shadow-sm p-2">
                <div className="flex flex-row-reverse sm:flex-row gap-4 items-center">
                  {/* تصویر محصول سمت راست در موبایل */}
                  <div className="w-24 h-24 relative flex-shrink-0 border rounded overflow-hidden">
                    {item.images?.[0] ? (
                      <Image
                        src={item.images[0]}
                        alt={item.title}
                        fill
                        className="object-contain p-2"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                        بدون تصویر
                      </div>
                    )}
                  </div>

                  {/* اطلاعات محصول سمت چپ */}
                  <div className="flex-1 text-right sm:text-left">
                    <h3 className="font-bold text-gray-800 text-base">
                      {item.title}
                    </h3>

                    <div className="text-sm mt-1">
                      قیمت واحد:
                      {item.discount > 0 ? (
                        <>
                          <span className="line-through mr-2 text-gray-500">
                            {item.price.toLocaleString()}
                          </span>
                          <span className="text-red-500 font-semibold">
                            {getDiscountedPrice(item).toLocaleString()} تومان
                          </span>
                        </>
                      ) : (
                        <span className="text-gray-700 ml-1">
                          {item.price.toLocaleString()} تومان
                        </span>
                      )}
                    </div>

                    <div className="text-sm mt-1">
                      تعداد:
                      <span className="text-blue-600 font-bold ml-1">
                        {item.quantity}
                      </span>
                    </div>

                    <div className="mt-2 text-sm font-semibold text-green-600">
                      جمع:{" "}
                      {(
                        getDiscountedPrice(item) * item.quantity
                      ).toLocaleString()}{" "}
                      تومان
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Divider />

          <div className="flex justify-between items-center mt-6 flex-wrap gap-4">
            <div className="text-lg font-bold text-green-600">
              مجموع کل: {totalPrice.toLocaleString()} تومان
            </div>

            <Button
              onClick={clearOrder}
              danger
              icon={<DeleteOutlined />}
              className="font-semibold"
            >
              پاک کردن سفارش
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
