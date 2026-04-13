import { motion } from "framer-motion";
import { useRef } from "react";

const MagneticButton = ({ children, className }) => {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    ref.current.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const handleMouseLeave = () => {
    ref.current.style.transform = `translate(0px, 0px)`;
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
      className={`inline-block transition-transform duration-200 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;