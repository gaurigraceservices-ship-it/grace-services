import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logow.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navigate = useNavigate();

  // 🌗 Dark Mode State
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // 👤 Get logged-in user
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  // 🔓 Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  // 🌗 Apply theme
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  // 🔥 Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { path: "/", name: "Home" },
    { path: "/about", name: "About" },
    { path: "/services", name: "Services" },
    { path: "/contact", name: "Contact" },
  ];

  return (
    <>
      {/* 🍎 Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-black dark:bg-white z-[9999] transition-all duration-200"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* 🍎 Navbar */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto">
        <div
          className="flex justify-between items-center 
          bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl 
          border border-gray-200 dark:border-gray-700 
          shadow-[0_8px_30px_rgba(0,0,0,0.06)] 
          rounded-full px-6 md:px-10 py-3 transition-all duration-500"
        >

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 group">
            <img
              src={logo}
              alt="logo"
              className="h-10 transition duration-300 group-hover:scale-105"
            />
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              Grace Services
            </h1>
          </NavLink>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 ml-10">
            {links.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                className={({ isActive }) =>
                  `relative text-sm transition ${
                    isActive
                      ? "text-black dark:text-white font-medium"
                      : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3 ml-6">

            {/* 🌗 Toggle */}
            <button
              onClick={() => setDark(!dark)}
              className="px-3 py-2 rounded-full border border-gray-300 dark:border-gray-600 
                         bg-white/70 dark:bg-gray-800 
                         backdrop-blur-md transition"
            >
              {dark ? "☀️" : "🌙"}
            </button>

            {/* 👤 USER / ADMIN BADGE */}
            {user && (
              <span className="hidden md:block text-xs px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
                {user.role === "admin" ? "Admin" : "User"}
              </span>
            )}

            {/* 🔐 LOGIN / LOGOUT */}
            {!user ? (
              <Link to="/login">
                <button className="hidden md:block px-5 py-2 rounded-full 
                  border border-gray-300 dark:border-gray-600
                  text-sm">
                  Login
                </button>
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="hidden md:block px-5 py-2 rounded-full 
                  border border-red-400 text-red-500 text-sm"
              >
                Logout
              </button>
            )}

            {/* CTA */}
            <NavLink to="/hire" className="hidden md:block">
              <button className="px-5 py-2 rounded-full 
                bg-black text-white 
                dark:bg-white dark:text-black 
                text-sm font-medium 
                hover:opacity-90 active:scale-95 transition">
                Get Staff
              </button>
            </NavLink>

            {/* 🍔 Mobile */}
            <div
              className="md:hidden flex flex-col gap-1 cursor-pointer ml-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="w-5 h-[2px] bg-black dark:bg-white"></span>
              <span className="w-5 h-[2px] bg-black dark:bg-white"></span>
              <span className="w-5 h-[2px] bg-black dark:bg-white"></span>
            </div>

          </div>
        </div>

        {/* 📱 Mobile Menu */}
        <div
          className={`md:hidden mt-3 overflow-hidden transition-all duration-500 ${
            menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md flex flex-col items-center gap-4 py-6">

            {links.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
              >
                {link.name}
              </NavLink>
            ))}

            {/* 🔐 Mobile Login / Logout */}
            {!user ? (
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <button className="px-5 py-2 rounded-full border text-sm">
                  Login
                </button>
              </Link>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="px-5 py-2 rounded-full border text-red-500 text-sm"
              >
                Logout
              </button>
            )}

            <NavLink to="/hire" onClick={() => setMenuOpen(false)}>
              <button className="bg-black text-white dark:bg-white dark:text-black px-5 py-2 rounded-full text-sm">
                Get Staff
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;