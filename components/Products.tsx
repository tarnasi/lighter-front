import React from "react";

type ProductObject = {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
};

type Props = {
  data?: ProductObject[];
};

const Products = ({ data = [] }: Props) => {
  if (data.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center pt-8 bg-gray-50 text-gray-600">
        <img
          src="/images/empty-box.png"
          alt="No products"
          className="w-48 h-48 mb-6"
        />
        <p className="text-xl font-semibold">محصولی یافت نشد</p>
        <p className="text-sm text-gray-400">
          در صورت عضویت در خبرنامه سایت محصولات جدید بعد بارگذاری به اطلاع شما خواهد رسید
        </p>
        <form action="" className="flex flex-col justify-around p-4 w-full">
          <label htmlFor="news">عضویت در خبرنامه</label>
          <input
            type="email"
            name="join_new_product"
            id="news"
            placeholder="ایمیل معتبر وارد بفرمایید"
            className="border p-2 rounded"
            />
          <button type="submit" className="text-center p-2 mt-2 bg-amber-400 hover:bg-amber-300 hover:cursor-pointer">عضویت</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Available Products
      </h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="text-indigo-600 font-bold mt-2">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
