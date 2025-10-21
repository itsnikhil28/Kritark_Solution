import { Head } from "@inertiajs/react";
import EmpLayout from "@/layouts/emp-layout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Sun, Coffee } from "lucide-react";

export default function HolidayList({ holidays }) {
    return (
        <EmpLayout>
            <Head title="Holidays" />

            <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <CalendarDays className="w-8 h-8 text-blue-600" />
                        <h1 className="text-2xl font-semibold">🎉 Company Holidays</h1>
                    </div>
                    <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-medium">
                        {new Date().getFullYear()} Holiday Calendar
                    </div>
                </div>

                {/* Summary Card */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-green-50 p-4 rounded-lg flex items-center gap-3">
                        <Sun className="w-6 h-6 text-green-600" />
                        <div>
                            <p className="text-sm text-gray-600">Total Holidays</p>
                            <p className="text-lg font-semibold text-green-700">{holidays.length}</p>
                        </div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg flex items-center gap-3">
                        <Coffee className="w-6 h-6 text-yellow-600" />
                        <div>
                            <p className="text-sm text-gray-600">Next Upcoming</p>
                            <p className="text-lg font-semibold text-yellow-700">
                                {holidays.find((h) => new Date(h.from_date) >= new Date())
                                    ? holidays.find((h) => new Date(h.from_date) >= new Date()).holiday_name
                                    : "No Upcoming Holiday"}
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg flex items-center gap-3">
                        <CalendarDays className="w-6 h-6 text-blue-600" />
                        <div>
                            <p className="text-sm text-gray-600">Current Month</p>
                            <p className="text-lg font-semibold text-blue-700">
                                {holidays.filter(
                                    (h) => new Date(h.from_date).getMonth() === new Date().getMonth()
                                ).length}{" "}
                                holidays
                            </p>
                        </div>
                    </div>
                </div>

                {/* Holiday Table */}
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Sl</TableHead>
                                <TableHead>Holiday Name</TableHead>
                                <TableHead>From Date</TableHead>
                                <TableHead>To Date</TableHead>
                                <TableHead>Total Days</TableHead>
                                <TableHead>Type</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {holidays.length > 0 ? (
                                holidays.map((holiday, index) => (
                                    <TableRow key={holiday.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell className="font-medium">{holiday.holiday_name}</TableCell>
                                        <TableCell>{holiday.from_date}</TableCell>
                                        <TableCell>{holiday.to_date}</TableCell>
                                        <TableCell>{holiday.total_days}</TableCell>
                                        <TableCell>
                                            {holiday.total_days > 1 ? (
                                                <Badge className="bg-purple-100 text-purple-700">Long Break</Badge>
                                            ) : (
                                                <Badge className="bg-green-100 text-green-700">Single Day</Badge>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan="6" className="text-center py-6 text-gray-500">
                                        No holidays found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Footer note */}
                <div className="text-sm text-gray-500 mt-4 text-center">
                    🌸 Please plan your leaves and work accordingly. Enjoy your holidays responsibly!
                </div>
            </div>
        </EmpLayout>
    );
}
