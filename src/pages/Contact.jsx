import React from "react";

const Contact = () => {
  return (
    <div className="px-6 py-12 max-w-7xl mx-auto">
      <h1 className="text-4xl sm:text-5xl font-bold text-center text-gray-800 mb-4">
        Get in <span className="text-blue-600">Touch</span>
      </h1>
      <p className="text-center text-gray-600 mb-12">
        We'd love to hear from you! Whether you're curious about features, a demo, or anything else — our team is ready to answer all your questions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Section - Contact Info */}
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">🏢 Showroom Address</h2>
            <p className="text-gray-600 mt-1">Ambara,Saraiya,Muzaffarpur,Bihar,India</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700">📞 Phone</h2>
            <p className="text-gray-600 mt-1">+91 8210610423</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700">📧 Email</h2>
            <p className="text-gray-600 mt-1">nehaenterprises@gmail.com</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700">🕒 Business Hours</h2>
            <p className="text-gray-600 mt-1">Mon - Sat: 7am - 8pm</p>
          </div>

          {/* Optional: Map or Image */}
          <div className="rounded overflow-hidden shadow-md mt-4">
            <iframe
            
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d224.13265832511988!2d85.0797003318351!3d25.99680318184029!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed3701d2290ebb%3A0xf22ec1d609b53be7!2sNEHA%20ENTERPRISES!5e0!3m2!1sen!2sus!4v1745660569229!5m2!1sen!2sus"
              title="Our Location"
              className="w-full h-64 border-0"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Right Section - Contact Form */}
        <form className="bg-gray-50 rounded-lg shadow-md p-8 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Neha Enterprises"
              className="mt-1 w-full p-3 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="nehaenterprises@gmail.com"
              className="mt-1 w-full p-3 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              placeholder="Tell us what you're looking for..."
              className="mt-1 w-full p-3 border border-gray-300 rounded"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-4xl text-lg font-medium transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
