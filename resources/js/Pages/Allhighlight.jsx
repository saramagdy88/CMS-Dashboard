import React from 'react'
import { router } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function Allhighlight({highlights}) {


const handleDelete = (id) => {
    if (confirm('Are you sure to delete this highlight?')) {
   router.delete(route('highlight.destroy', id));
    }
  }

  return (
 <div>
  <h1 className='font-bold text-center text-2xl my-6'>All Highlights</h1>

        <div class="relative shadow-md sm:rounded-lg mx-12 ">
            <table class="w-full text-sm   text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-green-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                        Highlight ID
                        </th>

                        <th scope="col" class="px-6 py-3">
                          Highlight Name
                        </th>

                         <th scope="col" class="px-6 py-3">
                           Post Types
                        </th>

                        <th scope="col" colSpan={2} class="px-6 py-3">
                            Action
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {highlights.map((highlight) => (
                    <tr key={highlight.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {highlight.id}
                        </th>
                        <td class="px-6 py-4  text-gray-800 font-bold">
                            {highlight.name}
                       </td>

                          <td class="px-6 py-4  text-gray-800 font-bold">
                          {highlight.post_types.map((type) => (
                            <span key={type.id} className="inline-block bg-sky-200 text-gray-700 px-2 py-1 rounded mr-1 text-xs">
                            {type.name}
                            </span>
                        ))}

                       </td>


             <td className="px-3 py-4">
                <button
                    onClick={() => handleDelete(highlight.id)}
                    className="text-red-600 hover:underline"
                >
                    Delete
                </button>
                </td>

                <td className="px-3 py-4">
               <Link
                href={route('highlight.edit',highlight.id)}
                className="text-blue-600 hover:underline"
            >
                Edit
            </Link>
                </td>
         </tr>
                    ))}
            
                </tbody>
            </table>
        </div>



    </div>
  );














}
