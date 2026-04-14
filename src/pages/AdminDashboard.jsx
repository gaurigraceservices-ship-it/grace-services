import { supabase } from "../supabase";
import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [contacts, setContacts] = useState([]); // ✅ NEW
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    description: "",
  });

  // 🔥 Load jobs (localStorage - keep this if you want jobs)
  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(savedJobs);
  }, []);

  // 🔥 Load contacts from Supabase ✅ MAIN PART
  useEffect(() => {
    const fetchContacts = async () => {
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        console.log("Error fetching:", error);
      } else {
        setContacts(data);
      }
    };

    fetchContacts();
  }, []);

  // 🔥 Save jobs
  const saveJobs = (updatedJobs) => {
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
  };

  // ➕ Add Job
  const handleAddJob = (e) => {
    e.preventDefault();

    const newJob = {
      id: Date.now(),
      ...form,
    };

    const updatedJobs = [newJob, ...jobs];
    saveJobs(updatedJobs);

    setForm({
      title: "",
      company: "",
      location: "",
      type: "",
      description: "",
    });
  };

  // ❌ Delete Job
  const handleDelete = (id) => {
    const updatedJobs = jobs.filter((job) => job.id !== id);
    saveJobs(updatedJobs);
  };

  return (
    <div className="min-h-screen flex bg-[#0f1115] text-white">
      
      {/* SIDEBAR */}
      <div className="w-64 bg-black p-6">
        <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>
        <ul className="space-y-4 text-gray-400">
          <li className="text-white">Dashboard</li>
          <li>Add Job</li>
          <li>Manage Jobs</li>
          <li>Contacts</li> {/* ✅ NEW */}
        </ul>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-10">

        {/* STATS */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="bg-gray-800 p-6 rounded-xl">
            <p>Total Jobs</p>
            <h2 className="text-3xl font-bold">{jobs.length}</h2>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl">
            <p>Total Contacts</p> {/* ✅ NEW */}
            <h2 className="text-3xl font-bold">{contacts.length}</h2>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl">
            <p>Applicants</p>
            <h2 className="text-3xl font-bold">{contacts.length}</h2>
          </div>
        </div>

        {/* ADD JOB FORM */}
        <div className="bg-gray-900 p-6 rounded-xl mb-10">
          <h2 className="text-xl mb-4">Add New Job</h2>

          <form onSubmit={handleAddJob} className="grid grid-cols-2 gap-4">

            <input
              placeholder="Job Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="p-3 rounded bg-gray-800"
              required
            />

            <input
              placeholder="Company"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className="p-3 rounded bg-gray-800"
              required
            />

            <input
              placeholder="Location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="p-3 rounded bg-gray-800"
              required
            />

            <input
              placeholder="Type (Full-Time)"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="p-3 rounded bg-gray-800"
              required
            />

            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="p-3 rounded bg-gray-800 col-span-2"
              required
            />

            <button className="col-span-2 bg-white text-black py-3 rounded">
              Add Job
            </button>
          </form>
        </div>

        {/* JOB LIST */}
        <div className="bg-gray-900 p-6 rounded-xl mb-10">
          <h2 className="text-xl mb-4">Manage Jobs</h2>

          {jobs.length === 0 ? (
            <p className="text-gray-400">No jobs yet</p>
          ) : (
            jobs.map((job) => (
              <div
                key={job.id}
                className="flex justify-between items-center border-b border-gray-700 py-4"
              >
                <div>
                  <h3 className="font-semibold">{job.title}</h3>
                  <p className="text-gray-400 text-sm">
                    {job.company} • {job.location}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(job.id)}
                  className="text-red-400"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        {/* 🔥 CONTACT LIST (MAIN FEATURE) */}
        <div className="bg-gray-900 p-6 rounded-xl">
          <h2 className="text-xl mb-4">Contact Submissions</h2>

          {contacts.length === 0 ? (
            <p className="text-gray-400">No contacts yet</p>
          ) : (
            contacts.map((item) => (
              <div
                key={item.id}
                className="border-b border-gray-700 py-4"
              >
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-400">{item.email}</p>
                <p className="text-gray-400">{item.phone}</p>
                <p className="text-gray-300 mt-1">{item.message}</p>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;