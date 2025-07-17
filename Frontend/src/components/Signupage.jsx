import React, { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';
import{useNavigate}from 'react-router-dom'
import axios from "axios";

export default function LoginSignupInterface() {
       const navigate=useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignIn =  () => {
    navigate("/signin")
  };

  const handleSignUp = async (e) => {
    e.preventDefault()
try {
   const res = await axios.post("http://localhost:8080/api/auth/signup",formData)
   res.data.message && navigate("/signin")
} catch (error) {
    alert("sign up failed")
}

};

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Panel - Welcome Back */}
      <div className="flex-1 bg-gradient-to-br from-blue-900 to-blue-700 relative overflow-hidden">
        {/* Geometric decorations */}
        <div className="absolute top-16 right-20 w-8 h-8 bg-blue-400 transform rotate-45 opacity-60"></div>
        <div className="absolute bottom-32 left-16 w-32 h-32 bg-blue-500 rounded-full opacity-20"></div>
        <div className="absolute bottom-16 right-12 w-6 h-6 bg-blue-300 transform rotate-45 opacity-40"></div>
        
        {/* Diamond shape at top */}
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-300 transform rotate-45 opacity-80"></div>
        
        {/* Main content */}
        <div className="flex flex-col justify-center items-start h-full px-16">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome Back!</h1>
          <p className="text-blue-100 text-lg mb-12 leading-relaxed">
            To keep connected with us please<br />
            login with your personal info
          </p>
          
          <button 
            onClick={handleSignIn}
            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300 uppercase tracking-wide"
          >
            SIGN IN
          </button>
        </div>
      </div>

      {/* Right Panel - Create Account */}
      <div className="flex-1 bg-white flex flex-col justify-center items-center px-16">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-orange-500 mb-12 text-center">Create Account</h2>
          
          <div className="space-y-6">
            {/* Name Input */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all duration-300"
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all duration-300"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all duration-300"
              />
            </div>

            {/* Sign Up Button */}
            <button
              onClick={handleSignUp}
              className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white py-4 rounded-lg font-semibold hover:from-orange-500 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 uppercase tracking-wide"
            >
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}