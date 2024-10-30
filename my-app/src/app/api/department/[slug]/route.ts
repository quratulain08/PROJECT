// app/api/department/[id]/route.ts
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Replace this with your actual database call
    const department = await getDepartmentFromDatabase(id);
    
    if (!department) {
      return NextResponse.json(
        { message: 'Department not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(department);
  } catch (error) {
    console.error('Department fetch error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Mock function - replace with your actual database logic
async function getDepartmentFromDatabase(id: string) {
  // Replace this with your actual database query
  // This is just an example
  return {
    _id: id,
    name: "Computer Science",
    startDate: "2024-01-01",
    category: "Science",
    hodName: "John Doe",
    honorific: "Dr.",
    cnic: "1234567890",
    email: "john@example.com",
    phone: "123-456-7890",
    address: "123 University Road",
    province: "Province",
    city: "City"
  };
}