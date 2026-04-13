import { motion } from "framer-motion";

const Services = () => {
  const services = [
    { icon: "💼", title: "Sales Executives", desc: "Skilled professionals to handle client interactions and boost property sales." },
    { icon: "🏢", title: "Site Assistants", desc: "Reliable staff for managing site visits and assisting customers on location." },
    { icon: "📢", title: "Promotional Teams", desc: "Energetic teams to promote projects through campaigns and events." },
    { icon: "📞", title: "Telecallers", desc: "Experienced telecallers for lead generation, follow-ups, and customer engagement." },
    { icon: "🏗️", title: "GREs (Site Executives)", desc: "Skilled professionals for handling site visits and client coordination." },
    { icon: "🎤", title: "Event Staff", desc: "Reliable manpower for promotional campaigns and real estate events." },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full px-6 md:px-20 lg:px-32 pt-40 pb-28 bg-[#f8f9fb] relative overflow-hidden"
    >

      {/* 🍎 Background glow (SUBTLE now) */}
      <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-gray-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-gray-300 rounded-full blur-3xl opacity-20"></div>

      {/* Heading */}
      <div className="text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight">
          Our Services
        </h2>

        <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
          We provide skilled manpower solutions tailored for real estate companies.
        </p>
      </div>

      {/* 🍎 Cards */}
      <div className="grid md:grid-cols-3 gap-8 mt-20 relative z-10">

        {services.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="group p-8 rounded-3xl 
            bg-white/70 backdrop-blur-xl border border-gray-200 
            shadow-[0_10px_30px_rgba(0,0,0,0.05)] 
            hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] 
            transition duration-300 text-center"
          >

            {/* Icon */}
            <div className="w-14 h-14 mx-auto flex items-center justify-center 
            rounded-full bg-gray-100 text-2xl 
            group-hover:scale-110 transition">
              {item.icon}
            </div>

            {/* Title */}
            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              {item.title}
            </h3>

            {/* Description */}
            <p className="mt-3 text-gray-500 text-sm leading-relaxed">
              {item.desc}
            </p>

          </motion.div>
        ))}

      </div>

    </motion.div>
  );
};

export default Services;