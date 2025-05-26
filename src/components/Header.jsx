import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';  // Ensure that this imports correctly

// Example component to display images.
const ExampleCarouselImage = ({ src, alt }) => (
  <img
    className="w-full h-[55vh] object-cover"
    src={src}
    alt={alt}
  />
);

const Header = () => {
  const [index, setIndex] = useState(0);

  // Assuming you have the following images in your assets.
  const images = [
    assets.p1, // You must import or define assets.p1, p2, etc.
    assets.p2,
    assets.p3 // Similarly for p2, p3 etc.
  ];

  // Function to handle navigation
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [images.length]);

  return (
    <div className="relative w-full">
      {/* Image Slider */}
      <div className="overflow-hidden relative">
        {/* Carousel items */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((src, idx) => (
            <div className="w-full flex-shrink-0" key={idx}>
              <ExampleCarouselImage src={src} alt={`Slide ${idx + 1}`} />
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <button
          onClick={() => handleSelect((index - 1 + images.length) % images.length)}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-600 text-white px-4 py-2 rounded-full opacity-50 hover:opacity-100 transition"
        >
          &lt;
        </button>

        <button
          onClick={() => handleSelect((index + 1) % images.length)}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-600 text-white px-4 py-2 rounded-full opacity-50 hover:opacity-100 transition"
        >
          &gt;
        </button>
      </div>

      {/* Slide Captions */}
      <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black to-transparent">
  <h3 className="text-white pl-20 g-5 text-4xl sm:text-5xl font-bold">Special {index + 1} Offer</h3>
  <p className="text-white pl-20 pb-25 text-lg sm:text-2xl font-semibold">All Furniture 10% Discount</p>
</div>

    </div>
  );
}

export default Header;
