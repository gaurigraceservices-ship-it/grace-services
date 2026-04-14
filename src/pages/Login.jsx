import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [show, setShow] = useState(false);

  // 🔥 AUTO REDIRECT IF ALREADY ADMIN
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.role === "admin") {
      navigate("/admin");
    }
  }, [navigate]);

  // 🔐 ADMIN LOGIN ONLY
  const handleLogin = (e) => {
  e.preventDefault();

  if (
    form.email === "gauri@graceservices.in" &&
    form.password === "grace@123"
  ) {
    localStorage.setItem(
      "user",
      JSON.stringify({ role: "admin" })
    );

    navigate("/admin");
  } else {
    alert("❌ Invalid admin credentials");
  }
};
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 bg-gray-50 overflow-hidden">

      {/* ✨ Background Glow */}
      <div className="absolute w-[400px] h-[400px] bg-purple-200 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[300px] h-[300px] bg-blue-200 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

      {/* 🔥 Card */}
      <div className="relative w-full max-w-md p-8 rounded-2xl 
                      bg-white 
                      border border-gray-200 
                      shadow-lg">

        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">
          Admin Login 🔐
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Admin Email"
            className="w-full p-3 rounded-lg border border-gray-300 
                       focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 rounded-lg border border-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
            />

            <span
              onClick={() => setShow(!show)}
              className="absolute right-3 top-3 text-sm text-gray-500 cursor-pointer"
            >
              {show ? "Hide" : "Show"}
            </span>
          </div>

          {/* BUTTON */}
          <button
            className="w-full py-3 rounded-lg 
                       bg-black text-white font-medium 
                       hover:opacity-90 active:scale-95 transition"
          >
            Login as Admin
          </button>
        </form>

        {/* 🔐 Admin Credentials */}
        <p className="text-xs text-gray-500 mt-6 text-center">
          Admin Access Only <br />
          admin@gmail.com / admin123
        </p>
      </div>
    </div>
  );
};

export default Login;