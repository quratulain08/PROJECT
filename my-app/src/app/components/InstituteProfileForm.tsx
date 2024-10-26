"use client";

import { useState } from "react";

interface ProfileData {
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
  const [profileData, setProfileData] = useState<Record<string, ProfileData>>({
    dean: {
      name: "John Doe",
      email: "dean@example.com",
      phone: "123-456-7890",
      cnic: "12345-6789012-3",
      department: "Engineering",
      tenureStart: "2023-01-01",
    },
    vc: {
      name: "Jane Smith",
      email: "vc@example.com",
      phone: "987-654-3210",
      cnic: "98765-4321098-7",
      officeLocation: "Room 201, Main Building",
      tenureEnd: "2025-12-31",
    },
    chairman: {
      name: "Michael Lee",
      email: "chairman@example.com",
      phone: "112-233-4455",
      cnic: "11111-2222222-2",
      department: "Academic Affairs",
    },
    deputy: {
      name: "Alice Green",
      email: "deputy@example.com",
      phone: "223-334-5566",
      cnic: "22222-3333333-3",
      designation: "Deputy Academic",
      officeLocation: "Room 305, East Wing",
    },
  });

  const [editMode, setEditMode] = useState<Record<string, boolean>>({
    dean: false,
    vc: false,
    chairman: false,
    deputy: false,
  });

  const handleChange = (
    role: string,
    field: keyof ProfileData,
    value: string
  ) => {
    setProfileData((prevData) => ({
      ...prevData,
      [role]: { ...prevData[role], [field]: value },
    }));
  };

  const handleSubmit = (e: React.FormEvent, role: string) => {
    e.preventDefault();
    console.log(`${role} Profile Data:`, profileData[role]);
    setEditMode((prev) => ({ ...prev, [role]: false }));
  };

  const renderDisplay = (role: string, title: string) => (
    <div className="p-6 bg-gray-100 shadow-md rounded-lg border">
      <h2 className="text-center text-xl font-bold text-green-600 mb-4">
        {title}
      </h2>
      <div className="space-y-2">
        <p><strong>Name:</strong> {profileData[role].name}</p>
        <p><strong>Email:</strong> {profileData[role].email}</p>
        <p><strong>Phone:</strong> {profileData[role].phone}</p>
        <p><strong>CNIC:</strong> {profileData[role].cnic}</p>
        {profileData[role].department && (
          <p><strong>Department:</strong> {profileData[role].department}</p>
        )}
        {profileData[role].officeLocation && (
          <p><strong>Office Location:</strong> {profileData[role].officeLocation}</p>
        )}
        {profileData[role].tenureStart && (
          <p><strong>Tenure Start:</strong> {profileData[role].tenureStart}</p>
        )}
        {profileData[role].tenureEnd && (
          <p><strong>Tenure End:</strong> {profileData[role].tenureEnd}</p>
        )}
      </div>
      <button
        onClick={() => setEditMode((prev) => ({ ...prev, [role]: true }))}
        className="mt-4 w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
      >
        Edit {title}
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
          value={profileData[role].name}
          onChange={(e) => handleChange(role, "name", e.target.value)}
          required
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={profileData[role].email}
          disabled
          className="w-full p-3 border bg-gray-100 rounded-md"
        />
        <input
          type="text"
          placeholder="Phone"
          value={profileData[role].phone}
          onChange={(e) => handleChange(role, "phone", e.target.value)}
          required
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          placeholder="CNIC"
          value={profileData[role].cnic}
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

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {editMode.dean
          ? renderForm(
              "dean",
              "Dean Profile",
              <>
                <input
                  type="text"
                  placeholder="Department"
                  value={profileData.dean.department}
                  onChange={(e) =>
                    handleChange("dean", "department", e.target.value)
                  }
                  required
                />
                <input
                  type="date"
                  value={profileData.dean.tenureStart}
                  onChange={(e) =>
                    handleChange("dean", "tenureStart", e.target.value)
                  }
                  required
                />
              </>
            )
          : renderDisplay("dean", "Dean Profile")}

        {editMode.vc
          ? renderForm(
              "vc",
              "Vice Chancellor Profile",
              <>
                <input
                  type="text"
                  placeholder="Office Location"
                  value={profileData.vc.officeLocation}
                  onChange={(e) =>
                    handleChange("vc", "officeLocation", e.target.value)
                  }
                  required
                />
                <input
                  type="date"
                  value={profileData.vc.tenureEnd}
                  onChange={(e) =>
                    handleChange("vc", "tenureEnd", e.target.value)
                  }
                  required
                />
              </>
            )
          : renderDisplay("vc", "Vice Chancellor Profile")}

        {editMode.chairman
          ? renderForm(
              "chairman",
              "Chairman Academic Profile",
              <>
                <input
                  type="text"
                  placeholder="Department"
                  value={profileData.chairman.department}
                  onChange={(e) =>
                    handleChange("chairman", "department", e.target.value)
                  }
                  required
                />
              </>
            )
          : renderDisplay("chairman", "Chairman Academic Profile")}

        {editMode.deputy
          ? renderForm(
              "deputy",
              "Deputy Academic Profile",
              <>
                <input
                  type="text"
                  placeholder="Office Location"
                  value={profileData.deputy.officeLocation}
                  onChange={(e) =>
                    handleChange("deputy", "officeLocation", e.target.value)
                  }
                  required
                />
              </>
            )
          : renderDisplay("deputy", "Deputy Academic Profile")}
      </div>
    </div>
  );
};

export default InstituteProfile;
