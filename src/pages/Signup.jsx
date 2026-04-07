import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../config/firebase';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setAuthError('');
    if (name && email && password) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        navigate('/');
      } catch (error) {
        setAuthError(error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-ivory">
      
      {/* Editorial side block */}
      <div className="hidden lg:flex flex-1 flex-col justify-center items-center bg-gray-100 relative">
        <div className="absolute inset-0 bg-[#4A1512]/5 mix-blend-overlay"></div>
        <h1 className="text-6xl font-serif italic text-charcoal z-10 px-12 text-center leading-tight">
          Join<br/>Veilux
        </h1>
        <p className="z-10 mt-6 text-sm tracking-widest uppercase text-gray-500">Curated fashion at your fingertips</p>
      </div>

      {/* Form side block */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-32 relative bg-white">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-serif italic text-charcoal">Create Account</h2>
            <p className="mt-2 text-xs uppercase tracking-widest text-gray-400">
              Already a member? <Link to="/login" className="text-maroon border-b border-maroon hover:text-charcoal hover:border-charcoal transition-colors pb-0.5">Sign In</Link>
            </p>
          </div>

          <div className="mt-12">
            {authError && (
              <div className="bg-red-50 text-red-500 text-xs font-sans tracking-widest uppercase p-3 mb-6">
                {authError}
              </div>
            )}
            <form className="space-y-8" onSubmit={handleSignup}>
              
              <div>
                <label className="block text-xs uppercase tracking-widest text-charcoal mb-2">Full Name</label>
                <div className="mt-1">
                  <input
                    type="text"
                    required
                    className="block w-full border-b border-gray-200 py-3 text-charcoal bg-transparent placeholder-gray-300 focus:outline-none focus:border-charcoal transition-colors font-sans text-sm"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs uppercase tracking-widest text-charcoal mb-2">Email address</label>
                <div className="mt-1">
                  <input
                    type="email"
                    required
                    className="block w-full border-b border-gray-200 py-3 text-charcoal bg-transparent placeholder-gray-300 focus:outline-none focus:border-charcoal transition-colors font-sans text-sm"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-charcoal mb-2">Password</label>
                <div className="mt-1">
                  <input
                    type="password"
                    required
                    className="block w-full border-b border-gray-200 py-3 text-charcoal bg-transparent placeholder-gray-300 focus:outline-none focus:border-charcoal transition-colors font-sans text-sm"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full flex justify-center py-4 px-4 border border-transparent text-xs font-semibold tracking-widest uppercase text-white bg-charcoal hover:bg-maroon transition-colors"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
