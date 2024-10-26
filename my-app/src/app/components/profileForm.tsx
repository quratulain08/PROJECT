"use client";

import { useEffect, useState } from "react";

interface VocalPersonData {
  name: string;
  email: string;
  phone: string;
  cnic: string;
  designation: string;
}

const VocalPerson: React.FC = () => {
  const [profile, setProfile] = useState<VocalPersonData>({
    name: "",
    email: "",
    phone: "",
    cnic: "",
    designation: "",
  });

  const [editMode, setEditMode] = useState<boolean>(false);

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/vocalPerson');
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          console.error('Failed to fetch profile.');
        }
      } catch (error) {
        console.error('Error fetching vocal person profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (field: keyof VocalPersonData, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/vocalPerson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Updated Vocal Person Profile:', data);
        setEditMode(false);
      } else {
        console.error('Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating vocal person profile:', error);
    }
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
