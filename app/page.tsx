"use client";

import { Menu, Search, User, ChevronDown } from "lucide-react";
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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const categories = [
    "All",
    "Digital",
    "Paintings",
    "Sculptures",
    "Photography",
    "Mixed Media",
  ];

  useEffect(() => {
    setTimeout(() => {
      setArtworks(dummyArtworks);
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <main className="container mx-auto px-4">
      <nav className="sticky top-0 z-50 flex justify-between items-center px-8 py-6 bg-black bg-opacity-20 backdrop-blur-sm">
        <h1 className="text-white text-2xl font-bold">Art of Sapienza</h1>
        <div className="flex items-center space-x-6">
          <Search className="w-6 h-6 text-white hover:text-fuchsia-300 cursor-pointer transition-colors" />
          <User className="w-6 h-6 text-white hover:text-fuchsia-300 cursor-pointer transition-colors" />
          <Menu className="md:hidden w-6 h-6 text-white hover:text-fuchsia-300 cursor-pointer transition-colors" />
        </div>
      </nav>

      <div className="sticky top-20 z-40 px-6 py-4 bg-black bg-opacity-10 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search artworks or artists..."
              className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-white text-purple-600"
                    : "bg-white bg-opacity-10 text-white hover:bg-opacity-20"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="relative">
            <select
              className="appearance-none px-4 py-2 pr-8 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-fuchsia-300"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white w-4 h-4" />
          </div>
        </div>
      </div>

      <section className="my-8">
        <h2 className="text-2xl font-semibold mb-4">Featured Artworks</h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {/* Loading skeletons */}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artworks.map((artwork) => (
              <div
                key={artwork.id}
                className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-[1.02]"
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
              </div>
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
    title: "Featured Artwork 1",
    artist: "Artist Name 1", // Replace with actual artist name
    price: 2500, // Replace with actual price
    category: "Digital", // Replace with actual category
    image: "/images/IMG_3656.jpeg",
  },
  {
    id: 2,
    title: "Featured Artwork 2",
    artist: "Artist Name 2", // Replace with actual artist name
    price: 1800, // Replace with actual price
    category: "Paintings", // Replace with actual category
    image: "/images/IMG_3942.jpeg",
  },
  {
    id: 3,
    title: "Featured Artwork 3",
    artist: "Artist Name 3", // Replace with actual artist name
    price: 3200, // Replace with actual price
    category: "Photography", // Replace with actual category
    image: "/images/IMG_2240.jpeg",
  },
];
