import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />
             <div className="">
                <header className="">
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/62/CMS_Law_Tax_Future_2021_New_Logo.png" className="h-10" alt="Flowbite Logo" />
                    
                </a>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                    <a href="#" className="block px-4 py-2 text-teal-800 bg-blue-700 rounded-sm md:bg-transparent  dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
                    </li>
                   {auth.user ? (
                            <Link
                                href={auth.user.role === 'admin' ? route('dashboard') : route('user.dashboard')}
                                    className="flex items-center gap-2 px-4 py-2 text-white bg-teal-800 rounded-sm  md:text-white hover:text-teal-500  dark:text-white dark:text-white md:dark:text-blue-500"
                                
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="flex items-center gap-2 px-4 py-2 text-white bg-teal-800 rounded-sm  md:text-white hover:text-teal-500  dark:text-white dark:text-white md:dark:text-blue-500"
                                >
                                    Log in <svg class="w-6 h-6 text-current dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clip-rule="evenodd"/>
                                </svg>


                                </Link>
                            </>
                        )}
                </ul>
                </div>
            </div>
            </nav>


                </header>
               <div className='text-center py-12 font-bold text-2xl text-teal-800 flex justify-center my-12'>
              <h2 className='pt-6 mx-4'>Welcome in our CMS</h2>     

               </div>
            </div>
        </>
    );
}
