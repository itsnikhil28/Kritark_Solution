import { Head, useForm, usePage } from "@inertiajs/react";
import EmpLayout from "@/layouts/emp-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

export default function Attendance({ attendanceToday, recentAttendances }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        location_type: "",
    });

    const handleCheckIn = (e) => {
        e.preventDefault();
        post(route("employee.attendance.checkin"), {
            onSuccess: () => reset(),
        });
    };

    const handleCheckOut = (e) => {
        e.preventDefault();
        post(route("employee.attendance.checkout"), {
            onSuccess: () => reset(),
        });
    };

    const renderCard = () => {
        // Case 1: Not checked in yet
        if (!attendanceToday) {
            return (
                <Card className="text-center border-2 border-yellow-200 shadow-md">
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            👋 Good Morning!
                        </CardTitle>
                        <p className="text-sm text-gray-500 mt-1">
                            Ready to start your day? Mark your attendance below.
                        </p>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleCheckIn} className="flex flex-col gap-4">
                            <Select
                                value={data.location_type}
                                onValueChange={(value) => setData("location_type", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Where are you working from today?" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Office">🏢 Office</SelectItem>
                                    <SelectItem value="Home">🏠 Home</SelectItem>
                                    <SelectItem value="Outside">🚗 Outside</SelectItem>
                                </SelectContent>
                            </Select>

                            {errors.location_type && (
                                <p className="text-red-500 text-sm">{errors.location_type}</p>
                            )}

                            <Button
                                type="submit"
                                className="w-full text-lg py-6"
                                disabled={processing || !data.location_type}
                            >
                                {processing ? "Marking Attendance..." : "✅ Check In"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            );
        }

        // Case 2: Checked in but not checked out
        if (attendanceToday?.check_in_time && !attendanceToday?.check_out_time) {
            return (
                <Card className="text-center border-2 border-green-200 shadow-md">
                    <CardHeader>
                        <CardTitle className="text-2xl">⏳ Working Day in Progress!</CardTitle>
                        <p className="text-sm text-gray-500 mt-1">
                            Checked in at <b>{attendanceToday.check_in_time}</b> from{" "}
                            {attendanceToday.location_type}.
                        </p>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleCheckOut}>
                            <Button
                                type="submit"
                                className="w-full text-lg py-6 bg-red-500 hover:bg-red-600 text-white"
                                disabled={processing}
                            >
                                {processing ? "Updating..." : "🚪 Check Out"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            );
        }

        // Case 3: Checked out (day completed)
        if (attendanceToday?.check_out_time) {
            return (
                <Card className="text-center border-2 border-blue-200 shadow-md">
                    <CardHeader>
                        <CardTitle className="text-2xl">🌙 All Done for Today!</CardTitle>
                        <p className="text-sm text-gray-500 mt-1">
                            You worked{" "}
                            <b>{attendanceToday.total_hours ?? "N/A"}</b> hours today. <br />
                            See you tomorrow 👋
                        </p>
                    </CardHeader>
                </Card>
            );
        }
    };

    return (
        <EmpLayout>
            <Head title="Attendance" />
            <div className="max-w-3xl mx-auto py-10 px-4">
                <h1 className="text-3xl font-semibold mb-8 text-center">
                    🗓️ Daily Attendance Tracker
                </h1>

                {renderCard()}

                {/* Recent Attendance */}
                <div className="mt-10">
                    <h2 className="text-lg font-semibold mb-3">📅 Recent Attendance</h2>
                    <Card>
                        <CardHeader>
                            <CardTitle>🗓️ Recent Attendance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <table className="w-full text-sm">
                                <thead className="border-b text-gray-700">
                                    <tr>
                                        <th className="text-left py-2">Date</th>
                                        <th className="text-left py-2">Status</th>
                                        <th className="text-left py-2">Location</th>
                                        <th className="text-left py-2">Check In Time</th>
                                        <th className="text-left py-2">Check Out Time</th>
                                        <th className="text-left py-2">Total Hours</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentAttendances.length ? (
                                        recentAttendances.map((a, i) => (
                                            <tr key={i} className="border-b hover:bg-gray-50">
                                                <td className="py-2">{new Date(a.date).toLocaleDateString()}</td>
                                                <td className="py-2">
                                                    {a.status === "Present" ? "✅ Present" : a.status === "Leave" ? "🌴 Leave" : "❌ Absent"}
                                                </td>
                                                <td className="py-2">{a.location_type}</td>
                                                <td className="py-2">{a.check_in_time ?? "N/A"}</td>
                                                <td className="py-2">{a.check_out_time ?? "N/A"}</td>
                                                <td className="py-2">{a.total_hours ?? "N/A"}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center py-4 text-gray-500">
                                                No attendance records yet.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </EmpLayout>
    )
}
