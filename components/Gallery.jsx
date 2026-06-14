"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const captions = ["pretty 🌸", "my favourite 💗", "stunning ✨", "adorable 🥰", "gorgeous 🌷", "perfect 💕"];
const photos = [1, 2, 3, 4, 5, 6].map((n, i) => ({
  src: `/images/photo${n}.jpeg`,
  caption: captions[i % captions.length],
}));
const tilts = [-3, 2, -2, 3, -1.5, 2.5];

export default function Gallery() {
  const [index, setIndex] = useState(-1);

  return (
    <div className="card bg-gradient-to-br from-white to-[#fff4f8]">
      <h2 className="text-pink-deep text-2xl font-cute mb-1">Our Gallery 💗</h2>
      <p className="text-[#a06a7e] mb-5">Tap a photo to view it bigger.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
        {photos.map((p, i) => (
          <motion.figure
            key={p.src}
            className="relative m-0 bg-white p-2.5 pb-9 rounded-md shadow-cute cursor-pointer"
            initial={{ rotate: tilts[i % tilts.length] }}
            whileHover={{ scale: 1.06, rotate: 0, zIndex: 5 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={() => setIndex(i)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.src} alt="Arpita" loading="lazy" className="w-full h-[200px] object-cover block rounded-sm" />
            <figcaption className="absolute bottom-2 left-0 right-0 text-center font-cute text-pink-deep text-sm">
              {p.caption}
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        index={Math.max(index, 0)}
        close={() => setIndex(-1)}
        slides={photos.map((p) => ({ src: p.src }))}
        animation={{ fade: 300, swipe: 300 }}
      />
    </div>
  );
}
