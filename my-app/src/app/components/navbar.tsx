import Link from 'next/link';
import { FaHome, FaUniversity, FaFolder, FaUsers, FaChalkboardTeacher, FaUser } from 'react-icons/fa';
import { MdKeyboardArrowDown } from 'react-icons/md'; // Importing the dropdown icon

const Navbar = () => {
  return (
    <>
      {/* First Navbar */}
      <nav className="bg-white border-b border-gray-300 shadow-sm">
        <div className="container mx-auto px-4 py-1 flex justify-between items-center">
          {/* Left side - Logo and Title */}
          <div className="flex items-center">
            <img src="/nceac-logo.jpg" alt="NCAA Logo" className="h-12 mr-3" />
            <h1 className="text-lg text-gray-700 font-normal">
              Air University, Islamabad
            </h1>
          </div>

          {/* Right Side - User Profile */}
          <div className="flex items-center">
            <span className="mr-2 text-gray-700">User</span>
          </div>
        </div>
      </nav>

      {/* Second Navbar */}
      <nav className="bg-white border-b border-gray-300 shadow-sm">
        <div className="container mx-auto px-2 py-1 flex justify-between items-center">
          {/* Center Links */}
          <div className="flex space-x-8">
            <Link href="/dashboard" className="flex flex-col items-center text-gray-700 hover:text-white hover:bg-green-500 px-3 py-2 rounded">
              <FaHome className="text-2xl text-blue-500 mb-2" /> 
              <span className="text-sm">Dashboard</span>
            </Link>
            <Link href="/profile" className="flex flex-col items-center text-gray-700 hover:text-white hover:bg-green-500 px-3 py-2 rounded">
              <FaUser className="text-2xl text-black mb-2" />
              <span className="text-sm">Your Profile</span>
            </Link>
            <Link href="/profile" className="flex flex-col items-center text-gray-700 hover:text-white hover:bg-green-500 px-3 py-2 rounded">
              <FaUniversity className="text-2xl text-green-500 mb-2" />
              <span className="text-sm">Institute Profile</span>
              <MdKeyboardArrowDown className="text-sm text-gray-700 ml-1" /> {/* Dropdown icon */}
            </Link>
            <Link href="/department" className="flex flex-col items-center text-gray-700 hover:text-white hover:bg-green-500 px-3 py-2 rounded">
              <FaFolder className="text-2xl text-red-500 mb-2" />
              <span className="text-sm">Departments & Programs</span>
              <MdKeyboardArrowDown className="text-sm text-gray-700 ml-1" /> {/* Dropdown icon */}
            </Link>
            <Link href="/Faculty" className="flex flex-col items-center text-gray-700 hover:text-white hover:bg-green-500 px-3 py-2 rounded">
              <FaChalkboardTeacher className="text-2xl text-purple-500 mb-2" />
              <span className="text-sm">Faculty Directory</span>
            </Link>
            <Link href="/students-directory" className="flex flex-col items-center text-gray-700 hover:text-white hover:bg-green-500 px-3 py-2 rounded">
              <FaUsers className="text-2xl text-black mb-2" />
              <span className="text-sm">Students Directory</span>
              <MdKeyboardArrowDown className="text-sm text-gray-700 ml-1" /> 
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;