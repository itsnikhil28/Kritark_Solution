import React, { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import DeleteModal from "../../../components/admin/deleteModal";
import { PlusCircle } from "lucide-react";
import LeaveTab from "../../../components/admin/LeaveTab";

export default function HolidayIndex({ holidays }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        holiday_name: '',
        from_date: '',
        to_date: '',
        type: '',
    });

    const filteredHolidays = holidays.filter(h => h.holiday_name.toLowerCase().includes(searchQuery.toLowerCase()));

    const openAddModal = () => {
        reset();
        setSelectedId(null);
        setIsDialogOpen(true);
    };


    const openEditModal = (holiday) => {
        setData({
            holiday_name: holiday.holiday_name,
            from_date: holiday.from_date,
            to_date: holiday.to_date || '',
            type: holiday.type,
        });
        setSelectedId(holiday.id);
        setIsUpdateDialogOpen(true);
    }

    const submitCreate = (e) => {
        e.preventDefault();
        post(route("admin.holiday.store"), { onSuccess: () => { reset(); setIsDialogOpen(false); } });
    }

    const submitUpdate = (e) => {
        e.preventDefault();
        put(route("admin.holiday.update", selectedId), { onSuccess: () => { reset(); setIsUpdateDialogOpen(false); } });
    }

    return (
        <AppLayout>
            <Head title="Holidays" />
            <LeaveTab />

            <div className="py-8 px-4">

                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold">🎉 Holidays</h1>
                    <Button onClick={() => openAddModal()}>
                        <PlusCircle className="h-4 w-4" />
                        Add Holiday</Button>
                </div>

                <Input
                    placeholder="Search holiday..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mb-4"
                />

                <div className="overflow-x-auto bg-white shadow rounded-lg">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="py-2 px-4 text-left">Holiday Name</th>
                                <th className="py-2 px-4 text-left">From Date</th>
                                <th className="py-2 px-4 text-left">To Date</th>
                                <th className="py-2 px-4 text-center">Total Days</th>
                                <th className="py-2 px-4 text-center">Type</th>
                                <th className="py-2 px-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredHolidays.map(h => (
                                <tr key={h.id} className="border-b hover:bg-gray-50">
                                    <td className="py-2 px-4">{h.holiday_name}</td>
                                    <td className="py-2 px-4">{h.from_date}</td>
                                    <td className="py-2 px-4">{h.to_date || '-'}</td>
                                    <td className="py-2 px-4 text-center">{h.total_days}</td>
                                    <td className="py-2 px-4 text-center">{h.type}</td>
                                    <td className="py-2 px-4 text-center space-x-2">
                                        <Button size="sm" onClick={() => openEditModal(h)}>✏️ Edit</Button>
                                        <Button size="sm" variant="destructive" onClick={() => { setSelectedId(h.id); setOpenDelete(true); }}>🗑️ Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Holiday Modal */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Holiday</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitCreate} className="space-y-4 mt-2">
                        <div>
                            <label className="block font-medium">Holiday Name</label>
                            <Input placeholder="Holiday Name" value={data.holiday_name} onChange={(e) => setData('holiday_name', e.target.value)} required />
                            <label className="block font-medium">From Date</label>
                            <Input type="date" value={data.from_date} onChange={(e) => setData('from_date', e.target.value)} required />
                            <label className="block font-medium">To Date</label>
                            <Input type="date" value={data.to_date} onChange={(e) => setData('to_date', e.target.value)} />
                            <label className="block font-medium">Type</label>
                            <select value={data.type} onChange={(e) => setData('type', e.target.value)} className="border rounded p-2 w-full">
                                <option value="">Select Type</option>
                                <option value="Public">Public</option>
                                <option value="Weekly">Weekly</option>
                            </select>
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={processing}>Save</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Update Holiday Modal */}
            <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Holiday</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitUpdate} className="space-y-4 mt-2">
                        <Input placeholder="Holiday Name" value={data.holiday_name} onChange={(e) => setData('holiday_name', e.target.value)} required />
                        <Input type="date" value={data.from_date} onChange={(e) => setData('from_date', e.target.value)} required />
                        <Input type="date" value={data.to_date} onChange={(e) => setData('to_date', e.target.value)} />
                        <select value={data.type} onChange={(e) => setData('type', e.target.value)} className="border rounded p-2 w-full">
                            <option value="Public">Public</option>
                            <option value="Weekly">Weekly</option>
                        </select>
                        <DialogFooter>
                            <Button type="submit" disabled={processing}>Update</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Modal */}
            <DeleteModal open={openDelete} onOpenChange={setOpenDelete} routeText="admin.holiday.destroy" id={selectedId} />
        </AppLayout>
    );
}
