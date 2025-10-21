import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import EmpLayout from "@/layouts/emp-layout";

export default function Payslip({ salary, employee, month, totalWorkingHours }) {
    const printRef = useRef(null);
    const { props } = usePage();
    const employeeCode = props.auth.user.employee_code;

    const formatRupee = (amount) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 2,
        }).format(amount || 0);

    const handleDownload = () => {
        window.print(); // Simple PDF download via browser print
    };

    const renderCode = (
        <>

            <Head title="Employee Payslip" />
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-10 border">
                <div ref={printRef}>
                    <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
                        🧾 Employee Payslip
                    </h1>

                    {/* Employee Info Section */}
                    <div className="grid grid-cols-2 gap-6 text-sm mb-8 border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="space-y-2">
                            <p><span className="font-semibold text-gray-700">👤 Employee Name:</span> {employee?.name}</p>
                            <p><span className="font-semibold text-gray-700">📅 Month:</span> {month}</p>
                            <p><span className="font-semibold text-gray-700">🏢 Department:</span> {employee?.department || "N/A"}</p>
                            <p><span className="font-semibold text-gray-700">📞 Contact:</span> {employee?.phone}</p>
                            <p><span className="font-semibold text-gray-700">📧 Email:</span> {employee?.email}</p>
                        </div>

                        <div className="space-y-2">
                            <p><span className="font-semibold text-gray-700">🗓️ Period:</span> {month}-01 to {month}-30</p>
                            <p><span className="font-semibold text-gray-700">📆 Joining Date:</span> {employee?.joining_date || "N/A"}</p>
                            <p><span className="font-semibold text-gray-700">⏱️ Total Working Hours:</span> {totalWorkingHours || 0}</p>
                            <p><span className="font-semibold text-gray-700">🆔 Employee Code:</span> {employee?.employee_code}</p>
                        </div>
                    </div>

                    {/* Salary Breakdown Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full border border-gray-300 text-sm">
                            <thead className="bg-gray-100 text-gray-700">
                                <tr>
                                    <th className="border p-2 text-left">Description</th>
                                    <th className="border p-2 text-right">Amount (₹)</th>
                                    <th className="border p-2 text-right">Rate (₹)</th>
                                    <th className="border p-2 text-right">#Value (₹)</th>
                                    <th className="border p-2 text-right">Deduction (₹)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border p-2">Basic Salary</td>
                                    <td className="border p-2 text-right">{formatRupee(salary.basic_salary)}</td>
                                    <td className="border p-2 text-right">0.00</td>
                                    <td className="border p-2 text-right">0.00</td>
                                    <td className="border p-2 text-right"></td>
                                </tr>

                                <tr>
                                    <td className="border p-2">Transport Allowance</td>
                                    <td className="border p-2 text-right">{formatRupee(salary.transport_allowance)}</td>
                                    <td className="border p-2 text-right">0.00</td>
                                    <td className="border p-2 text-right">0.00</td>
                                    <td className="border p-2 text-right"></td>
                                </tr>

                                <tr className="bg-gray-50 font-semibold">
                                    <td className="border p-2">Total Benefit</td>
                                    <td className="border p-2 text-right"></td>
                                    <td className="border p-2 text-right"></td>
                                    <td className="border p-2 text-right">{formatRupee(salary.total_benefit)}</td>
                                    <td className="border p-2 text-right"></td>
                                </tr>

                                <tr>
                                    <td className="border p-2">Gross Salary</td>
                                    <td className="border p-2 text-right"></td>
                                    <td className="border p-2 text-right"></td>
                                    <td className="border p-2 text-right">{formatRupee(salary.gross_salary)}</td>
                                    <td className="border p-2 text-right"></td>
                                </tr>

                                <tr>
                                    <td className="border p-2">State Income Tax</td>
                                    <td className="border p-2 text-right"></td>
                                    <td className="border p-2 text-right"></td>
                                    <td className="border p-2 text-right"></td>
                                    <td className="border p-2 text-right">{formatRupee(salary.state_income_tax)}</td>
                                </tr>

                                <tr>
                                    <td className="border p-2">Social Security NPF</td>
                                    <td className="border p-2 text-right"></td>
                                    <td className="border p-2 text-right">0%</td>
                                    <td className="border p-2 text-right"></td>
                                    <td className="border p-2 text-right">{formatRupee(salary.social_security_npf)}</td>
                                </tr>

                                <tr>
                                    <td className="border p-2">Loan Deduction</td>
                                    <td className="border p-2 text-right"></td>
                                    <td className="border p-2 text-right"></td>
                                    <td className="border p-2 text-right"></td>
                                    <td className="border p-2 text-right">{formatRupee(salary.loan_deduction)}</td>
                                </tr>

                                <tr>
                                    <td className="border p-2">Salary Advance</td>
                                    <td className="border p-2 text-right"></td>
                                    <td className="border p-2 text-right"></td>
                                    <td className="border p-2 text-right"></td>
                                    <td className="border p-2 text-right">{formatRupee(salary.salary_advance)}</td>
                                </tr>

                                <tr className="bg-gray-50 font-semibold">
                                    <td className="border p-2">Total Deductions</td>
                                    <td colSpan={4} className="border p-2 text-right">
                                        {formatRupee(salary.total_deductions)}
                                    </td>
                                </tr>

                                <tr className="bg-green-50 font-bold">
                                    <td className="border p-2">Net Salary</td>
                                    <td colSpan={4} className="border p-2 text-right text-green-700">
                                        {formatRupee(salary.net_salary)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Signatures */}
                    <div className="grid grid-cols-3 gap-4 text-center mt-10 text-sm text-gray-600">
                        <div>
                            <hr className="border-gray-400 mb-1" />
                            <p>Prepared by: Admin</p>
                        </div>
                        <div>
                            <hr className="border-gray-400 mb-1" />
                            <p>Checked by</p>
                        </div>
                        <div>
                            <hr className="border-gray-400 mb-1" />
                            <p>Authorized by</p>
                        </div>
                    </div>
                </div>

                {/* Download Button */}
                <div className="text-center mt-8">
                    <Button
                        onClick={handleDownload}
                        className="bg-green-600 text-white hover:bg-green-700"
                    >
                        ⬇️ Download PDF
                    </Button>
                </div>
            </div>
        </>
    );

    return (
        <>
            {employeeCode === undefined ? (
                <AppLayout>
                    {renderCode}
                </AppLayout>
            ) : (
                <EmpLayout>
                    {renderCode}
                </EmpLayout>
            )}
        </>
    );
}
