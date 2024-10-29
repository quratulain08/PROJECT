import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb'; // Adjust the path as necessary
import Department from '../../../models/Department'; // Adjust the path as necessary

// GET: Fetch all departments from the database.
export async function GET() {
  try {
    await connectToDatabase();
    const departments = await Department.find(); // Fetch all departments
    return NextResponse.json(departments);
  } catch (error) {
    console.error('Error fetching departments:', error);
    return NextResponse.json({ error: 'Failed to fetch departments' }, { status: 500 });
  }
}

// POST: Create a new department in the database.
export async function POST(req: Request) {
  try {
    const departmentData = await req.json(); // Parse the request body
    await connectToDatabase(); // Ensure the database is connected

    const newDepartment = new Department(departmentData); // Create a new department instance
    await newDepartment.save(); // Save the department to the database

    return NextResponse.json(newDepartment, { status: 201 }); // Respond with the created department
  } catch (error) {
    console.error('Error creating department:', error);
    return NextResponse.json({ error: 'Failed to create department' }, { status: 500 });
  }
}

// PUT: Update a department by ID.
export async function PUT(req: Request) {
  try {
    const { id, ...updatedData } = await req.json(); // Parse the ID and updated data
    await connectToDatabase(); // Ensure the database is connected

    const updatedDepartment = await Department.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure the updated data meets schema requirements
    });

    if (!updatedDepartment) {
      return NextResponse.json({ error: 'Department not found' }, { status: 404 });
    }

    return NextResponse.json(updatedDepartment); // Respond with the updated department
  } catch (error) {
    console.error('Error updating department:', error);
    return NextResponse.json({ error: 'Failed to update department' }, { status: 500 });
  }
}

// DELETE: Remove a department from the database by ID.
export async function DELETE(req: Request) {
    try {
      const { id } = await req.json(); // Extract the department ID from the request
  
      if (!id) {
        return NextResponse.json({ error: 'Department ID is required' }, { status: 400 });
      }
  
      await connectToDatabase(); // Ensure database connection
  
      const deletedDepartment = await Department.findByIdAndDelete(id); // Delete by ID
  
      if (!deletedDepartment) {
        return NextResponse.json({ error: 'Department not found' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'Department deleted successfully!' }, { status: 200 });
    } catch (error) {
      console.error('Error deleting department:', error);
      return NextResponse.json({ error: 'Failed to delete department' }, { status: 500 });
    }
  }
  

