"use client";

import React from "react";
import Image from "next/image";
import { Button, Modal, message } from "antd";
import { FaTrash } from "react-icons/fa";

// import { useQuery, useMutation } from "@apollo/client";
// import { BASKET_QUERY, REMOVE_FROM_BASKET_MUTATION } from "@/apollo/queries";

type Product = {
  id: string;
  title: string;
  price: number;
  discount?: number;
  image?: string;
};

type OrderItem = {
  id: string;
  product: Product;
  quantity: number;
};

const fakeBasket: OrderItem[] = [
  {
    id: "1",
    product: {
      id: "p1",
      title: "کنسول بازی پلی‌استیشن ۵",
      price: 29000000,
      discount: 10,
      image: "/placeholder.jpg", // replace with real URL
    },
    quantity: 2,
  },
  {
    id: "2",
    product: {
      id: "p2",
      title: "دسته اضافی DualSense",
      price: 2800000,
      image: "/placeholder.jpg",
    },
    quantity: 1,
  },
];

export default function BasketPage() {
  // const { data, loading, error, refetch } = useQuery(BASKET_QUERY);
  // const [removeFromBasket] = useMutation(REMOVE_FROM_BASKET_MUTATION);

  const handleRemove = (itemId: string) => {
    message.success("آیتم حذف شد");
    // removeFromBasket({ variables: { id: itemId } }).then(() => refetch());
  };

  const handleClearBasket = () => {
    Modal.confirm({
      title: "پاک‌سازی سبد؟",
      content: "آیا مطمئن هستید که می‌خواهید سبد را خالی کنید؟",
      onOk: () => {
        message.success("سبد پاک شد");
      },
    });
  };

  const basket = fakeBasket;

  const totalPrice = basket.reduce((sum, item) => {
    const { price, discount = 0 } = item.product;
    const final = price * (1 - discount / 100);
    return sum + final * item.quantity;
  }, 0);

  return (
    <div className="px-4 md:px-16 lg:px-32 xl:px-64 py-6 text-gray-800">
      <h1 className="text-xl font-bold mb-4">سبد خرید</h1>

      {basket.length === 0 ? (
        <p className="text-center text-gray-500">سبد خرید شما خالی است.</p>
      ) : (
        <div className="space-y-4">
          {basket.map((item) => {
            const { product, quantity } = item;
            const discounted =
              product.discount && product.discount > 0
                ? product.price - (product.price * product.discount) / 100
                : product.price;

            return (
              <div
                key={item.id}
                className="bg-white rounded-lg border shadow-sm flex p-3 gap-4 items-center"
              >
                <div className="relative w-20 h-20 flex-shrink-0">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover rounded"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                      تصویر ندارد
                    </div>
                  )}
                </div>

                <div className="flex-1 text-sm">
                  <h2 className="font-semibold text-gray-800 line-clamp-2">
                    {product.title}
                  </h2>

                  <p className="text-xs text-gray-500 mt-1">
                    تعداد: <span className="font-medium">{quantity}</span>
                  </p>

                  <div className="mt-1">
                    {product.discount ? (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="line-through text-red-400">
                          {product.price.toLocaleString()} تومان
                        </span>
                        <span className="text-green-600 font-bold">
                          {(discounted * quantity).toLocaleString()} تومان
                        </span>
                      </div>
                    ) : (
                      <span className="font-medium">
                        {(product.price * quantity).toLocaleString()} تومان
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            );
          })}

          <div className="bg-gray-50 border rounded-lg p-4 mt-6 text-sm">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">جمع کل:</span>
              <span className="font-bold text-gray-800">
                {totalPrice.toLocaleString()} تومان
              </span>
            </div>

            <div className="mt-4 flex gap-2">
              <Button
                type="default"
                className="w-full"
                onClick={handleClearBasket}
              >
                پاک سازی سبد
              </Button>
              <Button type="primary" className="w-full">
                ادامه به پرداخت
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
