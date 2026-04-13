import { motion } from "framer-motion";
import { useState } from "react";

const Contact = () => {
  const [focused, setFocused] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    {
      title: "Phone",
      value: "+91 88799 65634",
      link: "tel:+918879965634",
    },
    {
      title: "Email",
      value: "graceservice25@gmail.com",
      link: "mailto:graceservice25@gmail.com",
    },
    {
      title: "Location",
      value: "Santacruz West, Mumbai",
      link: "https://www.google.com/maps?q=Santacruz+West+Mumbai",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full min-h-screen px-6 md:px-20 lg:px-32 pt-40 pb-28 bg-[#f8f9fb] dark:bg-[#0f172a] relative overflow-hidden"
    >

      {/* Glow */}
      <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-gray-200 dark:bg-gray-700 opacity-30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-gray-300 dark:bg-gray-800 opacity-20 blur-3xl rounded-full"></div>

      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white tracking-tight">
          Get in Touch
        </h2>
        <p className="mt-4 text-gray-500 dark:text-gray-300 text-lg">
          Looking to hire staff or find job opportunities? Contact us today.
        </p>
      </div>

      {/* Layout */}
      <div className="grid md:grid-cols-2 gap-12 lg:gap-16 mt-20 items-start relative z-10">

        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/70 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
        >

          {submitted ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Message Sent 🚀
              </h3>
              <p className="text-gray-500 dark:text-gray-300 mt-2">
                We'll get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Inputs */}
              {["name", "email"].map((field) => (
                <div key={field} className="relative">
                  <input
                    onFocus={() => setFocused(field)}
                    onBlur={() => setFocused(null)}
                    className="w-full px-5 pt-6 pb-3 rounded-xl bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-white/20 border border-transparent focus:border-gray-300 dark:focus:border-white/20 outline-none transition"
                  />
                  <label
                    className={`absolute left-5 transition-all text-gray-500 dark:text-gray-300 
                    ${focused === field ? "top-2 text-xs" : "top-4 text-sm"}`}
                  >
                    {field === "name" ? "Your Name" : "Your Email"}
                  </label>
                </div>
              ))}

              {/* Message */}
              <div className="relative">
                <textarea
                  rows="4"
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  className="w-full px-5 pt-6 pb-3 rounded-xl bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-white/20 border border-transparent focus:border-gray-300 dark:focus:border-white/20 outline-none transition"
                />
                <label
                  className={`absolute left-5 transition-all text-gray-500 dark:text-gray-300 
                  ${focused === "message" ? "top-2 text-xs" : "top-4 text-sm"}`}
                >
                  Message
                </label>
              </div>

              {/* Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-4 rounded-xl bg-black text-white font-medium tracking-wide 
                shadow-lg hover:shadow-2xl transition"
              >
                Send Message
              </motion.button>

            </form>
          )}
        </motion.div>

        {/* INFO */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-5"
        >
          {contactInfo.map((item, i) => (
            <a key={i} href={item.link} target="_blank" rel="noopener noreferrer">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="group bg-white/70 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm hover:shadow-xl transition"
              >
                <h3 className="text-sm text-gray-400 dark:text-gray-300 mb-1">
                  {item.title}
                </h3>

                <p className="text-lg font-medium text-gray-900 dark:text-white group-hover:translate-x-1 transition">
                  {item.value}
                </p>
              </motion.div>
            </a>
          ))}
        </motion.div>

      </div>

      {/* WhatsApp */}
      <a
        href="https://wa.me/918879965634?text=Hi%20I%20want%20to%20know%20more"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          whileHover={{ scale: 1.1 }}
          className="bg-black text-white p-4 rounded-full shadow-2xl"
        >
          💬
        </motion.div>
      </a>

    </motion.div>
  );
};

export default Contact;