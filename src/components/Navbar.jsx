import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logow.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const navigate = useNavigate();

  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  // 🔐 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  // 🌗 THEME
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  // 🔥 SCROLL PROGRESS
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

  // 🔐 LINKS (ADMIN ONLY)
  const links = [
    { path: "/", name: "Home" },
    { path: "/about", name: "About" },
    { path: "/services", name: "Services" },
    { path: "/contact", name: "Contact" },
    ...(user?.role === "admin"
      ? [{ path: "/admin", name: "Admin" }]
      : []),
  ];

  return (
    <>
      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-black dark:bg-white z-[9999]"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navbar */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto">
        <div className="flex justify-between items-center 
          bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl 
          border border-gray-200 dark:border-gray-700 
          shadow-[0_8px_30px_rgba(0,0,0,0.06)] 
          rounded-full px-6 md:px-10 py-3">

          {/* ✅ SAME LOGO */}
          <NavLink to="/" className="flex items-center gap-2">
            <img src={logo} alt="logo" className="h-10" />
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              Grace Services
            </h1>
          </NavLink>

          {/* LINKS */}
          <div className="hidden md:flex items-center gap-8 ml-10">
            {links.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-black dark:text-white font-medium"
                    : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3 ml-6">

            {/* THEME */}
            <button
              onClick={() => setDark(!dark)}
              className="px-3 py-2 rounded-full border border-gray-300 dark:border-gray-600"
            >
              {dark ? "☀️" : "🌙"}
            </button>

            {/* 🔐 LOGIN / LOGOUT */}
            {!user ? (
              <Link to="/login">
                <button className="hidden md:block px-5 py-2 rounded-full border text-sm">
                  Login
                </button>
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="hidden md:block px-5 py-2 rounded-full border text-red-500 text-sm"
              >
                Logout
              </button>
            )}

            {/* CTA */}
            <NavLink to="/hire" className="hidden md:block">
              <button className="px-5 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm">
                Get Staff
              </button>
            </NavLink>

            {/* MOBILE */}
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

        {/* MOBILE MENU */}
        <div
          className={`md:hidden mt-3 transition-all duration-500 ${
            menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md flex flex-col items-center gap-4 py-6">

            {links.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}

            {!user ? (
              <Link to="/login">
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

            <NavLink to="/hire">
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