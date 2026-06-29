import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import heroImage from '../../assets/hero.png';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Email is invalid';
    if (!formData.password) errs.password = 'Password is required';
    else if (formData.password.length < 6) errs.password = 'Password must be at least 6 characters';

    setValidationErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (validationErrors[e.target.name]) {
      setValidationErrors({ ...validationErrors, [e.target.name]: '' });
    }
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setError('Please fix the validation errors below.');
      return;
    }
    setIsLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/signup', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.msg || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-sky-950 text-white">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <img src={heroImage} alt="Auth background" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-slate-950/70" />
        </div>
        <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-linear-to-br from-cyan-500/20 via-slate-950/0 to-slate-950 blur-3xl" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.18),transparent_20%)]" />
        <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 lg:grid-cols-[1.25fr_0.9fr]">
          <div className="relative flex items-center justify-center overflow-hidden px-6 py-16 sm:px-10">
            <div className="absolute inset-0 bg-linear-to-br from-sky-500/10 via-cyan-500/5 to-transparent" />
            <div className="relative max-w-xl">
              <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm text-teal-200 ring-1 ring-white/10">
                Accelerate your property workflow
              </span>
              <h1 className="mt-8 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Create your account and launch faster
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                Set up your secure dashboard, manage bookings, and unlock premium real estate insights.
              </p>
              <div className="mt-10 overflow-hidden rounded-4xl border border-white/10 shadow-[0_25px_80px_rgba(15,23,42,0.5)]">
                <img src={heroImage} alt="Real estate platform" className="h-80 w-full object-cover object-center" />
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 shadow-lg shadow-slate-950/40">
                  <img src={heroImage} alt="Preview card" className="h-40 w-full object-cover" />
                  <div className="p-4">
                    <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Preview</p>
                    <p className="mt-2 text-base text-slate-300">See your dashboard visuals before you sign up.</p>
                  </div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-4 shadow-lg shadow-slate-950/40">
                  <p className="text-sm uppercase tracking-[0.24em] text-teal-300">Insightful tools</p>
                  <p className="mt-2 text-base text-slate-300">Access the features designed for real estate teams.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center px-6 py-12 sm:px-10">
            <div className="w-full max-w-md rounded-4xl border border-white/10 bg-slate-900/95 p-8 shadow-[0_45px_120px_-40px_rgba(15,23,42,0.8)] backdrop-blur-xl">
              <div className="text-center mb-8">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-500/10 shadow-[0_0_25px_rgba(20,184,166,0.2)]">
                  <FiUser className="w-8 h-8 text-teal-300" />
                </div>
                <h2 className="mt-6 text-3xl font-semibold text-white">Create Account</h2>
                <p className="mt-3 text-slate-400">Sign up to start managing your properties with style.</p>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/40 text-red-300 px-4 py-3 rounded-2xl mb-6 text-sm text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">Full Name</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                      <FiUser className={`w-5 h-5 ${validationErrors.name ? 'text-red-400' : 'text-slate-500'} transition-colors`} />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full rounded-2xl border px-4 py-3 pl-12 text-slate-100 shadow-sm transition duration-300 ${validationErrors.name ? 'border-red-500 bg-slate-950/80 focus:border-red-400 focus:ring-red-400/20' : 'border-slate-700 bg-slate-950/70 focus:border-teal-400 focus:ring-teal-400/20'}`}
                      placeholder="John Doe"
                    />
                  </div>
                  {validationErrors.name && <p className="text-sm text-red-400">{validationErrors.name}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">Email Address</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                      <FiMail className={`w-5 h-5 ${validationErrors.email ? 'text-red-400' : 'text-slate-500'} transition-colors`} />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full rounded-2xl border px-4 py-3 pl-12 text-slate-100 shadow-sm transition duration-300 ${validationErrors.email ? 'border-red-500 bg-slate-950/80 focus:border-red-400 focus:ring-red-400/20' : 'border-slate-700 bg-slate-950/70 focus:border-teal-400 focus:ring-teal-400/20'}`}
                      placeholder="name@example.com"
                    />
                  </div>
                  {validationErrors.email && <p className="text-sm text-red-400">{validationErrors.email}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">Password</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                      <FiLock className={`w-5 h-5 ${validationErrors.password ? 'text-red-400' : 'text-slate-500'} transition-colors`} />
                    </div>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full rounded-2xl border px-4 py-3 pl-12 text-slate-100 shadow-sm transition duration-300 ${validationErrors.password ? 'border-red-500 bg-slate-950/80 focus:border-red-400 focus:ring-red-400/20' : 'border-slate-700 bg-slate-950/70 focus:border-teal-400 focus:ring-teal-400/20'}`}
                      placeholder="••••••••"
                    />
                  </div>
                  {validationErrors.password && <p className="text-sm text-red-400">{validationErrors.password}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-linear-to-r from-teal-500 to-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-teal-500/25 transition hover:from-teal-400 hover:to-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <span className="relative z-10">{isLoading ? 'Creating Account...' : 'Sign Up'}</span>
                  {!isLoading && <FiArrowRight className="ml-2 h-5 w-5 text-slate-950" />}
                  <span className="absolute inset-0 bg-white/10 opacity-0 transition duration-300 group-hover:opacity-100" />
                </button>
              </form>

              <p className="mt-8 text-center text-slate-400">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-teal-300 hover:text-teal-200">
                  Log in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
