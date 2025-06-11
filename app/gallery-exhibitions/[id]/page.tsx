import React from "react";
import Image from "next/image";
import Link from "next/link";
import { exhibitions } from "@/app/data/exhibitions";

export default async function ArtworkPage({
  params,
}: {
  params: { id: string };
}) {
  const artwork = exhibitions.find((art) => art.id === parseInt(params.id));

  if (!artwork) {
    return <div>Artwork not found</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Link
        href="/gallery-exhibitions"
        className="text-blue-600 hover:text-blue-800 transition-colors mb-6 inline-block"
      >
        ← Back to Gallery
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left side - Image */}
        <div className="relative w-full h-[600px]">
          <Image
            src={artwork.imageSrc}
            alt={artwork.title}
            fill
            style={{ objectFit: "contain" }}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Right side - Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-2">{artwork.title}</h1>
          <h2 className="text-xl mb-4">Hand Embellished</h2>
          <p className="text-xl mb-6">{artwork.price}</p>

          <div className="space-y-4 mb-6">
            <ul className="list-none space-y-2">
              <li>{artwork.details.type}</li>
              <li>{artwork.details.size}</li>
              <li>{artwork.details.medium}</li>
              <li>{artwork.details.features}</li>
              <li>{artwork.details.edition}</li>
            </ul>
          </div>

          <p className="text-gray-700 mb-6">{artwork.description}</p>

          <div className="space-y-4">
            <button className="w-full bg-black text-white py-3 px-4 rounded hover:bg-gray-800 transition-colors">
              ADD TO CART
            </button>
            <button className="w-full bg-[#5469d4] text-white py-3 px-4 rounded hover:bg-[#4559c4] transition-colors">
              Buy with Shop Pay
            </button>
            <button className="w-full text-gray-600 py-3 px-4 border rounded hover:bg-gray-50 transition-colors">
              More payment options
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
