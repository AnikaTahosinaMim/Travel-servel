import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-6 py-10">
      <div className="grid md:grid-cols-3 gap-8">

        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold mb-3">About Us</h2>
          <p className="text-sm text-gray-400">
            We provide high-quality services and products to make your life easier.
            Our goal is to build trust and deliver value.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-bold mb-3">Contact</h2>
          <p className="text-sm text-gray-400">Email: ummehabiba@gmail.com</p>
          <p className="text-sm text-gray-400">Phone: +880 1234-567890</p>
          <p className="text-sm text-gray-400">Location: Bangladesh</p>
        </div>

        {/* Social Links */}
        <div>
          <h2 className="text-xl font-bold mb-3">Follow Us</h2>
          <div className="flex gap-4">
            <Link href="#">Facebook</Link>
            <Link href="#">Instagram</Link>
            <Link href="#">Twitter</Link>
            <Link href="#">LinkedIn</Link>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="text-center mt-8 border-t border-gray-700 pt-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;