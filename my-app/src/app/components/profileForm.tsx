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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch profile data using GET method
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/vocalPersonProfile", {
        method: "GET",
      });
      if (response.ok) {
        const data: VocalPersonData = await response.json(); // Specify the type here
        console.log("Fetched Profile Data:", data);
        setProfile(data); // Set profile state
      } else {
        const errorData = await response.json();
        console.error("Failed to fetch profile:", errorData);
        setError(errorData.error || "Failed to fetch profile.");
      }
    } catch (error) {
      console.error("Error fetching vocal person profile:", error);
      setError("An error occurred while fetching the profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof VocalPersonData, value: string) => {
    if (profile) {
      setProfile({ ...profile, [field]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!profile) return; // Guard clause to ensure profile exists

    try {
      const { email, cnic, ...profileToUpdate } = profile;
      const payloadToUpdate = { email, cnic, ...profileToUpdate };

      const response = await fetch("/api/vocalPersonProfile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadToUpdate),
      });

      if (response.ok) {
        const data: VocalPersonData = await response.json(); // Specify the type here
        console.log("Updated Vocal Person Profile:", data);
        setEditMode(false);
        fetchProfile(); // Fetch the updated profile
      } else {
        const errorData = await response.json();
        console.error("Failed to update profile:", errorData);
        alert(`Failed to update profile: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error updating vocal person profile:", error);
      alert("An error occurred while updating the profile. Please try again.");
    }
  };

  const renderDisplay = () => (
    <div className="p-6 bg-gray-100 shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Vocal Person Profile</h2>
      {profile ? ( // Check if profile is not null
        <>
          <p><strong>Name:</strong> {profile[0].name}</p>
          <p><strong>Email:</strong> {profile[0].email}</p>
          <p><strong>Phone:</strong> {profile[0].phone}</p>
          <p><strong>CNIC:</strong> {profile[0].cnic}</p>
          <p><strong>Designation:</strong> {profile[0].designation}</p>
          <button
            onClick={() => setEditMode(true)}
            className="mt-4 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
          >
            Edit Profile
          </button>
          <button
            className="mt-4 bg-gray-300 text-gray-600 p-3 rounded-md hover:bg-gray-400 transition"
          >
            View profile
          </button>
        </>
      ) : (
        <p>No profile found.</p>
      )}
    </div>
  );

  const viewProfile = () => {
    // Implement logic to view the profile in a separate page or modal
    console.log("Viewing profile:", profile);
  };
  const renderForm = () => (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Edit Vocal Person Profile</h2>
      {profile && ( // Ensure profile is not null
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
            readOnly
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
            readOnly
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
          onClick={viewProfile}
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition"
          >
            Save Profile
          </button>
        </>
      )}
    </form>
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-8">
      {editMode ? renderForm() : renderDisplay()} {/* Toggle between display and form */}
    </div>
  );
};

export default VocalPerson;
