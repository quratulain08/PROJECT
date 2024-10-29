"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DepartmentDashboard from "@/app/components/departmentForm";

interface Department {
  id: string;
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

const DepartmentList: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await fetch("/api/department");
      if (!response.ok) throw new Error("Failed to fetch departments");

      const data = await response.json();
      setDepartments(data);
    } catch (err) {
      setError("Error fetching department information.");
    } finally {
      setLoading(false);
    }
  };

  const handleDepartmentClick = (id: string) => {
    router.push(`/department/${id}`); // Navigate to department detail page
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-8xl mx-auto w-full">
      <h1 className="text-lg font-semibold mb-6">Departments</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.length === 0 ? (
          <p>No departments available.</p>
        ) : (
          departments.map((dept) => (
            <div
              key={dept.id}
              className="border border-green-500 rounded-lg shadow-lg p-6 bg-white cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => handleDepartmentClick(dept.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleDepartmentClick(dept.id);
                }
              }}
            >
              <h2 className="text-green-600 font-semibold text-lg mb-2">
                {dept.honorific} {dept.hodName} - {dept.name}
              </h2>
              <p className="text-sm text-gray-600">
                <span className="font-bold">Category:</span> {dept.category}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-bold">Start Date:</span> {dept.startDate}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-bold">CNIC:</span> {dept.cnic}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-bold">Email:</span> {dept.email}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-bold">Phone:</span> {dept.phone}
              </p>
              {dept.landLine && (
                <p className="text-sm text-gray-600">
                  <span className="font-bold">Land Line:</span> {dept.landLine}
                </p>
              )}
              <p className="text-sm text-gray-600">
                <span className="font-bold">Address:</span> {dept.address},{" "}
                {dept.city}, {dept.province}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DepartmentList;
