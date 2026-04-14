import { supabase } from "../supabase";
import { motion } from "framer-motion";
import { useState } from "react";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  // ✅ FORM STATES
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");

  // ✅ SUBMIT FUNCTION
  const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Submitting:", name, email, message, phone);

  try {
    const { data, error } = await supabase
      .from("contacts")
      .insert([
        { Name, Email, Message, Phone }
      ])
      .select(); // VERY IMPORTANT

    console.log("Response:", data, error);

    if (error) {
      alert("❌ Error saving data");
      console.log(error);
      return; // STOP here
    }

    // ✅ Only run if success
    alert("✅ Data saved!");
    setSubmitted(true);

    setName("");
    setEmail("");
    setMessage("");
    setPhone("");

    setTimeout(() => setSubmitted(false), 3000);

  } catch (err) {
    console.log("Catch Error:", err);
    alert("❌ Something went wrong");
  }
};

  return (
    <motion.div className="w-full min-h-screen px-6 md:px-20 lg:px-32 pt-40 pb-28">

      <div className="grid md:grid-cols-2 gap-12 mt-20">

        {/* FORM */}
        <div>

          {submitted ? (
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold">Message Sent 🚀</h3>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* NAME */}
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full p-4 border rounded-xl"
                required
              />

              {/* EMAIL */}
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                className="w-full p-4 border rounded-xl"
                required
              />

              {/* PHONE */}
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="w-full p-4 border rounded-xl"
                required
              />

              {/* MESSAGE */}
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
                className="w-full p-4 border rounded-xl"
                required
              />

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full py-4 bg-black text-white rounded-xl"
              >
                Send Message
              </button>

            </form>
          )}
        </div>

      </div>
    </motion.div>
  );
};

export default Contact;