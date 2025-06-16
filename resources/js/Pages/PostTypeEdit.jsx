import React from 'react';
import { useForm } from '@inertiajs/react';

export default function PostTypeEdit({id,name ,slug}) {

  const { data, setData, put, processing, errors, reset } = useForm({
    name: name||'',
    slug: slug||'',

  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('postType.update' ,id));
  };

  return (
    <div>
   <h2 className='text-center text-gray-700 font-bold my-5'>Edit Post Type </h2>

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
            type="text"
            name="slug"
            value={data.slug}
            onChange={(e) => setData('slug', e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="Slug"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
          Slug
          </label>
          {errors.slug && <div className="text-red-500 text-sm">{errors.slug}</div>}
        </div>

        <button
          type="submit"
          disabled={processing}
          className="text-white bg-teal-800 hover:bg-gray-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Edit
        </button>
      </form>


    </div>
  )
}
