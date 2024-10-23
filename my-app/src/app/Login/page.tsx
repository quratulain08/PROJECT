const Login = () => {
    return (
      <div className="flex h-screen">
        {/* Left side - Green with curve */}
        <div className="w-1/2 bg-green-700 rounded-tr-[100px] rounded-br-[100px] flex items-center justify-center">
          <h2 className="text-white text-2xl font-bold">Welcome Back!</h2>
        </div>
  
        {/* Right side - White */}
        <div className="w-1/2 bg-white flex items-center justify-center">
          <div className="w-80">
            <h2 className="text-xl mb-4 text-gray-800 text-center font-bold">Login</h2>
  
            {/* Email Input */}
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded mb-4 text-sm focus:outline-none focus:ring focus:ring-green-700"
            />
  
            {/* Password Input */}
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded mb-4 text-sm focus:outline-none focus:ring focus:ring-green-700"
            />
  
            {/* Login Button - Smaller and rounded */}
            <button className="w-full bg-green-700 text-white py-2 rounded-full text-sm hover:bg-green-600 transition duration-300 ease-in-out">
              Login
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Login;
  