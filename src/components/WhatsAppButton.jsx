import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "918879965634";

  const message = "Hi Grace Services! I’m interested in your manpower services. Can you share more details?";

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 group">

      {/* Tooltip */}
      <div className="absolute right-16 bottom-3 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap">
        Chat with us 👋
      </div>

      {/* Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300"
      >
        {/* Pulse Animation */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>

        {/* Icon */}
        <FaWhatsapp className="text-2xl relative z-10" />
      </a>

    </div>
  );
};

export default WhatsAppButton;