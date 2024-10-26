"use client";

import { useState } from 'react';

const DepartmentDashboard: React.FC = () => {
  const [department, setDepartment] = useState({
    name: '',
    startDate: '',
    category: '',
    hodName: '',
    honorific: 'Mr.',
    cnic: '',
    email: '',
    phone: '',
    landLine: '',
    address: '',
    province: '',
    city: '',
  });

  const categories = [
    'Computing',
    'Engineering',
    'Management Sciences',
    'Mathematics & Natural Sciences',
  ];

  const provinces = ['Sindh', 'Punjab', 'KPK', 'Balochistan'];
  const cities = ['Karachi', 'Lahore', 'Islamabad', 'Peshawar'];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Department Data:', department);
  };

  return (
    <div className="container">
      <h2>New Department Information</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Basic Information</legend>
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={department.name}
              onChange={handleChange}
              placeholder="Department Name"
              required
            />
            <input
              type="date"
              name="startDate"
              value={department.startDate}
              onChange={handleChange}
              required
            />
            <select
              name="category"
              value={department.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </fieldset>

        <fieldset>
          <legend>HoD Information</legend>
          <div className="form-group">
            <select
              name="honorific"
              value={department.honorific}
              onChange={handleChange}
            >
              <option value="Mr.">Mr.</option>
              <option value="Ms.">Ms.</option>
              <option value="Dr.">Dr.</option>
            </select>
            <input
              type="text"
              name="hodName"
              value={department.hodName}
              onChange={handleChange}
              placeholder="HoD Name"
              required
            />
            <input
              type="text"
              name="cnic"
              value={department.cnic}
              onChange={handleChange}
              placeholder="CNIC"
              required
            />
            <input
              type="email"
              name="email"
              value={department.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <input
              type="text"
              name="phone"
              value={department.phone}
              onChange={handleChange}
              placeholder="Phone No."
              required
            />
            <input
              type="text"
              name="landLine"
              value={department.landLine}
              onChange={handleChange}
              placeholder="Land Line"
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Address Information</legend>
          <div className="form-group">
            <input
              type="text"
              name="address"
              value={department.address}
              onChange={handleChange}
              placeholder="Address"
              required
            />
            <select
              name="province"
              value={department.province}
              onChange={handleChange}
              required
            >
              <option value="">Select Province</option>
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
            <select
              name="city"
              value={department.city}
              onChange={handleChange}
              required
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </fieldset>

        <button type="submit">Save</button>
      </form>

      <style jsx>{`
        .container {
          width: 60%;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        h2 {
          font-size: 1.5rem;
          margin-bottom: 20px;
          text-align: center;
          color: #333;
        }

        fieldset {
          border: 1px solid #ddd;
          padding: 15px;
          border-radius: 6px;
          margin-bottom: 15px;
        }

        legend {
          font-size: 1rem;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .form-group {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        input,
        select {
          width: 100%;
          padding: 8px;
          margin: 4px 0;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 0.9rem;
        }

        button {
          width: 100%;
          padding: 10px;
          font-size: 1rem;
          background-color: #4caf50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        button:hover {
          background-color: #45a049;
        }
      `}</style>
    </div>
  );
};

export default DepartmentDashboard;
