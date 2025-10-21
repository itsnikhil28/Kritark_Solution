import { Head, Link } from '@inertiajs/react'
import AppLayout from "@/layouts/app-layout";
import { DataTable } from 'simple-datatables';
import { useEffect } from 'react';
import "simple-datatables/dist/style.css";
import { useRoute } from 'ziggy-js';
import { Eye } from 'lucide-react';

export default function attendance({ attendanceSummary }) {
    const route = useRoute();

    useEffect(() => {
        const tableElement = document.getElementById("attendanceTable");

        if (tableElement && typeof DataTable !== "undefined") {
            const dataTable = new DataTable(tableElement, {
                paging: true,
                perPage: 5,
                perPageSelect: [5, 10, 15, 20, 25],
                sortable: false,
            });

            // cleanup on unmount
            return () => {
                dataTable.destroy();
            };
        }
    }, []);
    return (
        <AppLayout>
            <Head title="Employee Attendance Overview" />

            <div className="w-full mx-auto py-8 px-4"><h1 className="text-2xl font-semibold mb-6">
                📅 Monthly Attendance Summary ({new Date().toLocaleString('default', { month: 'long' })})
            </h1>

                <div className="overflow-x-auto shadow rounded-lg bg-white">
                    <table id="attendanceTable" className="min-w-full text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="py-3 px-4 text-left">👤 Employee Name</th>
                                <th className="py-3 px-4 text-center">📅 Days Worked</th>
                                <th className="py-3 px-4 text-center">⏰ Late Days</th>
                                <th className="py-3 px-4 text-center">🏢 Office</th>
                                <th className="py-3 px-4 text-center">🏠 Home</th>
                                <th className="py-3 px-4 text-center">🚗 Outside</th>
                                <th className="py-3 px-4 text-center">🕒 Avg Hours</th>
                                <th className='py-3 px-4 text-center'>📅 All Attendance</th>
                            </tr>
                        </thead>

                        <tbody>
                            {attendanceSummary.length > 0 ? (
                                attendanceSummary.map((emp, i) => (
                                    <tr key={i} className="border-b hover:bg-gray-50">
                                        <td className="py-2 px-4 font-medium">{emp.name}</td>
                                        <td className="py-2 px-4 text-center text-blue-700 font-semibold">{emp.total_days}</td>
                                        <td
                                            className={`py-2 px-4 text-center font-semibold ${emp.late_days > 2 ? "text-red-600" : "text-green-600"
                                                }`}
                                        >
                                            {emp.late_days}
                                        </td>
                                        <td className="py-2 px-4 text-center">{emp.office_days}</td>
                                        <td className="py-2 px-4 text-center">{emp.home_days}</td>
                                        <td className="py-2 px-4 text-center">{emp.outside_days}</td>
                                        <td className="py-2 px-4 text-center">{emp.avg_hours} hrs</td>
                                        <td className="py-2 px-4 text-center">
                                            <Link href={route('admin.attendance.show', { id: emp.employee_id })}>
                                                <button className="p-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition flex items-center gap-2">
                                                    <Eye className="h-4 w-4" />
                                                    View
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="py-4 text-center text-gray-500">
                                        No attendance records this month.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout >
    )
}
