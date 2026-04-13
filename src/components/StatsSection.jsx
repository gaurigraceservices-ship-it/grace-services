import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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

const stats = [
  { value: 500, suffix: "+", label: "Candidates Placed" },
  { value: 50, suffix: "+", label: "Partner Companies" },
  { value: 24, suffix: "hrs", label: "Hiring Turnaround" },
];

const StatsSection = () => {
  return (
    <div className="px-6 md:px-20 lg:px-32 pb-28">
      <div className="grid md:grid-cols-3 gap-8">

        {stats.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="group p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-gray-200 
            shadow-[0_10px_30px_rgba(0,0,0,0.05)] 
            hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] 
            transition duration-500 text-center relative overflow-hidden"
          >

            {/* Glow on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition 
            bg-gradient-to-br from-gray-200/30 to-transparent"></div>

            <h2 className="text-4xl font-semibold text-gray-900 relative z-10">
              <Counter end={item.value} suffix={item.suffix} />
            </h2>

            <p className="mt-3 text-gray-500 relative z-10 group-hover:text-black transition">
              {item.label}
            </p>

          </motion.div>
        ))}

      </div>
    </div>
  );
};

export default StatsSection;