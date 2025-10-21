import { Head, useForm, Link } from "@inertiajs/react";
import EmpLayout from '@/layouts/emp-layout'
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { PlusCircle, Trash2, Pencil } from "lucide-react";
import DeleteModal from "@/components/admin/deleteModal";
import { useState } from "react";
import { toast } from "sonner";

export default function LeaveApplications({ leaves, leaveTypes }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [editingLeave, setEditingLeave] = useState(null);

    const { data, setData, post, put, processing, reset } = useForm({
        leave_type_id: "",
        leave_start_date: "",
        leave_end_date: "",
        reason: "",
        hard_copy: null,
    });

    const openAddModal = () => {
        reset();
        setEditingLeave(null);
        setIsDialogOpen(true);
    };

    const openEditModal = (leave) => {
        setEditingLeave(leave);
        setData({
            leave_type_id: leave.leave_type_id,
            leave_start_date: leave.leave_start_date,
            leave_end_date: leave.leave_end_date,
            reason: leave.reason,
            hard_copy: null,
        });
        setIsDialogOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingLeave) {
            put(route("employee.leaves.update", editingLeave.id), {
                onSuccess: () => {
                    toast({ title: "Leave Updated" });
                    setIsDialogOpen(false);
                },
            });
        } else {
            post(route("employee.leaves.store"), {
                onSuccess: () => {
                    toast({ title: "Leave Applied" });
                    setIsDialogOpen(false);
                },
            });
        }
    };

    const handleDelete = (id) => {
        setSelectedId(id);
        setOpenDelete(true);
    };

    const statusColor = {
        Pending: "bg-yellow-100 text-yellow-800",
        Approved: "bg-green-100 text-green-800",
        Rejected: "bg-red-100 text-red-800",
    };

    return (
        <EmpLayout>
            <Head title="Leave Applications" />

            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold">📝 Leave Applications</h1>
                    <Button onClick={openAddModal}>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Apply Leave
                    </Button>
                </div>

                <div className="bg-white rounded-lg shadow">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Sl</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Start</TableHead>
                                <TableHead>End</TableHead>
                                <TableHead>Days</TableHead>
                                <TableHead>Reason</TableHead>
                                <TableHead>Approved Date</TableHead>
                                <TableHead>Approved Start</TableHead>
                                <TableHead>Approved End</TableHead>
                                <TableHead>Approved Days</TableHead>
                                <TableHead>Manager Comments</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leaves.map((leave, i) => (
                                <TableRow key={leave.id}>
                                    <TableCell>{i + 1}</TableCell>
                                    <TableCell>{leave.leave_type.name}</TableCell>
                                    <TableCell>{leave.leave_start_date}</TableCell>
                                    <TableCell>{leave.leave_end_date}</TableCell>
                                    <TableCell>{leave.requested_days}</TableCell>
                                    <TableCell>{leave.reason}</TableCell>
                                    <TableCell>{leave.approved_date ?? '--'}</TableCell>
                                    <TableCell>{leave.approved_start_date ?? '--'}</TableCell>
                                    <TableCell>{leave.approved_end_date ?? '--'}</TableCell>
                                    <TableCell>{leave.approved_days ?? '--'}</TableCell>
                                    <TableCell>{leave.manager_comments ?? '--'}</TableCell>
                                    <TableCell>
                                        <Badge className={statusColor[leave.status]}>{leave.status}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                disabled={leave.status === "Approved"}
                                                onClick={() => openEditModal(leave)}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                disabled={leave.status === "Approved"}
                                                onClick={() => handleDelete(leave.id)}
                                            >
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Add / Edit Modal */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingLeave ? "Edit Leave" : "Apply Leave"}</DialogTitle>
                        </DialogHeader>

                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div>
                                <Label>Leave Type</Label>
                                <Select
                                    value={data.leave_type_id}
                                    onValueChange={(v) => setData("leave_type_id", v)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {leaveTypes.map((lt) => (
                                            <SelectItem key={lt.id} value={lt.id.toString()}>
                                                {lt.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <Label>Start Date</Label>
                                    <Input type="date" value={data.leave_start_date} onChange={(e) => setData("leave_start_date", e.target.value)} />
                                </div>
                                <div>
                                    <Label>End Date</Label>
                                    <Input type="date" value={data.leave_end_date} onChange={(e) => setData("leave_end_date", e.target.value)} />
                                </div>
                            </div>

                            <div>
                                <Label>Reason</Label>
                                <Input type="text" value={data.reason} onChange={(e) => setData("reason", e.target.value)} />
                            </div>

                            <div>
                                <Label>Upload Hard Copy</Label>
                                <Input type="file" onChange={(e) => setData("hard_copy", e.target.files[0])} />
                            </div>

                            <DialogFooter>
                                <Button type="submit" disabled={processing}>
                                    {editingLeave ? "Update Leave" : "Submit Leave"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Delete Modal */}
                <DeleteModal
                    open={openDelete}
                    onOpenChange={setOpenDelete}
                    routeText="employee.leave.destroy"
                    id={selectedId}
                />
            </div>
        </EmpLayout>
    );
}
