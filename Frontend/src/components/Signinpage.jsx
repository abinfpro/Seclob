import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import{useNavigate}from 'react-router-dom'
import axios from 'axios';

export default function SignInInterface() {

    const navigate=useNavigate()


  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignIn = async() => {
    
try {
  const res = await axios.post("https://seclob-fsqq.onrender.com/api/auth/login",formData)
  res.data.message && navigate("/home")
} catch (error) {
  
}
  };

  const handleSignUp = () => {
    navigate('/')
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Panel - Sign In Form */}
      <div className="flex-1 bg-white flex flex-col justify-center items-center px-16">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-orange-500 mb-12 text-center">
            Sign In to<br />
            Your Account
          </h2>
          
          <div className="space-y-6">
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

            {/* Forgot Password Link */}
            <div className="text-center">
              <button
                onClick={handleForgotPassword}
                className="text-gray-600 text-sm hover:text-orange-500 transition-colors duration-300"
              >
                forgot password?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              onClick={handleSignIn}
              className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white py-4 rounded-lg font-semibold hover:from-orange-500 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 uppercase tracking-wide"
            >
              SIGN IN
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel - Hello Friend */}
      <div className="flex-1 bg-gradient-to-br from-blue-900 to-blue-700 relative overflow-hidden">
        {/* Geometric decorations */}
        <div className="absolute top-16 left-20 w-8 h-8 bg-blue-400 transform rotate-45 opacity-60"></div>
        <div className="absolute top-32 right-16 w-32 h-32 bg-blue-500 rounded-full opacity-20"></div>
        <div className="absolute bottom-16 left-12 w-6 h-6 bg-blue-300 transform rotate-45 opacity-40"></div>
        <div className="absolute bottom-32 right-20 w-4 h-4 bg-blue-400 rounded-full opacity-50"></div>
        
        {/* Triangle shape at bottom */}
        <div className="absolute bottom-20 right-32 w-0 h-0 border-l-8 border-r-8 border-b-12 border-l-transparent border-r-transparent border-b-blue-300 opacity-60"></div>
        
        {/* Main content */}
        <div className="flex flex-col justify-center items-start h-full px-16">
          <h1 className="text-4xl font-bold text-white mb-4">Hello Friend!</h1>
          <p className="text-blue-100 text-lg mb-12 leading-relaxed">
            Enter your personal details and<br />
            start your journey with us
          </p>
          
          <button 
            onClick={handleSignUp}
            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300 uppercase tracking-wide"
          >
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
}