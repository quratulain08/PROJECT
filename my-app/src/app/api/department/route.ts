import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Department from '../../../models/Department';

// GET: Fetch all departments or a specific department by ID from the database.
export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();

    // If id exists, fetch a single department
    if (id && id !== 'departments') {
      const department = await Department.findById(id);
      if (!department) {
        return NextResponse.json({ error: 'Department not found' }, { status: 404 });
      }
      return NextResponse.json(department);
    }

    // Otherwise, fetch all departments
    const departments = await Department.find();
    return NextResponse.json(departments);
  } catch (error) {
    console.error('Error fetching departments:', error);
    return NextResponse.json({ error: 'Failed to fetch departments' }, { status: 500 });
  }
}

// POST: Create a new department in the database.
export async function POST(req: Request) {
  try {
    const departmentData = await req.json();
    await connectToDatabase();

    const newDepartment = new Department(departmentData);
    await newDepartment.save();

    return NextResponse.json(newDepartment, { status: 201 });
  } catch (error) {
    console.error('Error creating department:', error);
    return NextResponse.json({ error: 'Failed to create department' }, { status: 500 });
  }
}

// PUT: Update a department by ID.
export async function PUT(req: Request) {
  try {
    const { id, ...updatedData } = await req.json();
    await connectToDatabase();

    const updatedDepartment = await Department.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedDepartment) {
      return NextResponse.json({ error: 'Department not found' }, { status: 404 });
    }

    return NextResponse.json(updatedDepartment);
  } catch (error) {
    console.error('Error updating department:', error);
    return NextResponse.json({ error: 'Failed to update department' }, { status: 500 });
  }
}

// DELETE: Remove a department from the database by ID.
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json(); // Get the id from the request body
    await connectToDatabase(); // Ensure the database is connected

    const deletedDepartment = await Department.findByIdAndDelete(id); // Delete the department by id

    if (!deletedDepartment) {
      return NextResponse.json({ error: 'Department not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Department deleted successfully!' });
  } catch (error) {
    console.error('Error deleting department:', error);
    return NextResponse.json({ error: 'Failed to delete department' }, { status: 500 });
  }
}
