import Link from "next/link";

export default function VirtualGalleryPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/" className="text-blue-500 hover:underline">
          &larr; Back to Home
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-center">
        Virtual Gallery Tour
      </h1>
      <div className="aspect-w-16 aspect-h-9">
        {/* Optional: for maintaining aspect ratio */}
        <iframe
          src="https://www.artsteps.com/embed/683f4173a194682fdc872dc1/560/315"
          width="100%"
          height="800" // Increased height for a dedicated page
          frameBorder="0"
          allowFullScreen
          title="Artsteps Virtual Gallery"
        ></iframe>
      </div>
    </main>
  );
}
