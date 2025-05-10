'use client'

import EmptyBox from '@/components/EmptyBox'

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
    return <EmptyBox />;
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
