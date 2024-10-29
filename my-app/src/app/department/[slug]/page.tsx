"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Department {
  _id: string; // Ensure you're using `_id` here
  name: string;
  startDate: string;
  category: string;
  hodName: string;
  honorific: string;
  cnic: string;
  email: string;
  phone: string;
  landLine?: string;
  address: string;
  province: string;
  city: string;
}

const DepartmentDetail: React.FC = () => {
  const [department, setDepartment] = useState<Department | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const params = useParams();
  const id = params.slug; // Adjusted to match the dynamic route

  useEffect(() => {
    if (id) fetchDepartment();
  }, [id]);

  const fetchDepartment = async () => {
 
      try {
        const response = await fetch(`/api/department/${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });
    
      if (!response.ok) throw new Error("Failed to fetch department details");

      const data = await response.json();
      setDepartment(data);
    } catch (err) {
      console.error("Fetch error:", err); // Log the error for debugging
      setError("Error fetching department information.heelo");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!department) return <p>No department found.</p>;

  return (
    <div className="max-w-4xl mx-auto w-full p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 border border-green-500">
        <h1 className="text-2xl font-semibold mb-6 text-green-600">
          {department.honorific} {department.hodName} - {department.name}
        </h1>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            <span className="font-bold">Category:</span> {department.category}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-bold">Start Date:</span> {department.startDate}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-bold">CNIC:</span> {department.cnic}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-bold">Email:</span> {department.email}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-bold">Phone:</span> {department.phone}
          </p>
          {department.landLine && (
            <p className="text-sm text-gray-600">
              <span className="font-bold">Land Line:</span> {department.landLine}
            </p>
          )}
          <p className="text-sm text-gray-600">
            <span className="font-bold">Address:</span> {department.address}, {department.city}, {department.province}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetail;
