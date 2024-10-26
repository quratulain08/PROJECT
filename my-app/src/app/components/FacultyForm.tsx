// components/FacultyForm.js
export default function FacultyForm() {
    return (
        <div className="max-w-6xl mx-auto w-full">
            <form className="bg-gray-50 p-8 rounded-md border border-gray-200 text-sm">
                {/* Instructions */}
                <div className="text-red-600 text-xs mb-4">
                    <p>1. Name & CNIC can not be changed once added.</p>
                    <p>2. For Computing Faculty Types and Requirements/Criteria, please visit the website.</p>
                    <p>3. Core Computing Teacher (Check Box) must be checked for computing faculty.</p>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-xs font-semibold mb-1">Honorific</label>
                        <select className="w-full p-2 border rounded-md text-sm">
                            <option>Mr</option>
                            <option>Ms</option>
                            <option>Mrs</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold mb-1">Name</label>
                        <input type="text" className="w-full p-2 border rounded-md text-sm" />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold mb-1">Gender</label>
                        <select className="w-full p-2 border rounded-md text-sm">
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold mb-1">CNIC</label>
                        <input type="text" className="w-full p-2 border rounded-md text-sm" />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold mb-1">Date of Birth</label>
                        <input type="date" className="w-full p-2 border rounded-md text-sm" />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold mb-1">Phone No</label>
                        <input type="text" className="w-full p-2 border rounded-md text-sm" />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold mb-1">Email</label>
                        <input type="email" className="w-full p-2 border rounded-md text-sm" />
                    </div>
                </div>

                {/* Address Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-xs font-semibold mb-1">Address</label>
                        <input type="text" className="w-full p-2 border rounded-md text-sm" />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold mb-1">Province</label>
                        <input type="text" className="w-full p-2 border rounded-md text-sm" />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold mb-1">City</label>
                        <input type="text" className="w-full p-2 border rounded-md text-sm" />
                    </div>
                </div>

                {/* Employment Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-xs font-semibold mb-1">Contract Type</label>
                        <select className="w-full p-2 border rounded-md text-sm">
                            <option>Permanent</option>
                            <option>Contractual</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold mb-1">Academic Rank</label>
                        <select className="w-full p-2 border rounded-md text-sm">
                            <option>Professor</option>
                            <option>Assistant Professor</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold mb-1">Joining Date</label>
                        <input type="date" className="w-full p-2 border rounded-md text-sm" />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold mb-1">Leaving Date</label>
                        <input type="date" className="w-full p-2 border rounded-md text-sm" />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold mb-1">Is Core Computing Teacher</label>
                        <input type="checkbox" className="ml-2" />
                    </div>
                </div>

                {/* Academic Qualification */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-semibold mb-1">Degree Name</label>
                        <input type="text" className="w-full p-2 border rounded-md text-sm" />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold mb-1">Degree Type</label>
                        <input type="text" className="w-full p-2 border rounded-md text-sm" />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold mb-1">Field of Study</label>
                        <input type="text" className="w-full p-2 border rounded-md text-sm" />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold mb-1">Degree Awarding Country</label>
                        <input type="text" className="w-full p-2 border rounded-md text-sm" />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold mb-1">Degree Awarding Institute</label>
                        <input type="text" className="w-full p-2 border rounded-md text-sm" />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold mb-1">Degree Start Date</label>
                        <input type="date" className="w-full p-2 border rounded-md text-sm" />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold mb-1">Degree End Date</label>
                        <input type="date" className="w-full p-2 border rounded-md text-sm" />
                    </div>
                </div>

                <button className="mt-6 w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 text-sm">Submit</button>
            </form>
        </div>
    );
}
