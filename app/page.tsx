"use client";

import { Menu, Search, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Artwork {
  id: number;
  title: string;
  artist: string;
  price: number;
  category: string;
  image: string;
}

export default function Home() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setArtworks(dummyArtworks);
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <main className="container mx-auto px-4">
      <nav className="sticky top-0 z-50 flex justify-between items-center px-8 py-6 bg-black bg-opacity-20 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <Image
            src="/images/DalleGalleryImage.webp"
            alt="Gallery Logo"
            width={150}
            height={150}
            //className="rounded-full"
          />
        </div>

        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-white text-4xl font-serif italic tracking-wide">
          The Art of Sapienza Gallery
        </h1>

        <div className="flex items-center space-x-6">
          <Search className="w-6 h-6 text-white hover:text-fuchsia-300 cursor-pointer transition-colors" />
          <User className="w-6 h-6 text-white hover:text-fuchsia-300 cursor-pointer transition-colors" />
          <Menu className="md:hidden w-6 h-6 text-white hover:text-fuchsia-300 cursor-pointer transition-colors" />
        </div>
      </nav>

      <section className="my-8">
        <h2 className="text-2xl font-semibold mb-4">Featured Artworks</h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {/* Loading skeletons */}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artworks.map((artwork) => (
              <Link
                key={artwork.id}
                href={`/gallery-exhibitions/${artwork.id}`}
                className="group relative aspect-[3/4] rounded-xl overflow-hidden transform transition-transform duration-300 hover:scale-[1.02]"
              >
                <Image
                  src={artwork.image}
                  alt={artwork.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{artwork.title}</h3>
                    <p className="text-sm mb-2">by {artwork.artist}</p>
                    <p className="text-lg font-semibold">${artwork.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-semibold mb-4">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/gallery-exhibitions"
            className="block p-4 border rounded-lg hover:bg-gray-100 transition-colors"
          >
            <h3 className="text-xl font-medium">Gallery Exhibitions</h3>
            <p>Discover our curated collections and featured artists.</p>
          </Link>
          <Link
            href="/art-appraisals"
            className="block p-4 border rounded-lg hover:bg-gray-100 transition-colors"
          >
            <h3 className="text-xl font-medium">Art Appraisals</h3>
            <p>Expert valuation services for your art pieces.</p>
          </Link>
        </div>
      </section>

      <footer className="py-6 mt-8 border-t">
        <p>
          &copy; 2024 Art of Sapienza Gallery & Appraisals. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

const dummyArtworks = [
  {
    id: 1,
    title: "The Light Enforcer",
    artist: "Leans",
    price: 500,
    category: "Digital",
    image: "/images/IMG_3656.jpeg",
  },
  {
    id: 2,
    title: "Unseen Limousine",
    artist: "Michael Reeder",
    price: 1200,
    category: "Paintings",
    image: "/images/IMG_3942.jpeg",
  },
  {
    id: 3,
    title: "Earth Bender",
    artist: "Mars-1, Damon Soule, Oliver Vernon",
    price: 3200,
    category: "Photography",
    image: "/images/IMG_2240.jpeg",
  },
];
