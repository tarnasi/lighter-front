"use client";

import Image from "next/image";
import Link from "next/link";

type BrandsProps = {
  category: string;
};

const brands = [
  {
    id: 1,
    name: "Black Note",
    image: "/images/brands/salt/blacknote.webp",
    slug: "black-note",
  },
  {
    id: 2,
    name: "Ripe Vapes",
    image: "/images/brands/salt/ripevapes.webp",
    slug: "ripe-vapes",
  },
  {
    id: 14,
    name: "BLVK",
    image: "/images/brands/salt/blvk.webp",
    slug: "blvk",
  },
  {
    id: 3,
    name: "Bazooka",
    image: "/images/brands/salt/bazooka.jpg",
    slug: "bazooka",
  },
  {
    id: 4,
    name: "Dr. Vapes",
    image: "/images/brands/salt/drvapes.webp",
    slug: "dr-vapes",
  },
  { id: 5, name: "VGOD", image: "/images/brands/salt/vgod.webp", slug: "vgod" },
  {
    id: 6,
    name: "Nasty",
    image: "/images/brands/salt/nasty.webp",
    slug: "nasty",
  },
  {
    id: 7,
    name: "Pod Salt",
    image: "/images/brands/salt/podsalt.jpg",
    slug: "pod-salt",
  },
  {
    id: 8,
    name: "Dinner Lady",
    image: "/images/brands/salt/dinnerlady.jpg",
    slug: "dinner-lady",
  },
  {
    id: 9,
    name: "E-Cigara",
    image: "/images/brands/salt/ecigara.webp",
    slug: "e-cigara",
  },
  {
    id: 11,
    name: "Tokyo",
    image: "/images/brands/salt/tokyo.jpg",
    slug: "tokyo",
  },
  { id: 13, name: "IVG", image: "/images/brands/salt/ivg.webp", slug: "ivg" },
  {
    id: 15,
    name: "Twist",
    image: "/images/brands/salt/twist.webp",
    slug: "twist",
  },
  {
    id: 16,
    name: "Juicy",
    image: "/images/brands/salt/juicy.jpg",
    slug: "juicy",
  },
  {
    id: 17,
    name: "Riot Squad",
    image: "/images/brands/salt/riotsquad.webp",
    slug: "riot-squad",
  },
  {
    id: 18,
    name: "Gold Leaf",
    image: "/images/brands/salt/goldleaf.webp",
    slug: "gold-leaf",
  },
  {
    id: 19,
    name: "Medusa",
    image: "/images/brands/salt/medusa.jpg",
    slug: "medusa",
  },
];

const Brands = ({ category }: BrandsProps) => {
  return (
    <div className="px-4 md:px-16 lg:px-32 xl:px-64 bg-white text-gray-800">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 bg-white h-min-screen">
        {brands.map((brand) => (
          <Link key={brand.id} href={`/brands/${category}/${brand.slug}`}>
            <div className="w-full aspect-square bg-white rounded-xl shadow-md border-2 border-blue-100 hover:border-teal-300 transition-all duration-300 flex flex-col items-center justify-center gap-2 p-4">
              <div className="w-16 h-16 relative">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="text-teal-800 font-bold text-base text-center">
                {brand.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Brands;
