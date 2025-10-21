import React, { useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { ArrowLeft } from "lucide-react";
import { useRoute } from "ziggy-js";
import "simple-datatables/dist/style.css";

export default function Show({ employee, attendances }) {
    const route = useRoute();

    useEffect(() => {
        import("simple-datatables").then(({ DataTable }) => {
            const table = document.querySelector("#employeeAttendanceTable");
            if (table) new DataTable(table);
        });
    }, []);

    return (
        <AppLayout>
            <Head title={`${employee.name} — Attendance`} />

            <div className="py-8 px-4">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        👤 {employee.name}'s Attendance Records
                    </h1>
                    <Link
                        href={route("admin.attendance")}
                        className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-2 rounded-lg hover:bg-blue-100 transition"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Link>
                </div>

                <div className="bg-white shadow rounded-lg p-4 mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                        <div>
                            <span className="text-gray-500">Employee ID:</span>
                            <p className="font-medium">{employee.id}</p>
                        </div>
                        <div>
                            <span className="text-gray-500">Name:</span>
                            <p className="font-medium">{employee.name}</p>
                        </div>
                        <div>
                            <span className="text-gray-500">Email:</span>
                            <p className="font-medium">{employee.email}</p>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto bg-white shadow rounded-lg">
                    <table id="employeeAttendanceTable" className="min-w-full text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="py-3 px-4 text-left">📅 Date</th>
                                <th className="py-3 px-4 text-center">⏰ Check-In</th>
                                <th className="py-3 px-4 text-center">🏁 Check-Out</th>
                                <th className="py-3 px-4 text-center">🕒 Total Hours</th>
                                <th className="py-3 px-4 text-center">⚠️ Late</th>
                                <th className="py-3 px-4 text-center">📍 Location</th>
                                <th className="py-3 px-4 text-center">✅ Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendances.length > 0 ? (
                                attendances.map((a, i) => (
                                    <tr key={i} className="border-b hover:bg-gray-50">
                                        <td className="py-2 px-4">{a.date}</td>
                                        <td className="py-2 px-4 text-center">{a.check_in}</td>
                                        <td className="py-2 px-4 text-center">{a.check_out}</td>
                                        <td className="py-2 px-4 text-center text-blue-600 font-semibold">
                                            {a.total_hours} hrs
                                        </td>
                                        <td className="py-2 px-4 text-center">
                                            {a.is_late ? (
                                                <span className="text-red-600 font-semibold">Yes</span>
                                            ) : (
                                                <span className="text-green-600">No</span>
                                            )}
                                        </td>
                                        <td className="py-2 px-4 text-center">{a.location_type}</td>
                                        <td className="py-2 px-4 text-center">
                                            {a.status === "Present" ? (
                                                <span className="text-green-600 font-semibold">Present</span>
                                            ) : (
                                                <span className="text-red-600 font-semibold">Absent</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="py-4 text-center text-gray-500">
                                        No attendance records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
