import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import SalaryTab from "../../../components/admin/SalaryTab";

export default function EmployeeSalaryChart({ generation }) {
    // Helper to format amount in INR ₹
    const rupee = (amount) =>
        `₹ ${Number(amount || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;

    const handlePrint = () => {
        window.print();
    };

    return (
        <AppLayout>
            <Head title={`Employee Salary Chart - ${generation.salary_month}`} />

            <SalaryTab />

            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            🧾 Employee Salary Chart
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Employee salary chart for{" "}
                            <span className="font-semibold text-gray-900">
                                {generation.salary_month}
                            </span>
                        </p>
                    </div>

                    <Button onClick={handlePrint} className="flex items-center gap-2">
                        <Printer className="w-4 h-4" />
                        Print Chart
                    </Button>
                </div>

                <Card className="shadow-sm border border-gray-200">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-gray-700">
                            Salary Details
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="rounded-md border border-gray-200">
                            <Table>
                                <TableHeader className="bg-gray-100">
                                    <TableRow>
                                        <TableHead>Sl</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Basic Salary (₹)</TableHead>
                                        <TableHead>Total Benefit (₹)</TableHead>
                                        <TableHead>Transport Allowance (₹)</TableHead>
                                        <TableHead>Gross Salary (₹)</TableHead>
                                        <TableHead>State Income Tax (₹)</TableHead>
                                        <TableHead>Social Security NPF (₹)</TableHead>
                                        <TableHead>Employer Contribution (₹)</TableHead>
                                        <TableHead>Loan Deduction (₹)</TableHead>
                                        <TableHead>Salary Advance (₹)</TableHead>
                                        <TableHead>Total Deductions (₹)</TableHead>
                                        <TableHead>Net Salary (₹)</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {generation.employee_salaries &&
                                        generation.employee_salaries.length > 0 ? (
                                        generation.employee_salaries.map((salary, index) => (
                                            <TableRow key={salary.id}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{salary.employee?.name}</TableCell>
                                                <TableCell>{rupee(salary.basic_salary)}</TableCell>
                                                <TableCell>{rupee(salary.total_benefit)}</TableCell>
                                                <TableCell>{rupee(salary.transport_allowance)}</TableCell>
                                                <TableCell>{rupee(salary.gross_salary)}</TableCell>
                                                <TableCell>{rupee(salary.state_income_tax)}</TableCell>
                                                <TableCell>{rupee(salary.social_security_npf)}</TableCell>
                                                <TableCell>{rupee(salary.employer_contribution)}</TableCell>
                                                <TableCell>{rupee(salary.loan_deduction)}</TableCell>
                                                <TableCell>{rupee(salary.salary_advance)}</TableCell>
                                                <TableCell>{rupee(salary.total_deductions)}</TableCell>
                                                <TableCell className="font-semibold text-green-600">
                                                    {rupee(salary.net_salary)}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan="13" className="text-center text-gray-500 py-6">
                                                No salary data available for this month.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
