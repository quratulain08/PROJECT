"use client";

import { useState } from "react";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  department?: string;
  designation?: string;
  officeLocation?: string;
  tenureStart?: string;
  tenureEnd?: string;
}

const ProfileView: React.FC = () => {
  const [profileData, setProfileData] = useState<Record<string, ProfileData>>({
    dean: { name: "", email: "", phone: "", department: "", tenureStart: "" },
    vc: { name: "", email: "", phone: "", officeLocation: "", tenureEnd: "" },
    academicDirector: {
      name: "",
      email: "",
      phone: "",
      department: "",
      designation: "",
    },
    deputyDirector: {
      name: "",
      email: "", phone: "", officeLocation: "", designation: "",
    },
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
  };

  const renderForm = (role: string, title: string, fields: JSX.Element) => (
    <div className="profile-section">
      <h2 className="section-heading">{title}</h2>
      <form onSubmit={(e) => handleSubmit(e, role)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            value={profileData[role].name}
            onChange={(e) => handleChange(role, "name", e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={profileData[role].email}
            onChange={(e) => handleChange(role, "email", e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={profileData[role].phone}
            onChange={(e) => handleChange(role, "phone", e.target.value)}
            required
          />
          {fields}
        </div>
        <button type="submit">Save {title} Profile</button>
      </form>
    </div>
  );

  return (
    <div className="profile-container">
      {renderForm(
        "dean",
        "Dean Profile",
        <>
          <input
            type="text"
            placeholder="Department"
            value={profileData.dean.department}
            onChange={(e) => handleChange("dean", "department", e.target.value)}
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
      )}

      {renderForm(
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
            onChange={(e) => handleChange("vc", "tenureEnd", e.target.value)}
            required
          />
        </>
      )}

      {renderForm(
        "academicDirector",
        "Academic Director Profile",
        <>
          <input
            type="text"
            placeholder="Designation"
            value={profileData.academicDirector.designation}
            onChange={(e) =>
              handleChange("academicDirector", "designation", e.target.value)
            }
            required
          />
          <input
            type="text"
            placeholder="Department"
            value={profileData.academicDirector.department}
            onChange={(e) =>
              handleChange("academicDirector", "department", e.target.value)
            }
            required
          />
        </>
      )}

      {renderForm(
        "deputyDirector",
        "Deputy Academic Director Profile",
        <>
          <input
            type="text"
            placeholder="Office Location"
            value={profileData.deputyDirector.officeLocation}
            onChange={(e) =>
              handleChange("deputyDirector", "officeLocation", e.target.value)
            }
            required
          />
          <input
            type="text"
            placeholder="Designation"
            value={profileData.deputyDirector.designation}
            onChange={(e) =>
              handleChange("deputyDirector", "designation", e.target.value)
            }
            required
          />
        </>
      )}

      <style jsx>{`
        .profile-container {
          max-width: 1300px;
          margin: 50px auto;
          padding: 40px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 50px;
          background-color: #f0f8f7;
          border-radius: 12px;
        }

        .profile-section {
          background: #ffffff;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .profile-section:not(:last-child)::after {
          content: "";
          position: absolute;
          bottom: -25px;
          left: 0;
          width: 100%;
          height: 5px;
          background-color: #4caf50;
          border-radius: 5px;
        }

        .section-heading {
          text-align: center;
          margin-bottom: 20px;
          color: #1976d2;
          font-size: 24px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        input {
          padding: 14px 16px;
          font-size: 16px;
          border: 1px solid #ddd;
          border-radius: 8px;
          transition: border-color 0.3s, box-shadow 0.3s;
        }

        input:focus {
          border-color: #1976d2;
          box-shadow: 0px 0px 6px rgba(25, 118, 210, 0.5);
          outline: none;
        }

        button {
          background-color: #4caf50;
          color: white;
          padding: 14px 22px;
          border: none;
          border-radius: 8px;
          font-size: 17px;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.2s;
        }

        button:hover {
          background-color: #388e3c;
          transform: translateY(-3px);
        }
      `}</style>
    </div>
  );
};

export default ProfileView;
