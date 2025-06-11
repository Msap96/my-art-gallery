import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="container mx-auto px-4">
      <header className="py-6">
        <div className="flex items-center gap-4">
          <Image
            src="/Art-IMGs/DalleGalleryImage.webp"
            alt="Art of Sapienza Gallery Logo"
            width={80}
            height={80}
            className=""
          />
          <h1 className="text-3xl font-bold font-mono text-white">
            Art of Sapienza Gallery & Appraisals
          </h1>
        </div>
        <nav className="mt-4">{/* Add navigation links here */}</nav>
      </header>

      <section className="my-8">
        <h2 className="text-2xl font-semibold mb-4">Featured Artworks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative w-full h-96">
            <Image
              src="/Art-IMGs/IMG_3656.webp"
              alt="Featured Artwork 1"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
            />
          </div>
          <div className="relative w-full h-96">
            <Image
              src="/Art-IMGs/IMG_3942.webp"
              alt="Featured Artwork 2"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
            />
          </div>
          <div className="relative w-full h-96">
            <Image
              src="/Art-IMGs/IMG_2240.webp"
              alt="Featured Artwork 3"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
            />
          </div>
        </div>
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
          <Link
            href="/virtual-gallery"
            className="block p-4 border rounded-lg hover:bg-gray-100 transition-colors md:col-span-2"
          >
            <h3 className="text-xl font-medium">Virtual Gallery Tour</h3>
            <p>Explore our gallery espacio in an immersive 3D experience.</p>
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
