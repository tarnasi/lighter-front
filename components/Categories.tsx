"use client";

import Image from "next/image";
import Link from "next/link";

import { Carousel } from "antd";
import React from "react";

type Props = {};

const categories = [
  { id: 1, href: "/brands/salt", img: "/images/salt.jpg", label: "سالت" },
  { id: 2, href: "/brands/juce", img: "/images/juice.jpg", label: "جویس" },
  { id: 3, href: "/brands/paf", img: "/images/paf.jpg", label: "پاف" },
  {
    id: 4,
    href: "/brands/services",
    img: "/images/kartirig.jpg",
    label: "کویل و کارتریج",
  },
  {
    id: 5,
    href: "/brands/pod-vape",
    img: "/images/vape-pod.jpg",
    label: "پاد و ویپ",
  },
  { id: 6, href: "/brands/antik", img: "/images/antik.jpg", label: "آنتیک" },
  {
    id: 7,
    href: "/brands/accessory",
    img: "/images/accessories.jpg",
    label: "اکسسوری",
  },
  {
    id: 8,
    href: "/brands/lights",
    img: "/images/home-fire.jpg",
    label: "فندک خانگی",
  },
];

const contentStyle: React.CSSProperties = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const onClickCategory = (cat: {
  id: Number;
  href: string;
  img: string;
  label: string;
}) => {};

const Categories = (props: Props) => {
  return (
    <div className="px-4 md:px-16 lg:px-32 xl:px-64 bg-white text-gray-800">
      {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white h-min-screen">
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
      </div> */}

      <Carousel dots={false} rtl slidesToShow={4} draggable>
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onClickCategory(cat)}
            className="flex justify-center"
          >
            <div className="flex flex-col items-center cursor-pointer justify-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-2 border-2 border-blue-500">
                <Image
                  src={cat.href}
                  alt={cat.label}
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Categories;
