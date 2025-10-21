import { Head, Link, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search, UserPlus, TrendingUp, Clock, CheckCircle2, Eye, Edit, Trash2 } from "lucide-react";
import { useRoute } from "ziggy-js";
import { useState } from "react";
import DeleteModal from "../../../components/admin/deleteModal";


function tasks({ tasks, employees }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const route = useRoute();

    const filteredTasks = tasks.filter(
        (task) =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.start_date.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const { data, setData, post, processing, errors, reset } = useForm({
        employee_id: '',
        title: '',
        description: '',
        start_date: '',
        deadline: '',
        priority: '',
        status: '',
        remarks: '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('admin.task.store'), {
            onSuccess: () => {
                setIsDialogOpen(false);
                toast({
                    title: "Task Added",
                    description: `${data.title} has been successfully added to the team.`,
                });
            }
        });
    }

    return (
        <AppLayout>
            <Head title="Admin Dashboard" />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">Task Management</h1>
                        <p className="text-muted-foreground">Manage your task and track performance</p>
                    </div>
                    <Button className="gap-2" onClick={() => setIsDialogOpen(true)}>
                        <Clock className="h-4 w-4" />
                        Assign Task
                    </Button>
                </div>

                {/* Employee Table */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Task List</CardTitle>
                            <div className="relative w-72">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search task..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>S.No</TableHead>
                                    <TableHead>Task Name</TableHead>
                                    <TableHead>Start Date</TableHead>
                                    <TableHead>Deadline</TableHead>
                                    <TableHead>Completion Date</TableHead>
                                    <TableHead>Priority</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Assigned By</TableHead>
                                    <TableHead>Assigned To</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredTasks.map((task, index) => (
                                    <TableRow key={task.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell className="font-medium">{task.title}</TableCell>
                                        <TableCell>{task.start_date}</TableCell>
                                        <TableCell>{task.deadline}</TableCell>
                                        <TableCell>{task.completion_date ?? '--'}</TableCell>
                                        <TableCell>{task.priority}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={task.status === "Completed" ? "default" : "secondary"}
                                                className={
                                                    task.status === "Completed"
                                                        ? "bg-success/10 text-success hover:bg-success/20"
                                                        : ""
                                                }
                                            >
                                                {task.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{task.admin.name}</TableCell>
                                        <TableCell>{task.employee.name}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-2 flex-wrap">
                                                <Link
                                                    href={route('admin.task.show', task.id)}>
                                                    <button className="p-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition">
                                                        <Eye className="h-4 w-4" />
                                                    </button>
                                                </Link>
                                                <Link
                                                    href={route('admin.task.edit', task.id)}>
                                                    <button
                                                        disabled={task.status == "Completed"}
                                                        className="p-2 bg-green-100 text-green-600 rounded-md hover:bg-green-200 transition">
                                                        <Edit className="h-4 w-4" />
                                                    </button>
                                                </Link>
                                                <button
                                                    disabled={task.status == "Completed"}
                                                    onClick={() => { setSelectedId(task.id); setOpenDelete(true); }}
                                                    className="p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </TableCell>
                                        <DeleteModal
                                            open={openDelete}
                                            onOpenChange={setOpenDelete}
                                            routeText="admin.task.destroy"
                                            id={selectedId}
                                        />
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Add Employee Dialog */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto" style={{ scrollbarWidth: "none" }}>
                        <DialogHeader>
                            <DialogTitle>Add New Task</DialogTitle>
                            <DialogDescription>
                                Fill in the details to add a new task to your employee.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={submit} className="space-y-4">

                            {/* Department */}
                            <div>
                                <label className="block font-medium">Employee</label>
                                <Select
                                    value={data.employee_id}
                                    onValueChange={(v) => setData("employee_id", v)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select employee" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {employees && employees.map((emp) => (
                                            <SelectItem key={emp.name} value={emp.id}>{emp.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.employee_id && <p className="text-red-500 text-sm">{errors.employee_id}</p>}
                            </div>

                            {/* Name */}
                            <div>
                                <label className="block font-medium">Task Name</label>
                                <Input
                                    placeholder="Enter task name"
                                    value={data.title}
                                    onChange={(e) => setData("title", e.target.value)}
                                />
                                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block font-medium">Task Description</label>
                                <Textarea
                                    placeholder="Enter task description"
                                    value={data.description}
                                    onChange={(e) => setData("description", e.target.value)}
                                />
                                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Employee Code */}
                                <div>
                                    <label className="block font-medium">Start Date</label>
                                    <Input
                                        type="date"
                                        value={data.start_date}
                                        onChange={(e) => setData("start_date", e.target.value)}
                                    />
                                    {errors.start_date && <p className="text-red-500 text-sm">{errors.start_date}</p>}
                                </div>

                                <div>
                                    <label className="block font-medium">Deadline</label>
                                    <Input
                                        type="date"
                                        value={data.deadline}
                                        onChange={(e) => setData("deadline", e.target.value)}
                                    />
                                    {errors.deadline && <p className="text-red-500 text-sm">{errors.deadline}</p>}
                                </div>
                            </div>

                            {/* Employment Type & Status */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-medium">Priority</label>
                                    <Select
                                        value={data.priority}
                                        onValueChange={(v) => setData("priority", v)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Low">Low</SelectItem>
                                            <SelectItem value="Medium">Medium</SelectItem>
                                            <SelectItem value="High">High</SelectItem>
                                            <SelectItem value="Urgent">Urgent</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.priority && <p className="text-red-500 text-sm">{errors.priority}</p>}
                                </div>

                                <div>
                                    <label className="block font-medium">Status</label>
                                    <Select
                                        value={data.status}
                                        onValueChange={(v) => setData("status", v)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Pending">Pending</SelectItem>
                                            <SelectItem value="In Progress">In Progress</SelectItem>
                                            <SelectItem value="Completed">Completed</SelectItem>
                                            <SelectItem value="Delayed">Delayed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block font-medium">Remarks</label>
                                <Textarea
                                    placeholder="Enter remarks"
                                    value={data.remarks}
                                    onChange={(e) => setData("remarks", e.target.value)}
                                />
                                {errors.remarks && <p className="text-red-500 text-sm">{errors.remarks}</p>}
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        reset();
                                        setIsDialogOpen(false);
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? "Adding..." : "Add Task"}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout >
    )
}

export default tasks