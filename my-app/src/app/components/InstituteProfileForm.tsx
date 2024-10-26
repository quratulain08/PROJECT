"use client";

import { useState, useEffect } from "react";

interface ProfileData {
  role: string; // Added role to the ProfileData interface
  name: string;
  email: string;
  phone: string;
  cnic: string;
  department?: string;
  designation?: string;
  officeLocation?: string;
  tenureStart?: string;
  tenureEnd?: string;
}

const InstituteProfile: React.FC = () => {
  const [profileData, setProfileData] = useState<Record<string, ProfileData>>({});
  const [editMode, setEditMode] = useState<Record<string, boolean>>({
    dean: false,
    vc: false,
    chairman: false,
    deputy: false,
  });
  const [newProfile, setNewProfile] = useState<ProfileData>({
    role: "",
    name: "",
    email: "",
    phone: "",
    cnic: "",
    department: "",
    designation: "",
    officeLocation: "",
    tenureStart: "",
    tenureEnd: "",
  });

  // Fetch profiles on component mount
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch("/api/instituteProfile");
        const data = await response.json();
        // Organize data by role
        const formattedData = data.reduce((acc: Record<string, ProfileData>, profile: ProfileData) => {
          acc[profile.role] = profile; // Assuming each profile has a 'role' field
          return acc;
        }, {});
        setProfileData(formattedData);
      } catch (error) {
        console.error('Failed to fetch profiles:', error);
      }
    };

    fetchProfiles();
  }, []);

  const handleChange = (role: string, field: keyof ProfileData, value: string) => {
    setProfileData((prevData) => ({
      ...prevData,
      [role]: { ...prevData[role], [field]: value },
    }));
  };

  const handleNewProfileChange = (field: keyof ProfileData, value: string) => {
    setNewProfile((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent, role: string) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/instituteProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData[role]), // Send the profile data
      });

      if (!response.ok) {
        throw new Error('Failed to save profile');
      }

      const result = await response.json();
      console.log(`${role} Profile Data saved:`, result);
      setEditMode((prev) => ({ ...prev, [role]: false }));
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleAddProfile = async (role: string) => {
    try {
      const response = await fetch("/api/instituteProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProfile), // Send the new profile data
      });

      if (!response.ok) {
        throw new Error('Failed to add profile');
      }

      const result = await response.json();
      console.log("New Profile Data saved:", result);
      setProfileData((prevData) => ({
        ...prevData,
        [role]: newProfile,
      }));
      setNewProfile({
        role: "",
        name: "",
        email: "",
        phone: "",
        cnic: "",
        department: "",
        designation: "",
        officeLocation: "",
        tenureStart: "",
        tenureEnd: "",
      });
    } catch (error) {
      console.error('Error adding profile:', error);
    }
  };

  const handleDelete = async (role: string) => {
    try {
      const response = await fetch("/api/instituteProfile", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }), // Send the role to delete
      });

      if (!response.ok) {
        throw new Error('Failed to delete profile');
      }

      const result = await response.json();
      console.log(result.message);
      setProfileData((prevData) => {
        const newData = { ...prevData };
        delete newData[role]; // Remove deleted profile from state
        return newData;
      });
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  const renderDisplay = (role: string, title: string) => (
    <div className="p-6 bg-gray-100 shadow-md rounded-lg border">
      <h2 className="text-center text-xl font-bold text-green-600 mb-4">
        {title}
      </h2>
      <div className="space-y-2">
        <p><strong>Name:</strong> {profileData[role]?.name}</p>
        <p><strong>Email:</strong> {profileData[role]?.email}</p>
        <p><strong>Phone:</strong> {profileData[role]?.phone}</p>
        <p><strong>CNIC:</strong> {profileData[role]?.cnic}</p>
        {profileData[role]?.department && (
          <p><strong>Department:</strong> {profileData[role].department}</p>
        )}
        {profileData[role]?.officeLocation && (
          <p><strong>Office Location:</strong> {profileData[role].officeLocation}</p>
        )}
        {profileData[role]?.tenureStart && (
          <p><strong>Tenure Start:</strong> {profileData[role].tenureStart}</p>
        )}
        {profileData[role]?.tenureEnd && (
          <p><strong>Tenure End:</strong> {profileData[role].tenureEnd}</p>
        )}
      </div>
      <button
        onClick={() => setEditMode((prev) => ({ ...prev, [role]: true }))}
        className="mt-4 w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
      >
        Edit {title}
      </button>
      <button
        onClick={() => handleDelete(role)}
        className="mt-2 w-full bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition"
      >
        Delete {title}
      </button>
    </div>
  );

  const renderForm = (role: string, title: string, fields: JSX.Element) => (
    <div className="p-6 bg-white shadow-md rounded-lg border">
      <h2 className="text-center text-xl font-bold text-green-600 mb-4">
        Edit {title}
      </h2>
      <form onSubmit={(e) => handleSubmit(e, role)} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={profileData[role]?.name}
          onChange={(e) => handleChange(role, "name", e.target.value)}
          required
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={profileData[role]?.email}
          disabled
          className="w-full p-3 border bg-gray-100 rounded-md"
        />
        <input
          type="text"
          placeholder="Phone"
          value={profileData[role]?.phone}
          onChange={(e) => handleChange(role, "phone", e.target.value)}
          required
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          placeholder="CNIC"
          value={profileData[role]?.cnic}
          disabled
          className="w-full p-3 border bg-gray-100 rounded-md"
        />
        {fields}
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition"
        >
          Save {title}
        </button>
      </form>
    </div>
  );

  const renderProfileSection = (role: string, title: string) => (
    <>
      {profileData[role] ? (
        editMode[role] ? renderForm(role, title, (
          <>
            <input
              type="text"
              placeholder="Department"
              value={profileData[role]?.department}
              onChange={(e) => handleChange(role, "department", e.target.value)}
              className="w-full p-3 border rounded-md"
            />
            <input
              type="text"
              placeholder="Designation"
              value={profileData[role]?.designation}
              onChange={(e) => handleChange(role, "designation", e.target.value)}
              className="w-full p-3 border rounded-md"
            />
            <input
              type="text"
              placeholder="Office Location"
              value={profileData[role]?.officeLocation}
              onChange={(e) => handleChange(role, "officeLocation", e.target.value)}
              className="w-full p-3 border rounded-md"
            />
            <input
              type="date"
              placeholder="Tenure Start"
              value={profileData[role]?.tenureStart}
              onChange={(e) => handleChange(role, "tenureStart", e.target.value)}
              className="w-full p-3 border rounded-md"
            />
            <input
              type="date"
              placeholder="Tenure End"
              value={profileData[role]?.tenureEnd}
              onChange={(e) => handleChange(role, "tenureEnd", e.target.value)}
              className="w-full p-3 border rounded-md"
            />
          </>
        )) : renderDisplay(role, title)
      ) : (
        <div className="p-6 bg-gray-100 shadow-md rounded-lg border max-w-md mx-auto">
          <h2 className="text-center text-xl font-bold text-green-600 mb-4">
            {title} (No data available)
          </h2>
          <button
            onClick={() => handleAddProfile(role)}
            className="mt-4 w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition"
          >
            Add {title}
          </button>
        </div>
      )}
    </>
  );

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-6">Institute Profiles</h1>
      <div className="space-y-4">
        {renderProfileSection("dean", "Dean")}
        {renderProfileSection("vc", "Vice Chancellor")}
        {renderProfileSection("chairman", "Chairman")}
        {renderProfileSection("deputy", "Deputy")}
      </div>
    </div>
  );
};

export default InstituteProfile;
