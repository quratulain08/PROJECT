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

  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // Start submission process
    setStatusMessage(''); // Reset status message

    try {
      const response = await fetch('/api/department', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(department),
      });
      
      if (!response.ok) {
        throw new Error('Error creating department');
      }
  
      const result = await response.json();
      console.log('Department created:', result);
      setStatusMessage('Department created successfully!');
      setDepartment({
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
      }); // Reset the form after successful submission
    } catch (error) {
      console.error(error);
      setStatusMessage('Failed to create department. Please try again.');
    } finally {
      setIsSubmitting(false); // End submission process
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">New Department Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <fieldset className="border border-gray-300 rounded-md p-4">
          <legend className="text-lg font-bold">Basic Information</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={department.name}
              onChange={handleChange}
              placeholder="Department Name"
              required
              className="p-2 border border-gray-400 rounded"
            />
            <input
              type="date"
              name="startDate"
              value={department.startDate}
              onChange={handleChange}
              required
              className="p-2 border border-gray-400 rounded"
            />
            <select
              name="category"
              value={department.category}
              onChange={handleChange}
              required
              className="p-2 border border-gray-400 rounded"
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

        <fieldset className="border border-gray-300 rounded-md p-4">
          <legend className="text-lg font-bold">HoD Information</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="honorific"
              value={department.honorific}
              onChange={handleChange}
              className="p-2 border border-gray-400 rounded"
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
              className="p-2 border border-gray-400 rounded"
            />
            <input
              type="text"
              name="cnic"
              value={department.cnic}
              onChange={handleChange}
              placeholder="CNIC"
              required
              className="p-2 border border-gray-400 rounded"
            />
            <input
              type="email"
              name="email"
              value={department.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="p-2 border border-gray-400 rounded"
            />
            <input
              type="text"
              name="phone"
              value={department.phone}
              onChange={handleChange}
              placeholder="Phone No."
              required
              className="p-2 border border-gray-400 rounded"
            />
            <input
              type="text"
              name="landLine"
              value={department.landLine}
              onChange={handleChange}
              placeholder="Land Line"
              className="p-2 border border-gray-400 rounded"
            />
          </div>
        </fieldset>

        <fieldset className="border border-gray-300 rounded-md p-4">
          <legend className="text-lg font-bold">Address Information</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="address"
              value={department.address}
              onChange={handleChange}
              placeholder="Address"
              required
              className="p-2 border border-gray-400 rounded"
            />
            <select
              name="province"
              value={department.province}
              onChange={handleChange}
              required
              className="p-2 border border-gray-400 rounded"
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
              className="p-2 border border-gray-400 rounded"
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

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full ${isSubmitting ? 'bg-gray-400' : 'bg-green-500'} text-white p-3 rounded-md hover:bg-green-600 transition`}
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>
      </form>

      {statusMessage && (
        <div className={`mt-4 text-center ${statusMessage.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
          {statusMessage}
        </div>
      )}
    </div>
  );
};

export default DepartmentDashboard;
