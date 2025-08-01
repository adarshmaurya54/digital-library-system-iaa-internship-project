import React, { useState } from 'react';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userRegister } from '../redux/features/auth/authAction';
import toast from 'react-hot-toast';

function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const validateEmail = (email) => {
        // Basic email regex pattern
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { firstName, lastName, email, password, confirmPassword, role } = formData;

        // Check for empty fields
        if (!firstName || !lastName || !email || !password || !confirmPassword || !role) {
            toast.error('All fields are required!');
            return;
        }

        // Email format check
        if (!validateEmail(email)) {
            toast.error('Please enter a valid email address!');
            return;
        }

        // Password match check
        if (password !== confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }

        const payload = {
            firstName, lastName, email, password, role
        };

        dispatch(userRegister(payload)).then((res) => {
            if (res.payload?.success) {
                navigate("/login"); 
            }
        });
    };

    return (
        <div className="md:py-5">
            <div className="relative flex flex-col p-6 bg-white md:rounded-2xl shadow-xl border border-gray-200 md:max-w-lg w-full mx-auto">
                <div className="text-2xl font-bold mb-2 text-[#002F6C] text-center">
                    Create your account
                </div>
                <div className="text-sm font-medium mb-4 text-center text-[#002F6C]">
                    Sign up to get started
                </div>
                <form
                    className="grid gap-4 grid-cols-1 md:grid-cols-2"
                    onSubmit={handleSubmit}
                >
                    <div className='md:col-span-1'>
                        <label htmlFor="firstName" className="block text-gray-600 text-sm mb-1">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            placeholder="Enter your first name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full h-11 px-3 rounded-xl border border-gray-300 focus:ring-2 ring-[#002F6C] outline-none transition"
                        />
                    </div>
                    <div className='md:col-span-1'>
                        <label htmlFor="lastName" className="block text-gray-600 text-sm mb-1">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            placeholder="Enter your last name"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full h-11 px-3 rounded-xl border border-gray-300 focus:ring-2 ring-[#002F6C] outline-none transition"
                        />
                    </div>
                    <div className='md:col-span-2'>
                        <label htmlFor="email" className="block text-gray-600 text-sm mb-1">Email</label>
                        <input
                            type="text"
                            id="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full h-11 px-3 rounded-xl border border-gray-300 focus:ring-2 ring-[#002F6C] outline-none transition"
                        />
                    </div>
                    <div className='md:col-span-2'>
                        <label htmlFor="role" className="block text-gray-600 text-sm mb-1">Role</label>
                        <select
                            id="role"
                            value={formData.role}
                            onChange={handleChange}
                            className={`w-full h-11 px-3 rounded-xl border border-gray-300 focus:ring-2 ring-[#002F6C] outline-none transition ${formData.role === '' ? 'text-gray-400' : 'text-black'
                                }`}
                        >
                            <option value="" disabled>Select your role</option>
                            <option value="Trainee" className='text-black'>Trainee</option>
                            <option value="Faculty" className='text-black'>Faculty</option>
                        </select>
                    </div>
                    <div className="md:col-span-1">
                        <label htmlFor="password" className="block text-gray-600 text-sm mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full h-11 px-3 rounded-xl border border-gray-300 focus:ring-2 ring-[#002F6C] outline-none transition"
                        />
                    </div>
                    <div className="md:col-span-1">
                        <label htmlFor="confirmPassword" className="block text-gray-600 text-sm mb-1">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full h-11 px-3 rounded-xl border border-gray-300 focus:ring-2 ring-[#002F6C] outline-none transition"
                        />
                    </div>
                    <div className="md:col-span-2 text-center">
                        <Button type='submit' text='Sign Up' />
                    </div>
                </form>
                <div className="text-sm text-center mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="text-sky-700 hover:underline">Log in here</Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;
