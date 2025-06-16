import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ExampleChart from '@/Components/Chartcol';

import ChartTwo from '@/Components/Chartwo';

import SidebarComp from '@/Components/SidebarComp';
export default function Dashboard() {
    return (
      <>
               <SidebarComp />
                <div className="mx-auto max-w-2xl py-5 border-gray-600">
                    <div className=" bg-white shadow-lg sm:rounded-lg">
                     <h3 className='font-bold text-teal-800'>Website View</h3>
                      <ExampleChart />
                    </div>
                </div>
            <div className="h-[400px] mx-auto max-w-7xl bg-white shadow-lg p-4 rounded mt-4">
               <h3 className='font-bold text-teal-800'>Daily Report</h3>

               <ChartTwo />
            </div>


       </>
    );
}
