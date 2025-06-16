
//import SidebarComp from '@/Components/Sidebar';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Sidebar, SidebarItems, SidebarItemGroup, SidebarItem, SidebarCollapse } from 'flowbite-react';
import { BiSolidCategory } from "react-icons/bi";
import { TiEdit } from "react-icons/ti";
export default function PostTypes({types}) {
    console.log(types)
  return (
    <div>
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            
            <Sidebar aria-label="Sidebar with multi-level dropdown example" className="fixed top-0 left-0 z-40 w-64 h-screen bg-gray-800">
                <div className="h-full px-3 py-4 overflow-y-auto bg-teal-600 dark:bg-gray-800">
                    {/* Logo */}
                    <div className='text-center bg-white py-2 rounded mb-4'>
                        <a href="https://flowbite.com/" className="flex items-center ps-2.5">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/6/62/CMS_Law_Tax_Future_2021_New_Logo.png" className="h-10 mx-auto" alt="Flowbite Logo" />
                        </a>
                    </div>

                    <SidebarItems>
                        <SidebarItemGroup>
                            <SidebarItem className='text-white hover:text-gray-900 font-bold' href="#" icon={() => (
                 <svg
                className="w-6 h-6 transition duration-75 group-hover:text-gray-900 text-gray-300 dark:text-gray-400 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
                  clipRule="evenodd"
                />
              </svg>

                            )}>
                                Dashboard
                            </SidebarItem>

                            <SidebarCollapse 
                                label="E-commerce" 
                                className='text-white hover:text-gray-900 font-bold'
                                icon={() => (
                                    <svg  className="w-6 h-6 transition duration-75 group-hover:text-gray-900 text-gray-200 dark:text-gray-400 dark:group-hover:text-white"aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                                        <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                                    </svg>
                                )}
                            >
                                <SidebarItem href="#">Products</SidebarItem>
                                <SidebarItem href="#">Billing</SidebarItem>
                                <SidebarItem href="#">Invoice</SidebarItem>
                            </SidebarCollapse>

                            <SidebarItem 
                                href="#" 
                                className='text-white hover:text-gray-900 font-bold'
                                icon={() => (
                                    <svg className="w-6 h-6 transition duration-75 group-hover:text-gray-900 text-gray-300 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                        <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                                    </svg>
                                )}
                            >
                                Users
                            </SidebarItem>

                            <SidebarItem 
                                href={route('user.create')} 
                                className='text-white hover:text-gray-900 font-bold'
                                icon={() => (
                                    <svg className="w-6 h-6 transition duration-75 group-hover:text-gray-900 text-gray-300 dark:text-gray-400 dark:group-hover:text-white"aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                        <path fillRule="evenodd" d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z" clipRule="evenodd"/>
                                    </svg>
                                )}
                            >
                                Create user
                            </SidebarItem>


                            <SidebarItem 
                                href="/charts" 
                                     className='text-white hover:text-gray-900 font-bold'
                                icon={() => (
                                    <svg     className="w-6 h-6 transition duration-75 group-hover:text-gray-900 text-gray-300 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v15a1 1 0 0 0 1 1h15M8 16l2.5-5.5 3 3L17.273 7 20 9.667"/>
                                    </svg>
                                )}
                            >
                                Charts
                            </SidebarItem>

                            <SidebarItem 
                                href="#"
                                     className='text-white hover:text-gray-900 font-bold' 
                                icon={() => (
                                    <svg   className="w-6 h-6 transition duration-75 group-hover:text-gray-900 text-gray-300 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                        <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                                    </svg>
                                )}
                            >
                                Category
                            </SidebarItem>

                            <SidebarItem 
                                href="#" 
                                     className='text-white hover:text-gray-900 font-bold'
                                icon={() => (
                                    <svg className="w-6 h-6 transition duration-75 group-hover:text-gray-900 text-gray-300 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                        <path d="m6 10.5237-2.27075.6386C3.29797 11.2836 3 11.677 3 12.125V20c0 .5523.44772 1 1 1h2V10.5237Zm12 0 2.2707.6386c.4313.1213.7293.5147.7293.9627V20c0 .5523-.4477 1-1 1h-2V10.5237Z"/>
                                        <path fillRule="evenodd" d="M12.5547 3.16795c-.3359-.22393-.7735-.22393-1.1094 0l-6.00002 4c-.45952.30635-.5837.92722-.27735 1.38675.30636.45953.92723.5837 1.38675.27735L8 7.86853V21h8V7.86853l1.4453.96352c.0143.00957.0289.01873.0435.02746.1597.09514.3364.14076.5112.1406.3228-.0003.6395-.15664.832-.44541.3064-.45953.1822-1.0804-.2773-1.38675l-6-4ZM10 12c0-.5523.4477-1 1-1h2c.5523 0 1 .4477 1 1s-.4477 1-1 1h-2c-.5523 0-1-.4477-1-1Zm1-4c-.5523 0-1 .44772-1 1s.4477 1 1 1h2c.5523 0 1-.44772 1-1s-.4477-1-1-1h-2Z" clipRule="evenodd"/>
                                    </svg>
                                )}
                            >
                                Hotels
                            </SidebarItem>

                            <SidebarItem 
                                href="#" 
                                     className='text-white hover:text-gray-900 font-bold'
                                icon={() => (
                                    <svg  className="w-6 h-6 transition duration-75 group-hover:text-gray-900 text-gray-300 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M4 4a2 2 0 0 0-2 2v9a1 1 0 0 0 1 1h.535a3.5 3.5 0 1 0 6.93 0h3.07a3.5 3.5 0 1 0 6.93 0H21a1 1 0 0 0 1-1v-4a.999.999 0 0 0-.106-.447l-2-4A1 1 0 0 0 19 6h-5a2 2 0 0 0-2-2H4Zm14.192 11.59.016.02a1.5 1.5 0 1 1-.016-.021Zm-10 0 .016.02a1.5 1.5 0 1 1-.016-.021Zm5.806-5.572v-2.02h4.396l1 2.02h-5.396Z" clipRule="evenodd"/>
                                    </svg>
                                )}
                            >
                                Transfer
                            </SidebarItem>

                            <SidebarItem 
                                href="#" 
                                     className='text-white hover:text-gray-900 font-bold'
                                icon={() => (
                                    <svg className="w-6 h-6 transition duration-75 group-hover:text-gray-900 text-gray-300 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13v-2a1 1 0 0 0-1-1h-.757l-.707-1.707.535-.536a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0l-.536.535L14 4.757V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v.757l-1.707.707-.536-.535a1 1 0 0 0-1.414 0L4.929 6.343a1 1 0 0 0 0 1.414l.536.536L4.757 10H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.757l.707 1.707-.535.536a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l.536-.535 1.707.707V20a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.757l1.707-.708.536.536a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-.535-.536.707-1.707H20a1 1 0 0 0 1-1Z"/>
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                    </svg>
                                )}
                            >
                                Setting
                            </SidebarItem>

                            <SidebarItem 
                                href={route('page.builder')} 
                                     className='text-white hover:text-gray-900 font-bold'
                                icon={() => (
                                    <svg className="w-6 h-6 transition duration-75 group-hover:text-gray-900 text-gray-300 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.35709 16V5.78571c0-.43393.34822-.78571.77777-.78571H18.5793c.4296 0 .7778.35178.7778.78571V16M5.35709 16h-1c-.55229 0-1 .4477-1 1v1c0 .5523.44771 1 1 1H20.3571c.5523 0 1-.4477 1-1v-1c0-.5523-.4477-1-1-1h-1M5.35709 16H19.3571M9.35709 8l2.62501 2.5L9.35709 13m4.00001 0h2"/>
                                    </svg>
                                )}
                            >
                                Page Builder
                            </SidebarItem>

                            <SidebarItem 
                                href={route('pages.index')} 
                                     className='text-white hover:text-gray-900 font-bold'
                                icon={() => (
                                    <svg className="w-6 h-6 transition duration-75 group-hover:text-gray-900 text-gray-300 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 16H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v1M9 12H4m8 8V9h8v11h-8Zm0 0H9m8-4a1 1 0 1 0-2 0 1 1 0 0 0 2 0Z"/>
                                    </svg>
                                )}
                            >
                                Pages Viewer
                            </SidebarItem>

                          <SidebarItem href={route('post_type.create')} className='text-white hover:text-gray-900 font-bold' icon={BiSolidCategory}>Create Post Type</SidebarItem>
{/* 
                   {types.map((type) => (
                       <SidebarItem 
                       key={type.id}
                                href={route('pages.index')} 
                                     className='text-white hover:text-gray-900 font-bold'
                            >
                            {type.name}
                            </SidebarItem>

                              ))} */}

                        </SidebarItemGroup>
                    </SidebarItems>
                </div>
            </Sidebar>
        </AuthenticatedLayout>
    </div>
  )
}
