import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function UserDashboard() {
    const { auth } = usePage().props;

    return (
        <>
            <AuthenticatedLayout
                header={
                    <>
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                           User Dashboard
                        </h2>

                        {auth.user.role==="user" && auth.user.permission.includes('Posts') && (
                            <div className='py-6 text-center flex justify-center gap-10'>
                            <Link
                                href={route('posts.create')}
                                className="ml-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-gray-700"
                            >
                                Create Post
                            </Link>

                             <Link
                                href={route('posts.index')}
                                className="ml-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-gray-700"
                            >
                                All Posts
                            </Link>
                            </div>
                        )}


                          {auth.user.role==="user" && auth.user.permission.includes('Pages') && (
                            <div className='py-6 text-center flex justify-center gap-10'>
                            <Link
                                href={route('page.builder')}
                                className="ml-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-gray-700"
                            >
                                Create Page
                            </Link>

                             <Link
                                href={route('pages.index')}
                                className="ml-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-gray-700"
                            >
                                All Pages
                            </Link>
                            </div>
                        )}


                          {auth.user.role==="user" && auth.user.permission.includes('Tours') && (
                            <div className='py-6 text-center flex justify-center gap-10'>
                            <Link
                                href={route('posts.create')}
                                className="ml-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-gray-700"
                            >
                                Create Tour
                            </Link>

                             <Link
                                href={route('posts.index')}
                                className="ml-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-gray-700"
                            >
                                All Tours
                            </Link>
                            </div>
                        )}
                    </>
                }
            />

            <Head title="Dashboard" />

            <div className="mx-auto max-w-2xl py-8 border-gray-600">
                <h2 className='text-gray-800'>Welcome User : <span className='text-teal-800 font-bold'> {auth.user.name}</span> </h2>
                <p className='text-gray-500'>You are logged in!</p>
            </div>
        </>
    );
}
