import { Head, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Edit, PlusCircle, Search, Trash2, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import DeleteModal from "../../components/admin/deleteModal";

export default function department({ departments }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

    const toast = useToast();

    const filteredDepartments = departments.filter(
        (department) => department.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const { data, setData, post, processing, errors, reset, put } = useForm({
        name: '',
        code: '',
        status: '',
    })

    function submit(e) {
        e.preventDefault();
        post(route('admin.department.store'), {
            onSuccess: () => {
                setIsDialogOpen(false);
                toast({
                    title: "Department Added",
                    description: `${data.name} has been successfully added.`,
                });
            }
        });
    }

    function updateSubmit(e) {
        e.preventDefault();
        put(route('admin.department.update', selectedId), {
            onSuccess: () => {
                setIsUpdateDialogOpen(false);
                toast({
                    title: "Department Updated",
                    description: `${data.name} has been successfully updated.`,
                });
            }
        });
    }

    return (
        <AppLayout>
            <Head title="Department" />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">Department List</h1>
                        <p className="text-muted-foreground">Manage your department </p>
                    </div>
                    <Button className="gap-2" onClick={() => setIsDialogOpen(true)}>
                        <PlusCircle className="h-4 w-4" />
                        Add Department
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Department List</CardTitle>
                            <div className="relative w-72">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search departments..."
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
                                    <TableHead>Department Name</TableHead>
                                    <TableHead>Department Code</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredDepartments.map((department, index) => (
                                    <TableRow key={department.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell className="font-medium">{department.name}</TableCell>
                                        <TableCell>{department.code}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={department.status === "Active" ? "default" : "secondary"}
                                                className={
                                                    department.status === "Active"
                                                        ? "bg-success/10 text-success hover:bg-success/20"
                                                        : ""
                                                }
                                            >
                                                {department.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Edit onClick={() => {
                                                    setData({
                                                        name: department.name,
                                                        code: department.code,
                                                        status: department.status,
                                                    });
                                                    setSelectedId(department.id);
                                                    setIsUpdateDialogOpen(true);
                                                }} className="h-5 w-5 bg-green-500 hover:bg-green-600 text-white cursor-pointer" />

                                                <Trash2 onClick={() => { setSelectedId(department.id); setOpenDelete(true); }} className="h-5 w-5 bg-red-500 hover:bg-red-600 text-white cursor-pointer" />
                                            </div>
                                        </TableCell>
                                        <DeleteModal
                                            open={openDelete}
                                            onOpenChange={setOpenDelete}
                                            routeText="admin.department.destroy"
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
                            <DialogTitle>Add New Department</DialogTitle>
                            <DialogDescription>
                                Fill in the details to add a new department.
                            </DialogDescription>
                        </DialogHeader>
                        <Form>
                            <form onSubmit={submit} className="space-y-4">

                                {/* Name */}
                                <div>
                                    <label className="block font-medium">Department Name</label>
                                    <Input
                                        placeholder="Enter Department Name"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                    />
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                                </div>

                                {/* Code */}
                                <div>
                                    <label className="block font-medium">Department Code</label>
                                    <Input
                                        placeholder="Enter Department Code"
                                        value={data.code}
                                        onChange={(e) => setData("code", e.target.value)}
                                    />
                                    {errors.code && <p className="text-red-500 text-sm">{errors.code}</p>}
                                </div>

                                {/* Employment Type & Status */}
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
                                            <SelectItem value="Active">Active</SelectItem>
                                            <SelectItem value="Inactive">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
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
                                        {processing ? "Adding..." : "Add Department"}
                                    </Button>
                                </div>
                            </form>
                        </Form>

                    </DialogContent>
                </Dialog>

                {/* update dialog */}
                <Dialog open={isUpdateDialogOpen} onOpenChange={(open) => {
                    setIsUpdateDialogOpen(open);
                    if (!open) reset();
                }}>
                    <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto" style={{ scrollbarWidth: "none" }}>
                        <DialogHeader>
                            <DialogTitle>Update Department</DialogTitle>
                            <DialogDescription>
                                Update the details of the department.
                            </DialogDescription>
                        </DialogHeader>
                        <Form>
                            <form onSubmit={updateSubmit} className="space-y-4">

                                {/* Name */}
                                <div>
                                    <label className="block font-medium">Department Name</label>
                                    <Input
                                        placeholder="Enter Department Name"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                    />
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                                </div>

                                {/* Code */}
                                <div>
                                    <label className="block font-medium">Department Code</label>
                                    <Input
                                        placeholder="Enter Department Code"
                                        value={data.code}
                                        onChange={(e) => setData("code", e.target.value)}
                                    />
                                    {errors.code && <p className="text-red-500 text-sm">{errors.code}</p>}
                                </div>

                                {/* Employment Type & Status */}
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
                                            <SelectItem value="Active">Active</SelectItem>
                                            <SelectItem value="Inactive">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
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
                                        {processing ? "Updating..." : "Update Department"}
                                    </Button>
                                </div>
                            </form>
                        </Form>

                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    )
}
