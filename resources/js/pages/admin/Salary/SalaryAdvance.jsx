import { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DeleteModal from "@/components/admin/deleteModal";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import SalaryTab from "../../../components/admin/SalaryTab";

export default function SalaryAdvance({ advances, employees }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [editData, setEditData] = useState(null);

    const { data, setData, post, put, processing, reset, errors } = useForm({
        employee_id: "",
        amount: "",
        release_amount: "",
        salary_month: "",
        status: "Active",
    });

    const handleSubmit = () => {
        if (editData) {
            put(route("admin.salary.advance.update", editData.id), {
                onSuccess: () => {
                    reset();
                    setEditData(null);
                    setIsDialogOpen(false);
                },
            });
        } else {
            post(route("admin.salary.advance.store"), {
                onSuccess: () => {
                    reset();
                    setIsDialogOpen(false);
                },
            });
        }
    };

    const handleEdit = (advance) => {
        setEditData(advance);
        setData({
            employee_id: advance.employee_id,
            amount: advance.amount,
            release_amount: advance.release_amount,
            salary_month: advance.salary_month,
            status: advance.status,
        });
        setIsDialogOpen(true);
    };

    const openAddModal = () => {
        reset();
        setEditData(null);
        setIsDialogOpen(true);
    };

    return (
        <AppLayout>
            <Head title="Salary Advance" />

            <SalaryTab />

            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold">💰 Salary Advance</h1>
                    <Button onClick={openAddModal}>
                        <PlusCircle className="w-4 h-4 mr-2" /> Add Salary Advance
                    </Button>
                </div>

                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Sl</TableHead>
                                <TableHead>Employee Name</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Release Amount</TableHead>
                                <TableHead>Salary Month</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {advances.map((advance, index) => (
                                <TableRow key={advance.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{advance.employee.name}</TableCell>
                                    <TableCell>₹{advance.amount}</TableCell>
                                    <TableCell>₹{advance.release_amount}</TableCell>
                                    <TableCell>{advance.salary_month}</TableCell>
                                    <TableCell>{advance.status}</TableCell>
                                    <TableCell className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={() => handleEdit(advance)}>
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => {
                                                setSelectedId(advance.id);
                                                setOpenDelete(true);
                                            }}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Delete Modal */}
                <DeleteModal
                    open={openDelete}
                    onOpenChange={setOpenDelete}
                    routeText="admin.salary.advance.destroy"
                    id={selectedId}
                />

                {/* Add / Edit Modal */}
                {isDialogOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md">
                            <h2 className="text-lg font-semibold mb-4">
                                {editData ? "Edit Salary Advance" : "Add Salary Advance"}
                            </h2>
                            <div className="space-y-3">
                                <div>
                                    <label className="text-sm font-medium mb-1 block">Employee</label>
                                    <Select
                                        value={data.employee_id}
                                        onValueChange={(val) => setData("employee_id", val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Employee" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {employees.map((emp) => (
                                                <SelectItem key={emp.id} value={emp.id.toString()}>
                                                    {emp.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.employee_id && <p className="text-sm text-red-500">{errors.employee_id}</p>}
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block">Amount</label>
                                    <Input
                                        type="number"
                                        value={data.amount}
                                        onChange={(e) => setData("amount", e.target.value)}
                                        required
                                    />
                                    {errors.amount && <p className="text-sm text-red-500">{errors.amount}</p>}
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block">Release Amount</label>
                                    <Input
                                        type="number"
                                        value={data.release_amount}
                                        onChange={(e) => setData("release_amount", e.target.value)}
                                    />
                                    {errors.release_amount && <p className="text-sm text-red-500">{errors.release_amount}</p>}
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block">Salary Month</label>
                                    <Input
                                        type="month"
                                        value={data.salary_month}
                                        onChange={(e) => setData("salary_month", e.target.value)}
                                        required
                                    />
                                    {errors.salary_month && <p className="text-sm text-red-500">{errors.salary_month}</p>}
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={handleSubmit} disabled={processing}>
                                    {editData ? "Update" : "Add"}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
