import React, { useState } from "react";
import { motion } from "framer-motion";

const HireStaff = () => {
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    role: "",
    staffCount: "",
    location: "",
    duration: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const roles = ["Sales Executives", "Telecallers", "GREs", "Event Staff"];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      alert("Enter valid 10-digit phone number");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);

      setFormData({
        company: "",
        name: "",
        email: "",
        phone: "",
        role: "",
        staffCount: "",
        location: "",
        duration: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen px-6 md:px-20 lg:px-32 pt-40 pb-28 
      bg-[#f8f9fb] dark:bg-[#0f1115] 
      transition-colors duration-500 relative overflow-hidden"
    >

      {/* Glow */}
      <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-gray-200 dark:bg-gray-700 opacity-30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-gray-300 dark:bg-gray-800 opacity-20 blur-3xl rounded-full"></div>

      <div className="grid md:grid-cols-2 gap-16 relative z-10">

        {/* LEFT */}
        <div>
          <h2 className="text-5xl font-semibold text-gray-900 dark:text-white leading-tight">
            Hire Staff <br />
            <span className="text-gray-600 dark:text-gray-300">
              Smarter & Faster
            </span>
          </h2>

          <p className="mt-6 text-gray-500 dark:text-gray-300">
            Tell us your requirement and we’ll handle the rest.
          </p>

          {/* Preview Card */}
          <div className="mt-10 p-6 rounded-2xl 
            bg-white/70 dark:bg-gray-800/70 
            backdrop-blur-xl 
            border border-gray-200 dark:border-gray-700 
            shadow-md"
          >
            <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Live Request Preview
            </h4>

            <p className="text-gray-800 dark:text-gray-200 font-medium">
              Hiring: {formData.role || "—"}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              Staff: {formData.staffCount || "—"}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Location: {formData.location || "—"}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Duration: {formData.duration || "—"}
            </p>
          </div>
        </div>

        {/* FORM */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/70 dark:bg-gray-800/70 
          backdrop-blur-xl 
          border border-gray-200 dark:border-gray-700 
          shadow-[0_20px_50px_rgba(0,0,0,0.06)] 
          rounded-3xl p-8"
        >
          {submitted ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                🎉 Request Sent
              </h3>
              <p className="text-gray-500 dark:text-gray-300 mt-2">
                Our team will contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">

              <input name="company" value={formData.company} onChange={handleChange} placeholder="Company Name" className="input" />

              <input name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required className="input" />

              <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="input" />

              <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required className="input" />

              <select name="role" value={formData.role} onChange={handleChange} className="input" required>
                <option value="">Select Role</option>
                {roles.map((r, i) => (
                  <option key={i}>{r}</option>
                ))}
              </select>

              <input name="staffCount" value={formData.staffCount} onChange={handleChange} placeholder="Number of Staff" className="input" />

              <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="input" />

              <input name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration (e.g. 1 week)" className="input" />

              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Additional Requirements" className="input" />

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={loading}
                className="w-full py-4 rounded-xl 
                bg-black text-white 
                dark:bg-white dark:text-black 
                font-medium transition"
              >
                {loading ? "Sending..." : "Submit Request"}
              </motion.button>

            </form>
          )}
        </motion.div>

      </div>

      {/* Inputs */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 14px 16px;
          border-radius: 12px;
          background: #f3f4f6;
          border: 1px solid transparent;
          outline: none;
          transition: all 0.3s;
        }

        .dark .input {
          background: #1f2937;
          color: white;
        }

        .input:focus {
          background: white;
          border-color: #d1d5db;
        }

        .dark .input:focus {
          background: #111827;
          border-color: #374151;
        }
      `}</style>

    </motion.div>
  );
};

export default HireStaff;