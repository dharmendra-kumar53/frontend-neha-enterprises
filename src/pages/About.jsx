import React from "react";
import { assets } from "../assets/assets"; // Make sure assets.p8 exists

const About = () => {
  return (
    <div className="px-6 py-12 max-w-7xl mx-auto text-gray-800">
      <h1 className="text-4xl sm:text-5xl font-bold text-center mb-4">
        About <span className="text-blue-600">Furniture</span>
      </h1>
      <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
        We don't just make furniture. We craft comfort, elegance, and lasting memories — one piece at a time.
      </p>

      {/* Section 1 */}
      <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-3 text-blue-600">Our Story</h2>
          <p className="text-gray-700 leading-relaxed">
            Founded in 2010, <strong>Furniture Co.</strong> started with a simple mission — to bring thoughtfully designed, affordable furniture into homes around the world. From cozy living rooms to functional workspaces, our collections are inspired by life itself.
          </p>
        </div>
        <img
          src={assets.p8} // Replace with real image
          alt="Crafting furniture"
          className="rounded-lg shadow-md w-full h-72 object-cover"
        />
      </div>

      {/* Section 2 */}
      <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
        <img
          src={assets.p3} // Replace with another image
          alt="High quality materials"
          className="rounded-lg shadow-md w-full h-72 object-cover"
        />
        <div>
          <h2 className="text-2xl font-semibold mb-3 text-blue-600">Built to Last</h2>
          <p className="text-gray-700 leading-relaxed">
            We use only premium, eco-friendly materials and time-tested craftsmanship. Each piece is created to withstand everyday life — beautiful today, reliable for years to come.
          </p>
        </div>
      </div>

      {/* Section 3 */}
      <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-3 text-blue-600">Customer First</h2>
          <p className="text-gray-700 leading-relaxed">
            Our customers are at the heart of everything we do. Whether you’re furnishing a new home or updating a single room, our team is here to guide, inspire, and support.
          </p>
        </div>
        <img
          src={assets.p2} // Replace with another image
          alt="Customer support"
          className="rounded-lg shadow-md w-full h-72 object-cover"
        />
      </div>

      {/* Bottom Image */}
      <div className="mt-20 text-center">
        <img
          src={assets.p1} // Your large showroom or brand image
          alt="Our Showroom"
          className="rounded-xl shadow-lg w-full object-cover max-h-[450px]"
        />
        <p className="text-sm text-gray-500 mt-2">Step inside our flagship showroom – Where comfort meets design.</p>
      </div>
    </div>
  );
};

export default About;
