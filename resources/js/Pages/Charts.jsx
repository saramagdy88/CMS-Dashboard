import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ExampleChart from '@/Components/Chartcol';
import Chartwo from '@/Components/Chartwo';
import Sidebar from '@/Components/SidebarComp';

export default function Charts({ auth }) {
  return (
    <>
      <Head title="Charts" />

      <Sidebar/>
      <div className="max-w-6xl mx-auto py-10">
        <h2 className="text-2xl font-bold mb-6">Charts Dashboard</h2>

        <div className="bg-white rounded shadow p-4 mb-6">
          <h3 className="text-lg font-semibold mb-2 text-teal-700">Column Chart</h3>
          <div className="h-[300px]">
            <ExampleChart />
          </div>
        </div>

        <div className="bg-white rounded shadow p-4">
          <h3 className="text-lg font-semibold mb-2 text-indigo-700">Composed Chart</h3>
          <div className="h-[400px]">
            <Chartwo />
          </div>
        </div>
      </div>
    </>
  );
}
