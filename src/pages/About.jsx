import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6 }}
      className="w-full px-6 md:px-20 lg:px-32 pt-40 pb-28 
      bg-[#f8f9fb] dark:bg-[#0f1115] 
      transition-colors duration-500 relative overflow-hidden"
    >

      {/* 🍎 Glow */}
      <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-gray-200 dark:bg-gray-700 opacity-30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-gray-300 dark:bg-gray-800 opacity-20 blur-3xl rounded-full"></div>

      <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">

        {/* 🍎 Image */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
            alt="real estate"
            className="rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] w-full transition duration-500 hover:scale-[1.02]"
          />

          {/* overlay adjusted for dark */}
          <div className="absolute inset-0 rounded-3xl bg-white/10 dark:bg-black/20 backdrop-blur-sm"></div>
        </motion.div>

        {/* 🍎 Text */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white tracking-tight">
            About Grace Services
          </h2>

          <p className="mt-6 text-gray-500 dark:text-gray-300 text-lg leading-relaxed">
            Grace Services is a Mumbai-based real estate manpower company dedicated
            to providing skilled and reliable workforce solutions.
          </p>

          <p className="mt-4 text-gray-500 dark:text-gray-300 leading-relaxed">
            We specialize in telecallers, Ground Response Executives (GREs),
            and event staff to support sales, site visits, and promotional campaigns.
          </p>

          <p className="mt-4 text-gray-500 dark:text-gray-300 leading-relaxed">
            Our mission is to bridge the gap between companies and talent with
            fast hiring, quality candidates, and seamless coordination.
          </p>

          <p className="mt-4 text-gray-500 dark:text-gray-300 leading-relaxed">
            We also empower job seekers with flexible opportunities and
            professional growth.
          </p>
        </motion.div>

      </div>

    </motion.div>
  );
};

export default About;