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
  const [profile, setProfile] = useState<VocalPersonData | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);

  // Fetch profile data on component mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/vocalPersonProfile');
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

  const handleChange = (field: keyof VocalPersonData, value: string) => {
    if (profile) {
      setProfile({ ...profile, [field]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        // Include email and cnic in the payload
        const { email, cnic, ...profileToUpdate } = profile || {};
        
        // Add email and cnic back to the payload
        const payloadToUpdate = { email, cnic, ...profileToUpdate };

        // Log the data being sent to the API
        console.log('Data being sent to API:', JSON.stringify(payloadToUpdate, null, 2));

        const response = await fetch('/api/vocalPersonProfile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payloadToUpdate),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Updated Vocal Person Profile:', data);
            setEditMode(false);
            fetchProfile(); // Fetch the updated profile
        } else {
            const errorData = await response.json(); // Get the error details
            console.error('Failed to update profile:', errorData);
            alert(`Failed to update profile: ${errorData.error || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error updating vocal person profile:', error);
        // Additional logging for debugging
        alert('An error occurred while updating the profile. Please try again later.');
    }
};

  const renderDisplay = () => (
    <div className="p-6 bg-gray-100 shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Vocal Person Profile</h2>
      {profile ? (
        <>
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
        </>
      ) : (
        <p>No profile found.</p>
      )}
    </div>
  );

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Edit Vocal Person Profile</h2>
      {profile && (
        <>
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
            className="w-full p-3 border mb-3 rounded-md bg-gray-200 cursor-not-allowed"
            readOnly // Make email field read-only
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
            className="w-full p-3 border mb-3 rounded-md bg-gray-200 cursor-not-allowed"
            readOnly // Make CNIC field read-only
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
        </>
      )}
    </form>
  );

  return (
    <div className="max-w-3xl mx-auto p-8">
      {editMode ? renderForm() : renderDisplay()}
    </div>
  );
};

export default VocalPerson;
