import { supabase } from "../supabase";
import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [contacts, setContacts] = useState([]);

  // 🔥 FETCH CONTACTS FROM SUPABASE
  useEffect(() => {
    const fetchContacts = async () => {
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.log("Error fetching:", error);
      } else {
        setContacts(data || []);
      }
    };

    fetchContacts();
  }, []);

  // 📊 STATS FUNCTION
  const getStats = () => {
    const today = new Date().toISOString().split("T")[0];

    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = yesterdayDate.toISOString().split("T")[0];

    let todayCount = 0;
    let yesterdayCount = 0;

    contacts.forEach((item) => {
      if (!item.created_at) return;

      const date = new Date(item.created_at)
        .toISOString()
        .split("T")[0];

      if (date === today) todayCount++;
      if (date === yesterday) yesterdayCount++;
    });

    // 🔥 FIXED GROWTH LOGIC
    let growth = 0;

    if (yesterdayCount === 0 && todayCount > 0) {
      growth = 100;
    } else if (yesterdayCount > 0) {
      growth = ((todayCount - yesterdayCount) / yesterdayCount) * 100;
    }

    return {
      todayCount,
      yesterdayCount,
      growth: Math.round(growth),
    };
  };

  const { todayCount, yesterdayCount, growth } = getStats();

  return (
    <div className="min-h-screen flex bg-gray-100 text-black pt-24">

      {/* SIDEBAR */}
      <div className="w-64 bg-white p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>
        <ul className="space-y-4 text-gray-600">
          <li className="text-black font-semibold">Dashboard</li>
          <li>Contacts</li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-10">

        {/* 📊 STATS */}
        <div className="grid grid-cols-3 gap-6 mb-10">

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Today’s Leads</p>
            <h2 className="text-3xl font-bold">{todayCount}</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Yesterday’s Leads</p>
            <h2 className="text-3xl font-bold">{yesterdayCount}</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Growth</p>
            <h2
              className={`text-3xl font-bold ${
                growth > 0
                  ? "text-green-600"
                  : growth < 0
                  ? "text-red-600"
                  : "text-gray-500"
              }`}
            >
              {growth}%
            </h2>
          </div>

        </div>

        {/* 📋 CONTACT LIST */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl mb-4 font-semibold">Contacts</h2>

          {contacts.length === 0 ? (
            <p className="text-gray-500">No contacts yet</p>
          ) : (
            contacts.map((item) => (
              <div
                key={item.id}
                className="border-b border-gray-200 py-4"
              >
                <h3 className="font-semibold">{item.Name}</h3>
                <p className="text-gray-600 text-sm">{item.Email}</p>
                <p className="text-gray-600 text-sm">{item.Phone}</p>
                <p className="text-gray-500 text-sm">{item.Message}</p>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;