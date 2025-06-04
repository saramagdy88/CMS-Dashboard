import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function CreateUser() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    repeat_password: '',
    permission: [],
  });

  const handleCheckboxChange = (value) => {
    if (data.permission.includes(value)) {
      setData('permission', data.permission.filter((item) => item !== value));
    } else {
      setData('permission', [...data.permission, value]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('user.store'));
  };

  return (
    <div className="create">
      <h2 className="text-center font-bold my-7">Create User</h2>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        {/* Name */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
          {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
        </div>

        {/* Email */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
          {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
        </div>

        {/* Password */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Password
          </label>
          {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
        </div>

        {/* Confirm Password */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="repeat_password"
            value={data.repeat_password}
            onChange={(e) => setData('repeat_password', e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label htmlFor="repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Confirm password
          </label>
          {errors.repeat_password && <div className="text-red-500 text-sm">{errors.repeat_password}</div>}
        </div>

        {/* Permissions */}
        <div className="my-4">
          <label className="block mb-2 font-medium text-gray-700">Permission:</label>

          {['Pages', 'Posts', 'Tours'].map((perm) => (
            <div key={perm} className="mb-2">
              <input
                id={`checkbox-${perm}`}
                type="checkbox"
                value={perm}
                checked={data.permission.includes(perm)}
                onChange={() => handleCheckboxChange(perm)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
              />
              <label htmlFor={`checkbox-${perm}`} className="ms-2 text-sm font-medium text-gray-900">
                {perm.charAt(0).toUpperCase() + perm.slice(1)}
              </label>
            </div>
          ))}

          {errors.permission && <div className="text-red-500 text-sm">{errors.permission}</div>}
        </div>

        <button
          type="submit"
          disabled={processing}
          className="text-white bg-teal-800 hover:bg-gray-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
