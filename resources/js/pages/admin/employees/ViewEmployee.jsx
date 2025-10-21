import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Calendar1, Edit, Eye, MapPin } from "lucide-react";
import "../../../../../public/admin/view-employee.css"
import { useState } from "react";
import { useRoute } from "ziggy-js";

export default function ViewEmployee({ employee }) {
    const [employeeDetails, setEmployeeDetails] = useState(employee.employee_details[0]);
    const route = useRoute();

    return (
        <AppLayout>
            <Head title="View Employee" />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">View Employee Details</h1>
                        <p className="text-muted-foreground">Manage your Employee and track performance</p>
                    </div>
                    <Link href={route('admin.attendance.show', { id: employee.id })}>
                        <button className="p-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition flex items-center gap-2">
                            <Calendar1 className="h-4 w-4" />
                            View Attendance
                        </button>
                    </Link>
                </div>

                <div className="row p-4 bg-gray-200">
                    <div className="card p-4">
                        <div className="media m-1 ">
                            <div className="align-left p-1">
                                <div className="profile-image">
                                    <img
                                        src={`http://localhost:8000/employee/profile_images/${employeeDetails?.profile_image || ''}`}
                                        className="avatar avatar-xl rounded-circle img-border h-40"
                                        alt="Employee profile image" />
                                </div>
                            </div>
                            <div className="space-y-2 mt-1">
                                <h2 className="text-3xl">{employee.name}</h2>
                                <h3 className="text-2xl"> Department ---
                                    <span className="ml-2">
                                        {employee.department}
                                    </span>
                                </h3>
                                <p className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    {employeeDetails?.address ?? '--'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-start">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        <div className="space-y-6">
                            <section className="panel">
                                <div className="p-6">
                                    <div className="flex items-start justify-between">
                                        <h2 className="tet-1xl font-bold">Employee id</h2>
                                        <div className="text-gray-500 font-medium">{employee.employee_code}</div>
                                    </div>
                                </div>
                                <div className="px-0">
                                    <div className="field-row">
                                        <div className="field-label">Date of birth</div>
                                        <div className="field-value">{employeeDetails?.date_of_birth ?? '--'}</div>
                                    </div>
                                    <div className="field-row">
                                        <div className="field-label">Joining date</div>
                                        <div className="field-value">{employee.joining_date}</div>
                                    </div>
                                    <div className="field-row">
                                        <div className="field-label">Email</div>
                                        <div className="field-value">{employee.email}</div>
                                    </div>
                                    <div className="field-row">
                                        <div className="field-label">Phone no</div>
                                        <div className="field-value">+91 {employee.phone}</div>
                                    </div>
                                    <div className="field-row">
                                        <div className="field-label">Card no</div>
                                        <div className="field-value">{employeeDetails?.card_no ?? '--'}</div>
                                    </div>
                                    <div className="field-row">
                                        <div className="field-label">Passport no</div>
                                        <div className="field-value">{employeeDetails?.passport_no ?? '--'}</div>
                                    </div>
                                    <div className="field-row">
                                        <div className="field-label">Driving license no</div>
                                        <div className="field-value">{employeeDetails?.driving_license_no ?? '--'}</div>
                                    </div>
                                </div>
                            </section>

                            <section className="panel">
                                <div style={{ background: "var(--panel-header)", padding: "1rem 1.25rem" }}>
                                    <h3 className="text-xl font-bold">Personal information</h3>
                                </div>
                                <div className="px-0">
                                    <div className="field-row">
                                        <div className="field-label">Employee type</div>
                                        <div className="field-value">{employee.employment_type}</div>
                                    </div>
                                    <div className="field-row">
                                        <div className="field-label">Duty type</div>
                                        <div className="field-value">{employee.employment_type}</div>
                                    </div>
                                    <div className="field-row">
                                        <div className="field-label">Pay frequency</div>
                                        <div className="field-value">Monthly</div>
                                    </div>
                                    <div className="field-row">
                                        <div className="field-label">Hourly rate</div>
                                        <div className="field-value">--</div>
                                    </div>
                                </div>
                            </section>

                            <section className="panel">
                                <div style={{ background: "var(--panel-header)", padding: "1rem 1.25rem" }}>
                                    <h3 className="text-xl font-bold">Basic info</h3>
                                </div>
                                <div className="px-0">
                                    <div className="field-row">
                                        <div className="field-label">Gender</div>
                                        <div className="field-value">{employeeDetails?.gender ?? '--'}</div>
                                    </div>
                                    <div className="field-row">
                                        <div className="field-label">Marital status</div>
                                        <div className="field-value">{employeeDetails?.marital_status ?? '--'}</div>
                                    </div>
                                    <div className="field-row">
                                        <div className="field-label">No of kids</div>
                                        <div className="field-value">{employeeDetails?.no_of_kids ?? '--'}</div>
                                    </div>
                                    <div className="field-row">
                                        <div className="field-label">Blood group</div>
                                        <div className="field-value">{employeeDetails?.blood_group ?? '--'}</div>
                                    </div>
                                    <div className="field-row">
                                        <div className="field-label">Religion</div>
                                        <div className="field-value">{employeeDetails?.religion ?? '--'}</div>
                                    </div>
                                    <div className="field-row">
                                        <div className="field-label">Ethnic group</div>
                                        <div className="field-value">{employeeDetails?.ethnic_group ?? '--'}</div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className="space-y-6">
                            <section className="panel">
                                <div style={{ background: "var(--panel-header)", padding: "1rem 1.25rem" }}>
                                    <h3 className="text-xl font-bold">Bank info</h3>
                                </div>
                                <div className="px-0">
                                    <div className="field-row">
                                        <div className="field-label">Account no</div>
                                        <div className="field-value">{employeeDetails?.account_no ?? '--'}</div>
                                    </div>
                                    <div className="field-row">
                                        <div className="field-label">IFSC Code</div>
                                        <div className="field-value">{employeeDetails?.ifsc_code ?? '--'}</div>
                                    </div>
                                    <div className="field-row">
                                        <div className="field-label">Bank name</div>
                                        <div className="field-value">{employeeDetails?.bank_name ?? '--'}</div>
                                    </div>
                                    <div className="field-row">
                                        <div className="field-label">Branch name</div>
                                        <div className="field-value">{employeeDetails?.branch_name ?? '--'}</div>
                                    </div>
                                    <div className="field-row">
                                        <div className="field-label">Tax identification no</div>
                                        <div className="field-value">{employeeDetails?.tax_identification_no ?? '--'}</div>
                                    </div>
                                </div>
                            </section>

                            <section className="panel">
                                <div style={{ background: "var(--panel-header)", padding: "1rem 1.25rem" }}>
                                    <h3 className="text-xl font-bold">Bonuses</h3>
                                </div>
                                <div className="p-4 min-h-[64px]"></div>
                            </section>

                            <div className="grid grid-cols-1 gap-6">
                                <section className="panel">
                                    <div style={{ background: "var(--panel-header)", padding: "1rem 1.25rem" }}>
                                        <h3 className="text-xl font-bold">Salary benefits</h3>
                                    </div>
                                    <div className="px-0">
                                        <div className="field-row">
                                            <div className="field-label">Basic</div>
                                            <div className="field-value">--</div>
                                        </div>
                                        <div className="field-row">
                                            <div className="field-label">Transport allowance</div>
                                            <div className="field-value">--</div>
                                        </div>
                                        <div className="field-row">
                                            <div className="field-label">Gross salary</div>
                                            <div className="field-value">--</div>
                                        </div>
                                    </div>
                                </section>

                                <section className="panel">
                                    <div style={{ background: "var(--panel-header)", padding: "1rem 1.25rem" }}>
                                        <h3 className="text-xl font-bold">Deductions</h3>
                                    </div>
                                    <div className="px-0">
                                        <div className="field-row">
                                            <div className="field-label">Pension</div>
                                            <div className="field-value">--</div>
                                        </div>
                                        <div className="field-row">
                                            <div className="field-label">NSSF</div>
                                            <div className="field-value">--</div>
                                        </div>
                                        <div className="field-row">
                                            <div className="field-label">NHIF</div>
                                            <div className="field-value">--</div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <section className="panel">
                                <div style={{ background: "var(--panel-header)", padding: "1rem 1.25rem" }}>
                                    <h3 className="text-xl font-bold">Employee documents</h3>
                                </div>
                                <div className="p-6">
                                    <div className="overflow-auto">
                                        <table className="min-w-full border-collapse">
                                            <thead>
                                                <tr className="text-left">
                                                    <th className="py-3 px-4 font-bold">Sl.</th>
                                                    <th className="py-3 px-4 font-bold">Doc title</th>
                                                    <th className="py-3 px-4 font-bold">File</th>
                                                    <th className="py-3 px-4 font-bold">Expiry date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {employeeDetails?.documents && (
                                                    <tr className="doc-row">
                                                        <td className="py-5 px-4 border-r">1</td>
                                                        <td className="py-5 px-4">Document</td>
                                                        <td className="py-5 px-4 text-center">
                                                            <a href={`http://localhost:8000/employee/documents/${JSON.parse(employeeDetails?.documents)}`} target="_blank" rel="noreferrer">
                                                                📄
                                                            </a>
                                                        </td>
                                                        <td className="py-5 px-4">{new Date(employeeDetails?.created_at).toDateString() ?? '--'}</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div >
        </AppLayout >
    )
}
