import { Head } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import "../../../../../public/admin/view-employee.css"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function ViewTask({ task, taskUpdates }) {
    return (
        <AppLayout>
            <Head title={`Task - ${task.title}`} />
            <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">View Task Details</h1>
                        <p className="text-muted-foreground">View Task and track performance</p>
                    </div>
                </div>

                <div className="flex items-start">
                    <div className="space-y-6 w-full">
                        <section className="bg-white dark:bg-gray-900 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-start justify-between">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Task Details</h2>
                                <span
                                    className={`px-3 py-1 text-sm rounded-full font-medium ${task.status === "Completed"
                                        ? "bg-green-100 text-green-700"
                                        : task.status === "In Progress"
                                            ? "bg-blue-100 text-blue-700"
                                            : task.status === "Delayed"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-gray-100 text-gray-700"
                                        }`}
                                >
                                    {task.status}
                                </span>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Title</p>
                                        <p className="font-medium text-gray-900 dark:text-gray-100">{task.title}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">Priority</p>
                                        <p
                                            className={`font-medium ${task.priority === "High"
                                                ? "text-red-600"
                                                : task.priority === "Urgent"
                                                    ? "text-red-800"
                                                    : task.priority === "Medium"
                                                        ? "text-yellow-600"
                                                        : "text-green-600"
                                                }`}
                                        >
                                            {task.priority}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">Start Date</p>
                                        <p className="font-medium">{task.start_date || "—"}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">Deadline</p>
                                        <p className="font-medium">{task.deadline || "—"}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">Completion Date</p>
                                        <p className="font-medium">{task.completion_date || "—"}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">Progress</p>
                                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full"
                                                style={{ width: `${task.progress_percentage}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-xs mt-1 text-gray-500">{task.progress_percentage}% completed</p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">Time Spent</p>
                                        <p className="font-medium">{task.time_spent_minutes} minutes</p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">Remarks</p>
                                        <p className="font-medium">{task.remarks || "No remarks"}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Description</p>
                                        <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">
                                            {task.description || "No description provided"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">Assigned To</p>
                                        <p className="font-medium">{task.employee.name}</p>
                                    </div>
                                </div>

                            </div>
                        </section>
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Task Updates</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Updated By</TableHead>
                                    <TableHead>Progress Percentage</TableHead>
                                    <TableHead>Time Logged Minutes</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Remark</TableHead>
                                    <TableHead>Updated At</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {taskUpdates.map((task) => (
                                    <TableRow key={task.id}>
                                        <TableCell className="font-medium">{task.employee.name}</TableCell>
                                        <TableCell>{task.progress_percentage}</TableCell>
                                        <TableCell>{task.time_logged_minutes}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="secondary"
                                                className={`
                                                        px-3 py-1 text-sm font-medium rounded-full
                                                        ${task.status === "Completed"
                                                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                                                        : task.status === "In Progress"
                                                            ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                                                            : task.status === "Delayed"
                                                                ? "bg-red-100 text-red-700 hover:bg-red-200"
                                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                    }
                                                `}
                                            >
                                                {task.status}
                                            </Badge>
                                        </TableCell>

                                        <TableCell>{task.remark}</TableCell>
                                        <TableCell>{new Date(task.updated_at).toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout >
    )
}

export default ViewTask