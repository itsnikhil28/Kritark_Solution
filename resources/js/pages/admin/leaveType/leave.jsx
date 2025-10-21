import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import DeleteModal from "../../../components/admin/deleteModal";
import LeaveTab from "../../../components/admin/LeaveTab";
import { Plus } from "lucide-react";

export default function LeaveTypeIndex({ leaveTypes }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const { data, setData, post, put, processing, reset } = useForm({
        name: '',
        days: '',
        description: '',
    });

    const filteredTypes = leaveTypes.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const openAddModal = () => {
        reset();
        setSelectedId(null);
        setIsDialogOpen(true);
    };

    const openEditModal = (type) => {
        setData({
            name: type.name,
            days: type.days,
            description: type.description || '',
        });
        setSelectedId(type.id);
        setIsUpdateDialogOpen(true);
    };

    const submitCreate = (e) => {
        e.preventDefault();
        post(route("admin.leave.type.store"), { onSuccess: () => setIsDialogOpen(false) });
    };

    const submitUpdate = (e) => {
        e.preventDefault();
        put(route("admin.leave.type.update", selectedId), { onSuccess: () => setIsUpdateDialogOpen(false) });
    };

    return (
        <AppLayout>
            <Head title="Leave Types" />

            <LeaveTab />

            <div className="py-8 px-4">

                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold">📝 Leave Types</h1>
                    <Button onClick={openAddModal}><Plus className="h-4 w-4" /> Add Leave Type</Button>
                </div>

                {/* Search */}
                <Input placeholder="Search leave type..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="mb-4" />

                {/* Table */}
                <div className="overflow-x-auto bg-white shadow rounded-lg">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="py-2 px-4 text-left">Name</th>
                                <th className="py-2 px-4 text-left">Days</th>
                                <th className="py-2 px-4 text-left">Description</th>
                                <th className="py-2 px-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTypes.map(t => (
                                <tr key={t.id} className="border-b hover:bg-gray-50">
                                    <td className="py-2 px-4">{t.name}</td>
                                    <td className="py-2 px-4">{t.days}</td>
                                    <td className="py-2 px-4">{t.description || '-'}</td>
                                    <td className="py-2 px-4 text-center space-x-2">
                                        <Button size="sm" onClick={() => openEditModal(t)}>✏️ Edit</Button>
                                        <Button size="sm" variant="destructive" onClick={() => { setSelectedId(t.id); setOpenDelete(true); }}>🗑️ Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Add Modal */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Leave Type</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={submitCreate} className="space-y-4 mt-2">
                            <Input placeholder="Leave Type Name" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                            <Input type="number" placeholder="Days" value={data.days} onChange={(e) => setData('days', e.target.value)} required />
                            <Input placeholder="Description (optional)" value={data.description} onChange={(e) => setData('description', e.target.value)} />
                            <DialogFooter>
                                <Button type="submit" disabled={processing}>Save</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Edit Modal */}
                <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Leave Type</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={submitUpdate} className="space-y-4 mt-2">
                            <div className="sapce-y-2">
                                <label className="block font-medium">Leave Type Name</label>
                                <Input placeholder="Leave Type Name" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                                <label className="block font-medium">Days</label>
                                <Input type="number" placeholder="Days" value={data.days} onChange={(e) => setData('days', e.target.value)} required />
                                <label className="block font-medium">Description (optional)</label>
                                <Input placeholder="Description (optional)" value={data.description} onChange={(e) => setData('description', e.target.value)} />
                            </div>
                            <DialogFooter>
                                <Button type="submit" disabled={processing}>Update</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Delete Modal */}
                <DeleteModal open={openDelete} onOpenChange={setOpenDelete} routeText="admin.leave.type.destroy" id={selectedId} />
            </div>
        </AppLayout>
    );
}
