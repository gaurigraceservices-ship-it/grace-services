import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import HireStaff from "./pages/HireStaff";
import ApplyJobs from "./pages/ApplyJobs";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";

function App() {
  const location = useLocation();

  const [darkMode, setDarkMode] = useState(false);

  // Load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDarkMode(true);
  }, []);

  // Apply theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="bg-[#f8f9fb] dark:bg-[#0f1115] transition-colors duration-500 min-h-screen">
      
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/hire" element={<HireStaff />} />
          <Route path="/apply" element={<ApplyJobs />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AnimatePresence>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;