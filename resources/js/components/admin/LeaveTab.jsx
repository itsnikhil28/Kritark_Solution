import { Link } from "@inertiajs/react";

export default function LeaveTab() {
    return (
        <div className="mb-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
                <Link
                    href={route("admin.holiday.index")}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${window.location.pathname.includes("/holidays")
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                >
                    🎉 Holiday
                </Link>

                <Link
                    href={route("admin.leave.type.index")}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${window.location.pathname.includes("/leave-types")
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                >
                    📝 Leave Type
                </Link>

                <Link
                    href={route("admin.leave.approval.index")}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${window.location.pathname.includes("/leave-approval")
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                >
                    ✅ Leave Approval
                </Link>
            </nav>
        </div>
    )
}
