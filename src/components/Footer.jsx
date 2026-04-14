import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full bg-gray-900 text-white px-6 md:px-20 lg:px-32 py-12">

      <div className="grid md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold">Grace Services</h2>
          <p className="mt-4 text-gray-400">
            Providing skilled manpower solutions for real estate businesses across Mumbai.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#about" className="hover:text-white transition">About</a></li>
            <li><a href="#services" className="hover:text-white transition">Services</a></li>
            <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold">Contact</h3>
          <p className="mt-4 text-gray-400">📞 +91 8657834312</p>
          <p className="text-gray-400">📧 graceservice25@gmail.com</p>
          <p className="text-gray-400">📍 Mumbai, India</p>

          {/* LinkedIn */}
          <div className="mt-4 flex items-center gap-3">
            <FaLinkedin className="text-blue-500 text-xl" />
            <a 
              href="https://www.linkedin.com/in/grace-services-429936395?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              LinkedIn Profile
            </a>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500">
        © {new Date().getFullYear()} Grace Services. All rights reserved.
      </div>

    </div>
  );
};

export default Footer;