"use client";

import { useEffect, useState } from "react";

interface Department {
  id: string; // Assuming departments have unique IDs
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
  const [showForm, setShowForm] = useState(false);

  // Fetch department data on component mount
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
    if (confirm("Are you sure you want to delete this department?")) {
      try {
        const response = await fetch(`/api/department/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete department");

        setDepartments(departments.filter((dept) => dept.id !== id));
      } catch (err) {
        console.error(err);
        setError("Failed to delete the department.");
      }
    }
  };

  const handleEdit = (department: Department) => {
    setEditingDepartment(department);
    setShowForm(true);
  };

 
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = editingDepartment
      ? `/api/department/${editingDepartment.id}`
      : "/api/department";
    const method = editingDepartment ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingDepartment),
      });

      if (!response.ok) throw new Error("Failed to save department");

      await fetchDepartments(); // Refresh the department list
      setShowForm(false); // Close the form
    } catch (err) {
      console.error(err);
      setError("Failed to save the department.");
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
