import React from "react";
import Image from "next/image";
import Link from "next/link";

const exhibitions = [
  {
    id: 1,
    title: "The Light Enforcer",
    artist: "Leans",
    imageSrc: "/images/IMG_3656.jpeg",
  },
  {
    id: 2,
    title: "Unseen Limousine",
    artist: "Michael Reeder",
    imageSrc: "/images/IMG_3942.jpeg",
  },
  {
    id: 3,
    title: "Earth Bender",
    artist: "Damon Soule, Oliver Vernon and Mars-1",
    imageSrc: "/images/IMG_2240.jpeg",
  },
  {
    id: 4,
    title: "Space Jame",
    artist: "PoorTeffy",
    imageSrc: "/images/IMG_2537.jpeg",
  },
  {
    id: 5,
    title: "Access Granted_Vlll",
    artist: "Bond Truluv",
    imageSrc: "/images/IMG_2581.jpeg",
  },
  {
    id: 6,
    title: "God's of the Multiverse",
    artist: "Dice51",
    imageSrc: "/images/IMG_4355.jpeg",
  },
];

export default function GalleryExhibitions() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gallery Exhibitions</h1>
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exhibitions.map((artwork) => (
          <Link
            href={`/gallery-exhibitions/${artwork.id}`}
            key={artwork.id}
            className="group border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="relative w-full h-64">
              <Image
                src={artwork.imageSrc}
                alt={artwork.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="transition-opacity duration-300 group-hover:opacity-75"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View Details
                </span>
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold">{artwork.title}</h2>
              <p className="text-gray-600">{artwork.artist}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
