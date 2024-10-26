"use client";

import { useState } from "react";

interface VocalPersonData {
  name: string;
  email: string;
  phone: string;
  cnic: string;
  designation: string;
}

const VocalPerson: React.FC = () => {
  const [profile, setProfile] = useState<VocalPersonData>({
    name: "Alice Green",
    email: "vocalperson@example.com",
    phone: "223-334-5566",
    cnic: "12345-6789012-3",
    designation: "Vocal Person",
  });

  const [editMode, setEditMode] = useState<boolean>(false);

  const handleChange = (field: keyof VocalPersonData, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Vocal Person Profile:", profile);
    setEditMode(false);
  };

  const renderDisplay = () => (
    <div className="p-6 bg-gray-100 shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Vocal Person Profile</h2>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Phone:</strong> {profile.phone}</p>
      <p><strong>CNIC:</strong> {profile.cnic}</p>
      <p><strong>Designation:</strong> {profile.designation}</p>
      <button
        onClick={() => setEditMode(true)}
        className="mt-4 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
      >
        Edit Profile
      </button>
    </div>
  );

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Edit Vocal Person Profile</h2>
      <input
        type="text"
        placeholder="Name"
        value={profile.name}
        onChange={(e) => handleChange("name", e.target.value)}
        className="w-full p-3 border mb-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={profile.email}
        onChange={(e) => handleChange("email", e.target.value)}
        className="w-full p-3 border mb-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        required
      />
      <input
        type="text"
        placeholder="Phone"
        value={profile.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
        className="w-full p-3 border mb-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        required
      />
      <input
        type="text"
        placeholder="CNIC"
        value={profile.cnic}
        onChange={(e) => handleChange("cnic", e.target.value)}
        className="w-full p-3 border mb-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        required
      />
      <input
        type="text"
        placeholder="Designation"
        value={profile.designation}
        onChange={(e) => handleChange("designation", e.target.value)}
        className="w-full p-3 border mb-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        required
      />
      <button
        type="submit"
        className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition"
      >
        Save Profile
      </button>
    </form>
  );

  return (
    <div className="max-w-3xl mx-auto p-8">
      {editMode ? renderForm() : renderDisplay()}
    </div>
  );
};

export default VocalPerson;
