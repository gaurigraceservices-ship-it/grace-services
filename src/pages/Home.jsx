import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import MagneticButton from "../components/MagneticButton";

const pageAnimation = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -40 },
  transition: { duration: 0.6, ease: "easeInOut" }
};

// 🔥 Counter
const Counter = ({ end, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const increment = end / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [end]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

const Home = () => {
  const stats = [
    { value: 500, suffix: "+", label: "Candidates Placed" },
    { value: 50, suffix: "+", label: "Partner Companies" },
    { value: 24, suffix: "hrs", label: "Hiring Turnaround" }
  ];

  return (
    <motion.div
      variants={pageAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full bg-[#f8f9fb] dark:bg-[#0f1115] transition-colors duration-500"
    >
      {/* 🌟 HERO */}
      <div className="relative px-6 md:px-20 lg:px-32 pt-40 pb-28 overflow-hidden">
        
        <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-gray-200 dark:bg-gray-700 opacity-30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-gray-300 dark:bg-gray-600 opacity-20 rounded-full blur-3xl"></div>

        <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">

          <div>
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-5xl md:text-6xl font-semibold text-gray-900 dark:text-white leading-tight tracking-tight"
            >
              Connecting Real Estate Businesses with{" "}
              <span className="text-purple-600 dark:text-purple-400">
                Skilled Workforce
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg text-gray-500 dark:text-gray-400 leading-relaxed"
            >
              Fast, reliable manpower solutions for sales support, site visits,
              and promotions across Mumbai.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-10 flex gap-4 flex-wrap"
            >
              <Link to="/hire">
                <MagneticButton>
                  <button className="px-7 py-3 rounded-xl bg-black text-white dark:bg-white dark:text-black font-medium">
                    Hire Staff
                  </button>
                </MagneticButton>
              </Link>

              <Link to="/apply">
                <MagneticButton>
                  <button className="px-7 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-white/5 backdrop-blur-md text-gray-900 dark:text-white">
                    Apply for Jobs
                  </button>
                </MagneticButton>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
              alt="team"
              className="rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] w-full hover:scale-105 transition"
            />
          </motion.div>

        </div>
      </div>

      {/* 📊 STATS */}
      <div className="px-6 md:px-20 lg:px-32 pb-28">
        <div className="grid md:grid-cols-3 gap-8">

          {stats.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-8 rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow text-center"
            >
              <h2 className="text-4xl font-semibold text-gray-900 dark:text-white">
                <Counter end={item.value} suffix={item.suffix} />
              </h2>

              <p className="mt-3 text-gray-500 dark:text-gray-400">{item.label}</p>
            </motion.div>
          ))}

        </div>
      </div>

      {/* 🚀 HOW IT WORKS */}
      <div className="px-6 md:px-20 lg:px-32 pb-28">

        <h2 className="text-4xl md:text-5xl font-semibold text-center text-gray-900 dark:text-white">
          How It Works
        </h2>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {[
            { step: "01", title: "Submit Request", desc: "Tell us your hiring needs." },
            { step: "02", title: "Get Matched", desc: "We connect you with candidates." },
            { step: "03", title: "Start Working", desc: "Begin within 24 hours." }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="p-8 rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
            >
              <p className="text-gray-400">{item.step}</p>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{item.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 💼 WHAT WE OFFER */}
      <div className="px-6 md:px-20 lg:px-32 pb-32">

        <h2 className="text-4xl md:text-5xl font-semibold text-center text-gray-900 dark:text-white">
          What We Offer
        </h2>

        <div className="mt-16 grid md:grid-cols-4 gap-8">
          {[
            { title: "Sales Executives", desc: "Site visits & client handling." },
            { title: "Telecallers", desc: "Boost your lead conversion." },
            { title: "Field Staff", desc: "Reliable on-ground workforce." },
            { title: "Promoters", desc: "Event & on-site promotions." }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, scale: 1.03 }}
              className="p-8 rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{item.title}</h3>
              <p className="mt-3 text-gray-500 dark:text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

    </motion.div>
  );
};

export default Home;