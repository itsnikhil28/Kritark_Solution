import { Link } from "@inertiajs/react";

export default function SalaryTab() {
    return (
        <div className="mb-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
                <Link
                    href={route("admin.salary.advance.index")}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${window.location.pathname.includes("/salary-advance")
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                >
                    💰 Salary Advance
                </Link>

                <Link
                    href={route("admin.salary.generate")}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${window.location.pathname.includes("/salary/generate")
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                >
                    🪙 Salary Generation
                </Link>

                <Link
                    href={route("admin.salary.employee-salary")}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${window.location.pathname.includes("/salary/employee-salary")
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                >
                    💰 Employee Salary
                </Link>
            </nav>
        </div>
    )
}
