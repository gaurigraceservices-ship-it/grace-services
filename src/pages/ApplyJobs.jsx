import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 🔥 Realistic Job Data (added description)
const jobsData = [
  { id: 1, title: "Sales Executive", company: "Lodha Group", location: "Lower Parel", type: "Full-Time", description: "Handle client meetings, site visits & close deals." },
  { id: 2, title: "Telecaller", company: "Godrej Properties", location: "Vikhroli", type: "Part-Time", description: "Call leads & explain offerings." },
  { id: 3, title: "Field Staff", company: "Runwal Realty", location: "Mulund", type: "Full-Time", description: "Assist on-ground operations." },
  { id: 4, title: "Promoter", company: "Kalpataru", location: "Thane", type: "Contract", description: "Promote projects at events." },
];

const ApplyJobs = () => {
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const [selectedJob, setSelectedJob] = useState(null); // 🔥 NEW

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    role: "",
    experience: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const roles = ["Sales Executive", "Telecaller", "GRE", "Event Staff"];

  const filteredJobs = jobsData.filter((job) => {
    return (
      job.title.toLowerCase().includes(search.toLowerCase()) &&
      (locationFilter === "" || job.location === locationFilter)
    );
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      alert("Enter valid 10-digit phone number");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setFormData({
        name: "",
        phone: "",
        role: "",
        experience: "",
      });
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#f5f7fb] dark:bg-[#0f1115] transition-colors duration-500 px-6 pt-44 pb-24 relative overflow-hidden"
    >
      {/* Glow */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-blue-200 dark:bg-blue-900 opacity-30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-purple-200 dark:bg-purple-900 opacity-30 blur-3xl rounded-full"></div>

      <div className="max-w-5xl mx-auto relative z-10">

        {/* 🔍 JOB SEARCH */}
        <div className="mb-20">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Explore Jobs
          </h2>

          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-white/5 text-black dark:text-white w-full"
            />

            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-white/5 text-black dark:text-white"
            >
              <option value="">All Locations</option>
              <option>Lower Parel</option>
              <option>Vikhroli</option>
              <option>Mulund</option>
              <option>Thane</option>
              <option>Goregaon</option>
              <option>Powai</option>
              <option>Bandra</option>
              <option>Andheri</option>
            </select>
          </div>

          {/* Job Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)} // 🔥 OPEN MODAL
                  className="group p-6 rounded-2xl bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {job.title}
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {job.company}
                  </p>

                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    📍 {job.location} • {job.type}
                  </p>

                  <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                    Hiring Now
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // 🔥 prevents modal opening
                      setFormData({ ...formData, role: job.title });
                    }}
                    className="mt-4 px-5 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black opacity-0 group-hover:opacity-100 transition"
                  >
                    Apply Now
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No jobs found 😢
              </p>
            )}
          </div>
        </div>

        {/* 🔥 MODAL */}
        <AnimatePresence>
          {selectedJob && (
            <motion.div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedJob(null)}
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white dark:bg-gray-900 p-8 rounded-2xl max-w-md w-full"
              >
                <h2 className="text-2xl font-semibold dark:text-white">
                  {selectedJob.title}
                </h2>

                <p className="text-gray-500 mt-2">
                  {selectedJob.company}
                </p>

                <p className="text-gray-400 mt-1">
                  📍 {selectedJob.location} • {selectedJob.type}
                </p>

                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  {selectedJob.description}
                </p>

                <button
                  onClick={() => {
                    setFormData({ ...formData, role: selectedJob.title });
                    setSelectedJob(null);
                  }}
                  className="mt-6 w-full py-3 bg-black text-white rounded-xl dark:bg-white dark:text-black"
                >
                  Apply for this job
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🧾 FORM */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-semibold text-gray-900 dark:text-white">
            Apply for Jobs
          </h2>
          <p className="text-gray-500 dark:text-gray-300 mt-3">
            Start your journey with us.
          </p>
        </div>

        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-xl rounded-3xl p-8 max-w-2xl mx-auto">
          {submitted ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                🎉 Application Submitted
              </h3>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              <input
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              />

              <input
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              />

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Select Role</option>
                {roles.map((r, i) => (
                  <option key={i}>{r}</option>
                ))}
              </select>

              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Select Experience</option>
                <option>Fresher</option>
                <option>1-2 years</option>
                <option>3+ years</option>
              </select>

              <button
                disabled={loading}
                className="w-full py-3 rounded-xl bg-black text-white dark:bg-white dark:text-black"
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>

            </form>
          )}
        </div>

      </div>
    </motion.div>
  );
};

export default ApplyJobs;