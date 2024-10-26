"use client";
import React, { useState } from 'react';

const provinces = [
    { name: 'Punjab', cities: ['Lahore', 'Faisalabad', 'Rawalpindi', 'Multan'] },
    { name: 'Sindh', cities: ['Karachi', 'Hyderabad', 'Sukkur', 'Larkana'] },
    { name: 'Khyber Pakhtunkhwa', cities: ['Peshawar', 'Mardan', 'Abbottabad', 'Swat'] },
    { name: 'Balochistan', cities: ['Quetta', 'Gwadar', 'Sibi', 'Zhob'] },
    { name: 'Gilgit-Baltistan', cities: ['Gilgit', 'Skardu', 'Hunza', 'Ghanche'] },
    { name: 'Azad Kashmir', cities: ['Muzaffarabad', 'Mirpur', 'Rawalakot', 'Bhimber'] },
];

export default function FacultyForm() {
    const [selectedProvince, setSelectedProvince] = useState<string>('');
    const [selectedCity, setSelectedCity] = useState<string>('');

    const handleProvinceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedProvince(event.target.value);
        setSelectedCity(''); // Reset city selection
    };

    return (
        <div className="max-w-8xl mx-auto w-full">
            <form className="p-2 text-sm">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {/* Right Side (Instructions Box) */}
                    <div className="hidden lg:block border border-green-500 p-4 w-full">
                        <h2 className="text-green-600 font-semibold mb-2">Instructions</h2>
                        <div className="text-red-600 text-xs">
                            <p>1. Name & CNIC cannot be changed once added.</p>
                            <p>2. For Computing Faculty Types and Requirements/Criteria please visit the website.</p>
                            <p>3. Core Computing Teacher (Check Box) must be checked for computing faculty.</p>
                        </div>
                    </div>

                    {/* Left Side (Form Sections) */}
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Personal Information */}
                        <div className="border border-green-500 p-4">
                            <h2 className="text-green-600 font-semibold mb-2">Personal Information</h2>
                            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold mb-1">Honorific</label>
                                    <select className="w-full p-4 border rounded-md text-sm min-h-[50px]">
                                        <option>Mr</option>
                                        <option>Ms</option>
                                        <option>Mrs</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold mb-1">Name</label>
                                    <input type="text" className="w-full p-4 border rounded-md text-sm min-h-[50px]" />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold mb-1">Gender</label>
                                    <select className="w-full p-4 border rounded-md text-sm min-h-[50px]">
                                        <option>Male</option>
                                        <option>Female</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold mb-1">CNIC</label>
                                    <input type="text" className="w-full p-4 border rounded-md text-sm min-h-[50px]" />
                                </div>
                            </div>
                        </div>

                        {/* Address Information */}
                        <div className="border border-green-500 p-4">
                            <h2 className="text-green-600 font-semibold mb-2">Address Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold mb-1">Address</label>
                                    <input type="text" className="w-full p-4 border rounded-md text-sm min-h-[50px]" />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold mb-1">Province</label>
                                    <select 
                                        className="w-full p-4 border rounded-md text-sm min-h-[50px]" 
                                        value={selectedProvince} 
                                        onChange={handleProvinceChange}
                                    >
                                        <option value="">Select Province</option>
                                        {provinces.map((province) => (
                                            <option key={province.name} value={province.name}>
                                                {province.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold mb-1">City</label>
                                    <select 
                                        className="w-full p-4 border rounded-md text-sm min-h-[50px]" 
                                        value={selectedCity} 
                                        onChange={(e) => setSelectedCity(e.target.value)} 
                                        disabled={!selectedProvince}
                                    >
                                        <option value="">Select City</option>
                                        {selectedProvince && provinces.find(p => p.name === selectedProvince)?.cities?.map((city) => (
                                            <option key={city} value={city}>
                                                {city}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Employment Details */}
                        <div className="border border-green-500 p-4">
                            <h2 className="text-green-600 font-semibold mb-2">Employment Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold mb-1">Contract Type</label>
                                    <select className="w-full p-4 border rounded-md text-sm min-h-[50px]">
                                        <option>Permanent</option>
                                        <option>Contractual</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold mb-1">Academic Rank</label>
                                    <select className="w-full p-4 border rounded-md text-sm min-h-[50px]">
                                        <option>Professor</option>
                                        <option>Assistant Professor</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold mb-1">Joining Date</label>
                                    <input type="date" className="w-full p-4 border rounded-md text-sm min-h-[50px]" />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold mb-1">Leaving Date</label>
                                    <input type="date" className="w-full p-4 border rounded-md text-sm min-h-[50px]" />
                                </div>

                                <div className="flex items-center">
                                    <label className="block text-xs font-semibold mb-1">Is Core Computing Teacher</label>
                                    <input type="checkbox" className="ml-2" />
                                </div>
                            </div>
                        </div>

                        {/* Last Academic Qualification */}
                        <div className="border border-green-500 p-4">
                            <h2 className="text-green-600 font-semibold mb-2">Last Academic Qualification</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold mb-1">Degree Name</label>
                                    <input type="text" className="w-full p-2 border rounded-md text-sm min-h-[50px]" />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold mb-1">Degree Type</label>
                                    <input type="text" className="w-full p-4 border rounded-md text-sm min-h-[50px]" />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold mb-1">Field of Study</label>
                                    <input type="text" className="w-full p-4 border rounded-md text-sm min-h-[50px]" />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold mb-1">Degree Awarding Country</label>
                                    <input type="text" className="w-full p-4 border rounded-md text-sm min-h-[50px]" />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold mb-1">Degree Awarding Institute</label>
                                    <input type="text" className="w-full p-4 border rounded-md text-sm min-h-[50px]" />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold mb-1">Degree Start Date</label>
                                    <input type="date" className="w-full p-4 border rounded-md text-sm min-h-[50px]" />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold mb-1">Degree End Date</label>
                                    <input type="date" className="w-full p-4 border rounded-md text-sm min-h-[50px]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex justify-center">
                    <button className="w-40 bg-green-500 text-white p-3 rounded-md hover:bg-green-600 text-sm">Submit</button>
                </div>
            </form>
        </div>
    );
}
