"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {};

const categories = [
  { href: "/brands/salt", img: "/images/salt.jpg", label: "سالت" },
  { href: "/brands/juce", img: "/images/juice.jpg", label: "جویس" },
  { href: "/brands/paf", img: "/images/paf.jpg", label: "پاف"},
  { href: "/brands/services", img: "/images/kartirig.jpg", label: "کویل و کارتریج" },
  { href: "/brands/pod-vape", img: "/images/vape-pod.jpg", label: "پاد و ویپ" },
  { href: "/brands/antik", img: "/images/antik.jpg", label: "آنتیک" },
  { href: "/brands/accessory", img: "/images/accessories.jpg", label: "اکسسوری" },
  { href: "/brands/lights", img: "/images/home-fire.jpg", label: "فندک خانگی" },
];

const Categories = (props: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 bg-white min-h-screen">
      {categories.map(({ href, img, label }) => (
        <Link key={href} href={href}>
          <div className="w-full aspect-square bg-white rounded-xl shadow-md border-2 border-blue-100 hover:border-teal-300 transition-all duration-300 flex flex-col items-center justify-center gap-2 p-4">
            <div className="w-20 h-20 relative">
              <Image
                src={img}
                alt={label}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="text-teal-800 font-bold text-base text-center">
              {label}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
