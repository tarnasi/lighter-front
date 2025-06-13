import Image from "next/image";
import { BsCaretLeftFill } from "react-icons/bs";

type Props = {
  product: any;
};

export default function Product({ product }: Props) {
  const hasDiscount = product.discount > 0;
  const discountedPrice = hasDiscount
    ? product.price - product.price * (product.discount / 100)
    : product.price;

  return (
    <div
      key={product.id}
      className="bg-white scroll-smooth rounded-xl border shadow-sm hover:cursor-pointer hover:shadow-lg overflow-hidden flex-shrink-0 flex flex-col w-55"
    >
      {/* عکس با نشان is_pack */}
      <div className="relative w-full h-40 bg-white">
        {product.is_pack && (
          <div className="absolute top-2 right-2 bg-yellow-300 text-yellow-900 text-xs font-bold px-2 py-1 rounded shadow z-10">
            باکس / عمده
          </div>
        )}
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.title}
            layout="fill"
            objectFit="contain"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            بدون تصویر
          </div>
        )}
      </div>

      {/* دسته بندی و برند */}
      <div className="bg-gray-100 text-xs px-4 py-1 text-gray-700 flex justify-start gap-1 items-center">
        <span>{product.category.name}</span>
        <span>
          <BsCaretLeftFill />
        </span>
        <span>{product.brand.name}</span>
      </div>

      {/* بدنه کارت */}
      <div className="flex-1 p-4 flex flex-col justify-between gap-3">
        <h3 className="font-bold text-base text-gray-800">{product.title}</h3>

        {/* قیمت */}
        <div className="text-sm">
          {hasDiscount ? (
            <div className="flex flex-col gap-2">
              <span className="text-green-600 font-bold">
                {discountedPrice.toLocaleString()} تومان
              </span>
              <span className="text-sm sm:text-base text-gray-400 flex gap-1">
                <span className="line-through">
                  {product.price.toLocaleString()}
                </span>
                <span className="bg-red-100 text-red-600 px-1 rounded text-sm">
                  ٪{product.discount}
                </span>
              </span>
            </div>
          ) : (
            <span className="text-green-600 font-bold">
              {product.price.toLocaleString()} تومان
            </span>
          )}
        </div>

        {/* موجودی */}
        <div className="text-sm text-teal-500 font-bold">
          {Number(product.quantity) > 0 ? (
            `تعداد: ${product.quantity}`
          ) : (
            <span className="text-red-600 underline underline-offset-4">
              اتمام موجودی
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
