import React from 'react';
import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { MdRemoveRedEye } from "react-icons/md";


export default function ViewPost({ posts,postType }) {

  const handleDelete = (id) => {
    if (confirm('Are you sure to delete this post?')) {
 router.delete(route('post.destroy', id));
    }
  }


  console.log(posts);

  return (
 <div>
  <h1 className='font-bold text-center text-2xl my-6'>All Built Posts</h1>



        <div class="relative shadow-md sm:rounded-lg">
            <table class="w-full text-sm  m-10 text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-blue-200 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                        post ID
                        </th>
                        <th scope="col" class="px-6 py-3">
                            post Title
                        </th>
                        {/* <th scope="col" class="px-6 py-3">
                            Post View
                        </th> */}
                         <th scope="col" class="px-6 py-3">
                            Post Category
                        </th>

                        <th scope="col" class="px-6 py-3">
                            Post Tags
                        </th>

                        <th scope="col" class="px-6 py-3">
                            Post Highlight
                        </th>
                         <th scope="col" class="px-6 py-3">
                            Post Status
                        </th>
                        <th scope="col" colSpan={2} class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                    <tr key={post.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {post.id}
                        </th>
                          <td className="px-6 py-4 font-bold text-lg">
                            <Link
                              href={route('post.show', post.id)}
                              className="text-teal-800 underline text-md flex items-center gap-1"
                            >
                              {post.title}
                              <MdRemoveRedEye className=" text-xl" />
                            </Link>
                       </td>


                      {/* <td class="px-6 py-10 font-bold">
               <iframe
                    title={`Preview-${post.id}`}
                    style={{ width: '400px', height: '300px', border: '1px solid #ccc', borderRadius: '8px' }}
                    sandbox=""
                    srcDoc={`<!DOCTYPE html>
                        <html>
                        <head>
                        <style>
                        
                        </style>
                        </head>
                        <body>
                        ${post.content || '<p>No preview</p>'}
                        </body>
                        </html>`}
                    />
                        </td>  */}
                    

                  <td className="px-2 py-2 font-bold text-md">
                {(post.categories || []).map((cat) => (
                  <span key={cat.id} className='bg-sky-200 text-gray-700 rounded-lg p-2 mx-2'>
                    {cat.name}
                  </span>
                ))}
              </td>

              <td className="px-2 py-2 font-bold text-md">
                {(post.tags || []).map((tag) => (
                  <span key={tag.id} className='bg-gray-200 text-gray-700 rounded-lg p-2 mx-2'>
                    {tag.name}
                  </span>
                ))}
              </td>

              <td className="px-2 py-2 font-bold text-md">
                {(post.highlights || []).map((high) => (
                  <span key={high.id} className='bg-yellow-100 text-gray-700 rounded-lg p-2 mx-2'>
                    {high.name}
                  </span>
                ))}
              </td>




             <td className="px-6 py-4 font-bold text-md">
            <span
                className={`rounded-lg p-2
                ${post.status === 'draft' ? 'bg-yellow-200 text-gray-700' : ''}
                ${post.status === 'publish' ? 'bg-green-200 text-green-800' : ''}
                `}
            >
                {post.status}
            </span>
            </td>


             <td className="px-3 py-4">
                <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-600 hover:underline"
                >
                    Delete
                </button>
                </td>


                <td className="px-3 py-4">
      
                <Link
                href={route('post.edit', { id: post.id, slug: postType.slug })}
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
