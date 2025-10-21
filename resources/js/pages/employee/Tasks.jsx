import { Head, useForm } from "@inertiajs/react";
import EmpLayout from "@/layouts/emp-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Pencil, Search } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Tasks({ tasks }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const filteredTasks = tasks.filter(
        (task) =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.start_date.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const { data, setData, post, processing, errors, reset } = useForm({
        status: '',
        remarks: '',
        time_spent_minutes: '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('employee.task.update', { id: selectedId }), {
            onSuccess: () => {
                setIsDialogOpen(false);
                toast({
                    title: "Task Updated"
                });
            }
        });
    }
    return (
        <EmpLayout>
            <Head title="Tasks" />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">Task Management</h1>
                        <p className="text-muted-foreground">Manage your task and track performance</p>
                    </div>
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
                                    <TableHead>Change Status</TableHead>
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
                                        <TableCell>
                                            <Button
                                                disabled={task.status === "Completed"}
                                                onClick={() => { setSelectedId(task.id); setIsDialogOpen(true); }}
                                            >
                                                <Pencil className="h-4 w-4" />
                                                Update
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto" style={{ scrollbarWidth: "none" }}>
                        <DialogHeader>
                            <DialogTitle>Update Task</DialogTitle>
                            <DialogDescription>
                                Fill in the details
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={submit} className="space-y-4">

                            {/* Department */}
                            <div>
                                <label className="block font-medium">Select Status</label>
                                <Select
                                    value={data.status}
                                    onValueChange={(v) => setData("status", v)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="In Progress">In Progress</SelectItem>
                                        <SelectItem value="Completed">Completed</SelectItem>
                                        <SelectItem value="Delayed">Delayed</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
                            </div>

                            <div>
                                <label className="block font-medium">Time Spent</label>
                                <Input
                                    type="number"
                                    placeholder="Enter time spent"
                                    value={data.time_spent_minutes}
                                    onChange={(e) => setData("time_spent_minutes", e.target.value)}
                                />
                                {errors.time_spent_minutes && <p className="text-red-500 text-sm">{errors.time_spent_minutes}</p>}
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
                                    {processing ? "Updating..." : "Update Task"}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </EmpLayout>
    )
}
