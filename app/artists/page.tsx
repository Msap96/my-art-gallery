"use client";

import React from "react";
import Link from "next/link";
import { Instagram } from "lucide-react";
import { artistBios } from "@/app/data/artistBios";

export default function ArtistsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Our Artists</h1>
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          ← Back to Home
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {artistBios.map((artist) => (
          <div
            key={artist.name}
            className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 hover:bg-opacity-20 transition-all duration-300"
          >
            <h2 className="text-2xl font-bold mb-3">{artist.name}</h2>
            <p className="text-gray-300 mb-4">{artist.bio}</p>
            <div className="flex items-center space-x-4">
              <a
                href={artist.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Website
              </a>
              <a
                href={`https://instagram.com/${artist.socialMedia.instagram.replace(
                  "@",
                  ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors flex items-center"
              >
                <Instagram className="w-4 h-4 mr-1" />
                {artist.socialMedia.instagram}
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
