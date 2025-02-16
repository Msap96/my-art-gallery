"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronDown } from "lucide-react";
import CartIcon from "@/components/CartIcon";
import { exhibitions } from "@/app/data/exhibitions";

export default function GalleryExhibitions() {
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

  // Filter exhibitions based on search query and category
  const filteredExhibitions = exhibitions.filter(
    (artwork) =>
      (selectedCategory === "All" || artwork.category === selectedCategory) &&
      (artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artwork.artist.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gallery Exhibitions</h1>
        <div className="flex items-center space-x-4">
          <CartIcon />
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Search and filter section */}
      <div className="sticky top-20 z-40 px-6 py-4 bg-black bg-opacity-10 backdrop-blur-sm mb-8">
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

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExhibitions.map((artwork) => (
          <Link
            href={artwork.details.link || `/gallery-exhibitions/${artwork.id}`}
            key={artwork.id}
            target={artwork.details.link ? "_blank" : "_self"}
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
                  {artwork.details.link ? "View on OpenSea" : "View Details"}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold">{artwork.title}</h2>
              <p className="text-gray-600">{artwork.artist}</p>
              {artwork.details.platform && (
                <span className="inline-block mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded-full">
                  NFT Collection
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
