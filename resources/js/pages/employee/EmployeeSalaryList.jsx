import React, { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import EmpLayout from "@/layouts/emp-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EmployeeSalaryList({ salaries }) {
    const [search, setSearch] = useState("");

    const rupee = (amount) =>
        `₹ ${Number(amount || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;

    const filteredData = salaries.filter(
        (item) =>
            item.employee_name?.toLowerCase().includes(search.toLowerCase()) ||
            item.salary_month?.toLowerCase().includes(search.toLowerCase())
    );

    const paginatedData = filteredData.slice(0, 1000);

    const { auth } = usePage().props;

    const rendercode = (
        <>

            <Head title="Employee Salary" />

            <div className="p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">💰 Employee Salary</h1>

                <Card className="shadow-sm border border-gray-200">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-gray-700">
                            Salary Records
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="flex justify-end items-center mb-4 flex-wrap gap-4">

                            <div className="flex items-center gap-2">
                                <Label htmlFor="search" className="text-sm text-gray-700">
                                    Search:
                                </Label>
                                <Input
                                    id="search"
                                    placeholder="Search employee or month..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-[220px]"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto rounded-md border border-gray-200">
                            <Table>
                                <TableHeader className="bg-gray-100">
                                    <TableRow>
                                        <TableHead>Sl</TableHead>
                                        <TableHead>Employee Name</TableHead>
                                        <TableHead>Salary Month</TableHead>
                                        <TableHead>Total Salary (₹)</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {paginatedData.length > 0 ? (
                                        paginatedData.map((salary, index) => (
                                            <TableRow key={salary.id}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{salary.employee_name}</TableCell>
                                                <TableCell>{salary.salary_month}</TableCell>
                                                <TableCell>{rupee(salary.total_salary)}</TableCell>
                                                <TableCell className="flex gap-2">
                                                    <Link
                                                        href={`/salary/payslip/${salary.id}`}
                                                    >
                                                        <Button
                                                            size="sm"
                                                            variant="warning"
                                                            className="bg-yellow-500 hover:bg-yellow-600 text-white"
                                                        >
                                                            <Eye className="w-4 h-4 mr-1" />
                                                            Payslip
                                                        </Button>
                                                    </Link>

                                                    {/* <Link
                                                        href={`/admin/salary/payslip/${salary.id}/pdf`}
                                                    >
                                                        <Button
                                                            size="sm"
                                                            variant="success"
                                                            className="bg-green-600 hover:bg-green-700 text-white"
                                                        >
                                                            <Download className="w-4 h-4 mr-1" />
                                                            Download
                                                        </Button>
                                                    </Link> */}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan="5"
                                                className="text-center text-gray-500 py-6"
                                            >
                                                No salary records found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        <p className="text-sm text-gray-500 mt-4">
                            Showing {paginatedData.length} of {filteredData.length} entries
                        </p>
                    </CardContent>
                </Card>
            </div>
        </>
    );

    return (
        <>
            {auth.user.employee_code === undefined ? (
                <AppLayout>
                    {rendercode}
                </AppLayout>
            ) : (
                <EmpLayout>
                    {rendercode}
                </EmpLayout>
            )}
        </>
    );
}
