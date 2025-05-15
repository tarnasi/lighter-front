"use client";

type Props = {};

const EmptyBox = (props: Props) => {
  return (
    <div className="min-h-screen flex flex-col items-center pt-8 bg-gray-50 text-gray-600">
      <img
        src="/images/empty-box.png"
        alt="No products"
        className="w-48 h-48 mb-6"
      />
      <p className="text-xl font-semibold">یافت نشد</p>
      <p className="text-sm text-gray-400">
        در صورت عضویت در خبرنامه سایت محصولات جدید بعد بارگذاری به اطلاع شما
        خواهد رسید
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
        <button
          type="submit"
          className="text-center p-2 mt-2 bg-amber-400 hover:bg-amber-300 hover:cursor-pointer"
        >
          عضویت
        </button>
      </form>
    </div>
  );
};

export default EmptyBox;
