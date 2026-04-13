import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [show, setShow] = useState(false); // 👈 NEW

  const users = [
    { email: "user@gmail.com", password: "1234", role: "user" },
    { email: "admin@gmail.com", password: "admin123", role: "admin" },
  ];

  // 🔥 AUTO REDIRECT
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      if (user.role === "admin") navigate("/admin");
      else navigate("/apply");
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const foundUser = users.find(
      (u) =>
        u.email === form.email && u.password === form.password
    );

    if (!foundUser) {
      alert("Invalid credentials 😭");
      return;
    }

    localStorage.setItem("user", JSON.stringify(foundUser));

    if (foundUser.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/apply");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 bg-gray-50 overflow-hidden">

      {/* ✨ soft background glow */}
      <div className="absolute w-[400px] h-[400px] bg-purple-200 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[300px] h-[300px] bg-blue-200 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

      {/* 🔥 Card */}
      <div className="relative w-full max-w-md p-8 rounded-2xl 
                      bg-white 
                      border border-gray-200 
                      shadow-lg">

        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg border border-gray-300 
                       focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          {/* PASSWORD WITH SHOW/HIDE */}
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
            Login
          </button>
        </form>

        {/* Demo creds */}
        <p className="text-xs text-gray-500 mt-6 text-center">
          Demo: user@gmail.com / 1234 <br />
          Admin: admin@gmail.com / admin123
        </p>
      </div>
    </div>
  );
};

export default Login;