import { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@inertiajs/react";
import LeaveTab from "../../../components/admin/LeaveTab";
import { toast } from "sonner";

export default function LeaveApproval({ leaves }) {
    const [selectedLeave, setSelectedLeave] = useState(null);
    const [approveModal, setApproveModal] = useState(false);
    const [rejectModal, setRejectModal] = useState(false);

    const { data, setData, post, processing, reset } = useForm({
        approved_start_date: "",
        approved_end_date: "",
        manager_comments: "",
    });

    const openApproveModal = (leave) => {
        setSelectedLeave(leave);
        setApproveModal(true);
        reset();
    };

    const openRejectModal = (leave) => {
        setSelectedLeave(leave);
        setRejectModal(true);
        reset();
    };

    const handleApprove = (e) => {
        e.preventDefault();
        post(route("admin.leave.approve", selectedLeave.id), {
            onSuccess: () => {
                toast({ title: "✅ Leave Approved Successfully" });
                setApproveModal(false);
            },
        });
    };

    const handleReject = (e) => {
        e.preventDefault();
        post(route("admin.leave.reject", selectedLeave.id), {
            onSuccess: () => {
                toast({ title: "❌ Leave Rejected" });
                setRejectModal(false);
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Leave Approval" />

            <LeaveTab />

            <div className="p-4">
                <h1 className="text-2xl font-semibold mb-4">📝 Leave Approval</h1>

                <div className="overflow-x-auto border rounded-lg w-full">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Employee</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Apply Date</TableHead>
                                <TableHead>Start Date</TableHead>
                                <TableHead>End Date</TableHead>
                                <TableHead>Days</TableHead>
                                <TableHead>Approved Date</TableHead>
                                <TableHead>Approved Start Date</TableHead>
                                <TableHead>Approved End Date</TableHead>
                                <TableHead>Approved Days</TableHead>
                                <TableHead>Manager Comments</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="bg-white">
                            {leaves.map((leave) => (
                                <TableRow key={leave.id}>
                                    <TableCell>{leave.employee?.name}</TableCell>
                                    <TableCell>{leave.leave_type?.name}</TableCell>
                                    <TableCell>{leave.apply_date}</TableCell>
                                    <TableCell>{leave.leave_start_date}</TableCell>
                                    <TableCell>{leave.leave_end_date}</TableCell>
                                    <TableCell>{leave.requested_days}</TableCell>
                                    <TableCell>{leave.approved_date ?? '--'}</TableCell>
                                    <TableCell>{leave.approved_start_date ?? '--'}</TableCell>
                                    <TableCell>{leave.approved_end_date ?? '--'}</TableCell>
                                    <TableCell>{leave.approved_days ?? '--'}</TableCell>
                                    <TableCell>{leave.manager_comments ?? '--'}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-2 py-1 rounded-md text-xs ${leave.status === "Approved"
                                                    ? "bg-green-100 text-green-700"
                                                    : leave.status === "Rejected"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {leave.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {leave.status === "Pending" && (
                                            <div className="flex gap-2">
                                                <Button size="sm" onClick={() => openApproveModal(leave)}>Approve</Button>
                                                <Button size="sm" variant="destructive" onClick={() => openRejectModal(leave)}>Reject</Button>
                                            </div>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* ✅ Approve Modal */}
            <Dialog open={approveModal} onOpenChange={setApproveModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Approve Leave</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleApprove} className="space-y-4">
                        <div>
                            <label className="text-sm">Approved Start Date</label>
                            <Input type="date" value={data.approved_start_date} onChange={(e) => setData("approved_start_date", e.target.value)} required />
                        </div>
                        <div>
                            <label className="text-sm">Approved End Date</label>
                            <Input type="date" value={data.approved_end_date} onChange={(e) => setData("approved_end_date", e.target.value)} required />
                        </div>
                        <div>
                            <label className="text-sm">Manager Comments</label>
                            <Textarea value={data.manager_comments} onChange={(e) => setData("manager_comments", e.target.value)} required />
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={processing}>Approve Leave</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* ❌ Reject Modal */}
            <Dialog open={rejectModal} onOpenChange={setRejectModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Reject Leave</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleReject} className="space-y-4">
                        <div>
                            <label className="text-sm">Manager Comments</label>
                            <Textarea value={data.manager_comments} onChange={(e) => setData("manager_comments", e.target.value)} required />
                        </div>
                        <DialogFooter>
                            <Button variant="destructive" type="submit" disabled={processing}>Reject</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
