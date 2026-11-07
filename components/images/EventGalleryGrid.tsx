"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2, X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface EventGalleryGridProps {
  sectionTitle?: string;
}

const PHOTOS = [
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  "https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?w=800&q=80",
  "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80",
  "https://images.unsplash.com/photo-1530099486328-e021101a494a?w=800&q=80",
  "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=800&q=80",
  "https://images.unsplash.com/photo-1605537964076-bd0b8525cee0?w=800&q=80",
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80",
  "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80",
  "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80",
  "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
  "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&q=80",
];

export default function EventGalleryGrid({ sectionTitle = "Seminar Gallery Highlights" }: EventGalleryGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  const prevImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + PHOTOS.length) % PHOTOS.length);
    }
  };
  const nextImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % PHOTOS.length);
    }
  };

  return (
    <section className="w-full px-5 sm:px-10 lg:px-16 xl:px-20 py-12 lg:py-20 font-['Inter',sans-serif]">
      <div className="max-w-[1640px] mx-auto flex flex-col gap-10">

        {/* ── Section Title ── */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-green/10 text-brand-green font-semibold text-xs sm:text-sm">
            <Camera size={16} />
            <span>Event Photo Collection</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#00142d] font-['Poppins',sans-serif]">
            {sectionTitle}
          </h2>
          <div className="h-1.5 w-28 rounded-full bg-linear-to-r from-brand-green to-brand-blue" />
        </div>

        {/* ── Photo Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {PHOTOS.map((src, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(idx)}
              className="group relative h-65 sm:h-70 rounded-3xl overflow-hidden cursor-pointer bg-gray-100 border border-[#e2e8f0] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <Image
                src={src}
                alt={`Seminar moment ${idx + 1}`}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                unoptimized
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
                <span className="text-white font-medium text-sm font-['Lexend',sans-serif]">
                  Photo #{idx + 1}
                </span>
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <Maximize2 size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Lightbox Modal ── */}
        {selectedIndex !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={closeLightbox}
          >
            <Button variant="glass"
              size="icon"
              onClick={closeLightbox}
              className="absolute top-6 right-6 size-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-50 shadow-none border-0"
              aria-label="Close preview"
            >
              <X size={24} />
            </Button>

            <Button variant="glass"
              size="icon"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 sm:left-8 size-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-50 shadow-none border-0"
              aria-label="Previous photo"
            >
              <ChevronLeft size={28} />
            </Button>

            <div
              className="relative max-w-5xl max-h-[80vh] w-full h-full rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={PHOTOS[selectedIndex]}
                alt={`Photo ${selectedIndex + 1}`}
                fill
                className="object-contain"
                unoptimized
                priority
              />
            </div>

            <Button variant="glass"
              size="icon"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 sm:right-8 size-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-50 shadow-none border-0"
              aria-label="Next photo"
            >
              <ChevronRight size={28} />
            </Button>
          </div>
        )}

      </div>
    </section>
  );
}
