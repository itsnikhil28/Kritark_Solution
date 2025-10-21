import React, { useRef } from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import SalaryTab from "../../../components/admin/SalaryTab";

export default function SalaryView({ generation, payrollSummary }) {
    const payrollRef = useRef();
    const employeeRef = useRef();

    const handlePrint = (ref) => {
        const printContent = ref.current.innerHTML;
        const WinPrint = window.open("", "", "width=900,height=650");
        WinPrint.document.write(`<html><head><title>Print</title></head><body>${printContent}</body></html>`);
        WinPrint.document.close();
        WinPrint.focus();
        WinPrint.print();
        WinPrint.close();
    };

    return (
        <AppLayout>
            <Head title={`Salary View ${generation.salary_month}`} />

            <SalaryTab />

            <div className="p-6 space-y-6">
                <h1 className="text-2xl font-semibold">💰 Salary View - {generation.salary_month}</h1>

                {/* Action buttons */}
                <div className="flex gap-4">
                    <Button onClick={() => handlePrint(payrollRef)}>Print Payroll Posting Sheet</Button>
                </div>

                {/* Payroll Posting Sheet */}
                <Card ref={payrollRef} className="mt-4">
                    <CardHeader>
                        <CardTitle>🧾 Payroll Posting Sheet - {generation.salary_month}</CardTitle>
                    </CardHeader>
                    <CardContent className="overflow-x-auto">
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Debit</TableCell>
                                    <TableCell>Credit</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Gross Salary</TableCell>
                                    <TableCell>₹ {payrollSummary.gross}</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Net Salary</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>₹ {payrollSummary.net}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Loans</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>₹ {payrollSummary.loan}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Salary Advance</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>₹ {payrollSummary.salary_advance}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>State Income Tax</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>₹ {payrollSummary.state_tax}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Employee NPF Contribution</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>₹ {payrollSummary.npf}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Employer Contribution</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>₹ {payrollSummary.employer_contribution}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>IICF Contribution</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>₹ {payrollSummary.iicf}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
