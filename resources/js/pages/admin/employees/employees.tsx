
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
    Form,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search, UserPlus, TrendingUp, Clock, CheckCircle2, Eye, Edit, Trash2, RotateCcw } from "lucide-react";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import AppLayout from "@/layouts/app-layout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useToast } from "@/hooks/use-toast";
import { useRoute } from 'ziggy-js';
import DeleteModal from "../../../components/admin/deleteModal";

const productivityData = [
    { week: "Week 1", efficiency: 78 },
    { week: "Week 2", efficiency: 82 },
    { week: "Week 3", efficiency: 85 },
    { week: "Week 4", efficiency: 88 },
];

const performanceData = [
    { metric: "Efficiency", score: 88 },
    { metric: "Deadlines Met", score: 92 },
    { metric: "Code Quality", score: 86 },
    { metric: "Collaboration", score: 90 },
];

export default function Employees({ employees, departments, avgProductivity, totalHours, activeProjects, completionRate }: any) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const { toast } = useToast();

    const route = useRoute();

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        employee_code: '',
        department: '',
        employment_type: '',
        status: '',
    })

    function submit(e: any) {
        e.preventDefault();
        post(route('admin.employee.store'), {
            onSuccess: () => {
                setIsDialogOpen(false);
                toast({
                    title: "Employee Added",
                    description: `${data.name} has been successfully added to the team.`,
                });
            }
        });
    }

    const filteredEmployees = employees.filter(
        (emp: any) =>
            emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            emp.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
            emp.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
            emp.employee_code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AppLayout>
            <Head title="Admin Dashboard" />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">Employee Management</h1>
                        <p className="text-muted-foreground">Manage your team and track performance</p>
                    </div>
                    <Button className="gap-2" onClick={() => setIsDialogOpen(true)}>
                        <UserPlus className="h-4 w-4" />
                        Add Employee
                    </Button>
                </div>

                {/* Summary Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-xl bg-primary/10">
                                    <TrendingUp className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Avg Productivity</p>
                                    <p className="text-2xl font-bold">{avgProductivity}%</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-xl bg-success/10">
                                    <Clock className="h-5 w-5 text-success" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Hours (Month)</p>
                                    <p className="text-2xl font-bold">{totalHours}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-xl bg-warning/10">
                                    <CheckCircle2 className="h-5 w-5 text-warning" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Active Projects</p>
                                    <p className="text-2xl font-bold">{activeProjects}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-xl bg-chart-4/10">
                                    <TrendingUp className="h-5 w-5 text-chart-4" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Completion Rate</p>
                                    <p className="text-2xl font-bold">{completionRate}%</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts */}
                {/* <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Team Productivity Trend</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={productivityData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                    <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                                    <YAxis stroke="hsl(var(--muted-foreground))" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "hsl(var(--card))",
                                            border: "1px solid hsl(var(--border))",
                                            borderRadius: "var(--radius)",
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="efficiency"
                                        stroke="hsl(var(--chart-2))"
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Performance Metrics</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={performanceData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                    <XAxis dataKey="metric" stroke="hsl(var(--muted-foreground))" />
                                    <YAxis stroke="hsl(var(--muted-foreground))" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "hsl(var(--card))",
                                            border: "1px solid hsl(var(--border))",
                                            borderRadius: "var(--radius)",
                                        }}
                                    />
                                    <Bar dataKey="score" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div> */}

                {/* Employee Table */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Employee Directory</CardTitle>
                            <div className="relative w-72">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search employees..."
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
                                    <TableHead>Name</TableHead>
                                    <TableHead>Department</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Employee Code</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Tasks</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredEmployees.map((employee: any) => (
                                    <TableRow key={employee.id}>
                                        <TableCell className="font-medium">{employee.name}</TableCell>
                                        <TableCell>{employee.department}</TableCell>
                                        <TableCell>{employee.phone}</TableCell>
                                        <TableCell>{employee.employee_code}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={employee.status === "Active" ? "default" : "secondary"}
                                                className={
                                                    employee.status === "Active"
                                                        ? "bg-success/10 text-success hover:bg-success/20"
                                                        : ""
                                                }
                                            >
                                                {employee.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{employee.tasks?.length || 0}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-2 flex-wrap">
                                                <Link href={route('admin.employee.show', employee.id)}>
                                                    <button className="p-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition">
                                                        <Eye className="h-4 w-4" />
                                                    </button>
                                                </Link>
                                                <button
                                                    onClick={() => { setSelectedId(employee.id); setOpenDelete(true); }}
                                                    className="p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </TableCell>
                                        <DeleteModal
                                            open={openDelete}
                                            onOpenChange={setOpenDelete}
                                            routeText="admin.employee.destroy"
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
                            <DialogTitle>Add New Employee</DialogTitle>
                            <DialogDescription>
                                Fill in the details to add a new employee to your team.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={submit} className="space-y-4">

                            {/* Name */}
                            <div>
                                <label className="block font-medium">Full Name</label>
                                <Input
                                    placeholder="Enter employee name"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block font-medium">Email</label>
                                <Input
                                    placeholder="Enter employee email"
                                    value={data.email}
                                    onChange={(e) => setData("email", e.target.value)}
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block font-medium">Phone</label>
                                <Input
                                    type="number"
                                    placeholder="Enter employee phone"
                                    value={data.phone}
                                    onChange={(e) => setData("phone", e.target.value)}
                                />
                                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block font-medium">Password</label>
                                <Input
                                    type="password"
                                    placeholder="Enter password"
                                    value={data.password}
                                    onChange={(e) => setData("password", e.target.value)}
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Employee Code */}
                                <div>
                                    <label className="block font-medium">Employee Code</label>
                                    <Input
                                        placeholder="Enter employee code"
                                        value={data.employee_code}
                                        onChange={(e) => setData("employee_code", e.target.value)}
                                    />
                                    {errors.employee_code && <p className="text-red-500 text-sm">{errors.employee_code}</p>}
                                </div>

                                {/* Department */}
                                <div>
                                    <label className="block font-medium">Department</label>
                                    <Select
                                        value={data.department}
                                        onValueChange={(v) => setData("department", v)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select department" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {departments && departments.map((dep: any) => (
                                                <SelectItem key={dep.id} value={dep.name}>{dep.name}</SelectItem>
                                            ))}
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.department && <p className="text-red-500 text-sm">{errors.department}</p>}
                                </div>
                            </div>

                            {/* Employment Type & Status */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-medium">Employment Type</label>
                                    <Select
                                        value={data.employment_type}
                                        onValueChange={(v) => setData("employment_type", v)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Full-Time">Full-Time</SelectItem>
                                            <SelectItem value="Contract">Contract</SelectItem>
                                            <SelectItem value="Intern">Intern</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.employment_type && <p className="text-red-500 text-sm">{errors.employment_type}</p>}
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
                                            <SelectItem value="Active">Active</SelectItem>
                                            <SelectItem value="Inactive">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
                                </div>
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
                                    {processing ? "Adding..." : "Add Employee"}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout >
    );
}