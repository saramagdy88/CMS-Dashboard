import React from 'react';
import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';


export default function PagesList({ pages }) {

  const handleDelete = (id) => {
    if (confirm('Are you sure to delete this page?')) {
 router.delete(route('pages.destroy', id));
    }
  }

  return (

    
 <div>
  <h1 className='font-bold text-center text-2xl my-6'>All Built pages</h1>



        <div class="relative shadow-md sm:rounded-lg">
            <table class="w-full text-sm  m-10 text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-teal-200 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                        Page ID
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Page Title
                        </th>
                        {/* <th scope="col" class="px-6 py-3">
                            Page View
                        </th> */}

                           <th scope="col" class="px-6 py-3">
                            Page Status
                        </th>
                        <th scope="col" colSpan={2} class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {pages.map((page) => (
                    <tr key={page.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {page.id}
                        </th>
                        <td class="px-6 py-4 font-bold">
                            <Link href={route('pages.show', page.slug)} className="text-teal-800 underline text-md">
                            {page.title}
                            </Link>
                    </td>
                    <td className="px-6 py-4 font-bold text-md">
                    <span
                        className={`rounded-lg p-2
                        ${page.status === 'draft' ? 'bg-yellow-200 text-gray-700' : ''}
                        ${page.status === 'publish' ? 'bg-green-200 text-green-800' : ''}
                        `}
                    >
                        {page.status}
                    </span>
                    </td>

 
                    
             <td className="px-3 py-4">
                <button
                    onClick={() => handleDelete(page.id)}
                    className="text-red-600 hover:underline"
                >
                    Delete
                </button>
                </td>

                <td className="px-3 py-4">
               <Link
                href={route('pages.edit', page.id)}
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
