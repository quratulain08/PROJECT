"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

const DepartmentInfo: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);

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

  const handleDelete = async (id: string) => {
    
        try {
          const response = await fetch('/api/department', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
          });
      
          const result = await response.json();
      
          if (response.ok) {
            alert(result.message);
            // Refresh the department list or update the state
          } else {
            alert(`Error: ${result.error}`);
          }
        } catch (error) {
          console.error('Error deleting department:', error);
          alert('Failed to delete department.');
        }
      };
      
  

  const handleEdit = (department: Department) => {
    setEditingDepartment(department);
    router.push('/DepartmentForm');
  };

  const handleAddNewDepartment = () => {
    try {
      router.push('/DepartmentForm');
    } catch (error: unknown) {
      console.error('Navigation error:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-8xl mx-auto w-full">
      <h1 className="text-lg font-semibold mb-4">Departments</h1>
      

      {departments.length === 0 ? (
        <p>No departments available.</p>
      ) : (
        departments.map((dept) => (
          <div
            key={dept.id}
            className="border border-gray-300 rounded-md p-4 mb-6"
          >
            <h2 className="text-green-600 font-semibold mb-2">
              {dept.honorific} {dept.hodName} - {dept.name}
            </h2>
            <p>
              <span className="font-bold">Category:</span> {dept.category}
            </p>
            <p>
              <span className="font-bold">Start Date:</span> {dept.startDate}
            </p>
            <p>
              <span className="font-bold">CNIC:</span> {dept.cnic}
            </p>
            <p>
              <span className="font-bold">Email:</span> {dept.email}
            </p>
            <p>
              <span className="font-bold">Phone:</span> {dept.phone}
            </p>
            {dept.landLine && (
              <p>
                <span className="font-bold">Land Line:</span> {dept.landLine}
              </p>
            )}
            <p>
              <span className="font-bold">Address:</span> {dept.address},{" "}
              {dept.city}, {dept.province}
            </p>
            <div className="mt-4">
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => handleEdit(dept)}
              >
                Edit
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => handleDelete(dept.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      {showForm && (
        <form onSubmit={handleFormSubmit} className="p-4 border rounded-md">
          <h2 className="text-lg font-semibold mb-4">
            {editingDepartment ? "Edit Department" : "Add Department"}
          </h2>

          <input
            type="text"
            name="name"
            value={editingDepartment?.name || ""}
            onChange={(e) =>
              setEditingDepartment({
                ...editingDepartment!,
                name: e.target.value,
              })
            }
            placeholder="Department Name"
            className="w-full p-2 border mb-2 rounded"
            required
          />

          <input
            type="date"
            name="startDate"
            value={editingDepartment?.startDate || ""}
            onChange={(e) =>
              setEditingDepartment({
                ...editingDepartment!,
                startDate: e.target.value,
              })
            }
            className="w-full p-2 border mb-2 rounded"
            required
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded mt-2"
          >
            {editingDepartment ? "Update" : "Create"}
          </button>
        </form>
      )}
    </div>
  );
};

export default DepartmentInfo;
