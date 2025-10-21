import { Head } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { Form } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "@inertiajs/react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

export default function EditTask({ task }) {
    const toast = useToast();

    const { data, setData, put, processing, errors, reset } = useForm({
        title: task.title ?? '',
        description: task.description ?? '',
        start_date: task.start_date ?? '',
        deadline: task.deadline ?? '',
        priority: task.priority ?? '',
        remarks: task.remarks ?? '',
    });

    function updateSubmit(e) {
        e.preventDefault();
        put(route('admin.task.update', task.id), {
            onSuccess: () => {
                setIsUpdateDialogOpen(false);
                toast({
                    title: "Task Updated",
                    description: `${data.title} has been successfully updated.`,
                });
            }
        });
    }
    return (
        <AppLayout>
            <Head title="Edit Task" />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">Update Task</h1>
                        <p className="text-muted-foreground">Manage your task and track performance</p>
                    </div>
                </div>

                <Form>
                    <form onSubmit={updateSubmit} className="space-y-4">

                        {/* Name */}
                        <div>
                            <label className="block font-medium">Task Name</label>
                            <Input
                                placeholder="Enter Task Name"
                                value={data.title}
                                onChange={(e) => setData("title", e.target.value)}
                            />
                            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block font-medium">Task Description</label>
                            <Input
                                placeholder="Enter Task Description"
                                value={data.description}
                                onChange={(e) => setData("description", e.target.value)}
                            />
                            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
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

                            {/* <div>
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
                            </div> */}
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
                                    setIsUpdateDialogOpen(false);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? "Updating..." : "Update Task"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </AppLayout>
    )
}
