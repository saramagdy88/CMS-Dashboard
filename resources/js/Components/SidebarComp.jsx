import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Sidebar, SidebarItems, SidebarItemGroup, SidebarItem, SidebarCollapse } from 'flowbite-react';
import { BiSolidCategory } from "react-icons/bi";
import { TiEdit } from "react-icons/ti";
import { useEffect, useState } from 'react';
import { PiAirplaneTiltBold } from "react-icons/pi";
import { MdOutlinePostAdd } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { ImFilesEmpty } from "react-icons/im";
import { RiEditBoxFill } from "react-icons/ri";
import { LuFileText } from "react-icons/lu";
import { TbCategory } from "react-icons/tb";
import { BsTags } from "react-icons/bs";
import { PiHighlighter } from "react-icons/pi";
export default function SidebarComp() {

  const [types, setTypes] = useState([]);

        useEffect(() => {
            fetch('/post_type/') 
            .then(res => res.json())
            .then(data => setTypes(data))
            .catch(err => console.error('Error fetching post types:', err));
        }, []);

    return (
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
                    <div className='group text-center bg-white py-2 rounded mb-4'>
                        <a href="https://flowbite.com/" className="flex items-center ps-2.5">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/6/62/CMS_Law_Tax_Future_2021_New_Logo.png" className="h-10 mx-auto" alt="Flowbite Logo" />
                        </a>
                    </div>

                    <SidebarItems>
                        <SidebarItemGroup>
                            <SidebarItem className='group text-white hover:text-gray-900 font-bold' href="#" icon={() => (
                 <svg
                className="w-6 h-6 transition duration-75 group-hover:text-gray-900 text-white dark:text-gray-400 dark:group-hover:text-white"
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
                                className='group text-white hover:text-gray-900 font-bold'
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



                             <SidebarCollapse 
                                label="Users" 
                                className='group text-white hover:text-gray-900 font-bold'
                                 icon={() => (
                                    <svg className="w-6 h-6 transition duration-75 group-hover:text-gray-900 text-white dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                        <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                                    </svg>
                                )}
                            >
                                <SidebarItem 
                                href={route('user.create')} 
                                className=' group text-white hover:text-gray-900 font-bold'
                                icon={() => (
                                    <svg className="w-6 h-6 transition duration-75 group-hover:text-gray-900 text-white dark:text-gray-400 dark:group-hover:text-white"aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                        <path fillRule="evenodd" d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z" clipRule="evenodd"/>
                                    </svg>
                                )}
                            >
                                Create user
                            </SidebarItem>

                                <SidebarItem href={route('category.index')} className='text-white hover:text-gray-900 '
                                    icon={() => (
                                    <svg className="w-6 h-6 transition duration-75 group-hover:text-gray-900 text-white dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                        <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                                    </svg>
                                )}
                                >All Users</SidebarItem>

                            </SidebarCollapse>

                      <SidebarItem href={route('category.index')} className='group text-white hover:text-gray-900 font-bold'
                                   icon={() => <BiSolidCategoryAlt className="text-white text-2xl group-hover:text-gray-800" />}
                                >All Categories</SidebarItem>

                                  <SidebarItem href={route('tag.index')} className='group text-white hover:text-gray-900 font-bold'
                                   icon={() => <BsTags className="text-white text-2xl group-hover:text-gray-800" />}
                                >All Tags</SidebarItem>
                              

                                  <SidebarItem href={route('highlight.index')} className='group text-white hover:text-gray-900 font-bold'
                                   icon={() => <PiHighlighter className="text-white text-2xl group-hover:text-gray-800" />}
                                >All Highlight</SidebarItem>

                          <SidebarItem href={route('post_type.create')} className='group text-white hover:text-gray-900 font-bold'
                           icon={() => <MdOutlinePostAdd className="text-white font-bold text-2xl group-hover:text-gray-800" />}
                         >
                            
                            Create Post Type</SidebarItem>

                    {types.map((type) => (
                     <SidebarCollapse 
                              key={type.id}
                               label={type.name.charAt(0).toUpperCase() + type.name.slice(1)}

                                className='group text-white hover:text-gray-900 font-bold'
                                   icon={() => <LuFileText className="text-white text-2xl group-hover:text-gray-800" />}
                             
                            >
                               <SidebarItem href={route('post.create',type.slug)}className='text-white hover:text-gray-900 '
                                   icon={() => <TiEdit className="text-white text-2xl group-hover:text-gray-800" />}
                                >Create {type.name}</SidebarItem>

                                <SidebarItem href={route('post.index',type.slug )} className='text-white hover:text-gray-900 '
                                   icon={() => <ImFilesEmpty className="text-white text-2xl group-hover:text-gray-800" />}
                                >View All {type.name}</SidebarItem>
 
                                   <SidebarItem href={route('category.create') + `?type=${type.slug}`} className='text-white font-bold text-sm hover:text-gray-900 ' 
                                      icon={() => <TbCategory className="text-white text-2xl group-hover:text-gray-800" />}
                                >
                                     Add Category</SidebarItem> 

                                 <SidebarItem href={route('tag.create') + `?type=${type.slug}`} className='text-white font-bold text-sm hover:text-gray-900 ' 
                                      icon={() => <BsTags className="text-white text-2xl group-hover:text-gray-800" />}
                                >
                                     Add Tag</SidebarItem> 
                                  <SidebarItem href={route('highlight.create') + `?type=${type.slug}`} className='text-white font-bold text-sm hover:text-gray-900 ' 
                                      icon={() => <PiHighlighter className="text-white text-2xl group-hover:text-gray-800" />}
                                >
                                     Add Highlight</SidebarItem> 

                            </SidebarCollapse>


                    ))}



                         

                            <SidebarItem 
                                href="/charts" 
                                     className='group text-white hover:text-gray-900 font-bold'
                                icon={() => (
                                    <svg     className="w-6 h-6 transition duration-75 group-hover:text-gray-900 text-white dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v15a1 1 0 0 0 1 1h15M8 16l2.5-5.5 3 3L17.273 7 20 9.667"/>
                                    </svg>
                                )}
                            >
                                Charts
                            </SidebarItem>

    
                             <SidebarItem 
                                href={route('page.builder')} 
                                     className='group text-white hover:text-gray-900 font-bold'
                                icon={() => (
                                    <svg className="w-6 h-6 transition duration-75 group-hover:text-gray-900 text-white dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.35709 16V5.78571c0-.43393.34822-.78571.77777-.78571H18.5793c.4296 0 .7778.35178.7778.78571V16M5.35709 16h-1c-.55229 0-1 .4477-1 1v1c0 .5523.44771 1 1 1H20.3571c.5523 0 1-.4477 1-1v-1c0-.5523-.4477-1-1-1h-1M5.35709 16H19.3571M9.35709 8l2.62501 2.5L9.35709 13m4.00001 0h2"/>
                                    </svg>
                                )}
                            >
                                Page Builder
                            </SidebarItem>

                            <SidebarItem 
                                href={route('pages.index')} 
                                     className='group text-white hover:text-gray-900 font-bold'
                                icon={() => (
                                    <svg className="w-6 h-6 transition duration-75 group-hover:text-gray-900 text-white dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 16H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v1M9 12H4m8 8V9h8v11h-8Zm0 0H9m8-4a1 1 0 1 0-2 0 1 1 0 0 0 2 0Z"/>
                                    </svg>
                                )}
                            >
                                Pages Viewer
                            </SidebarItem>

                        

                

                     <SidebarItem 
                                href="#" 
                                     className='group text-white hover:text-gray-900 font-bold'
                                icon={() => (
                                    <svg className="w-6 h-6 transition duration-75 group-hover:text-gray-900 text-white dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13v-2a1 1 0 0 0-1-1h-.757l-.707-1.707.535-.536a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0l-.536.535L14 4.757V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v.757l-1.707.707-.536-.535a1 1 0 0 0-1.414 0L4.929 6.343a1 1 0 0 0 0 1.414l.536.536L4.757 10H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.757l.707 1.707-.535.536a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l.536-.535 1.707.707V20a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.757l1.707-.708.536.536a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-.535-.536.707-1.707H20a1 1 0 0 0 1-1Z"/>
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                    </svg>
                                )}
                            >
                                Setting
                      </SidebarItem>

                        </SidebarItemGroup>
                    </SidebarItems>
                </div>
            </Sidebar>
        </AuthenticatedLayout>

    );
}
