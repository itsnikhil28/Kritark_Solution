import {
    Calendar,
    Calendar1,
    IndianRupee,
    LayoutDashboard,
    LucideAirVent,
    Settings,
    TableOfContents,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
} from "@/components/admin/sidebar";
import { Link, usePage } from "@inertiajs/react";

const menuItems = [
    { title: "Dashboard", url: "/employee/dashboard", icon: LayoutDashboard },
    { title: "Tasks", url: "/employee/tasks", icon: TableOfContents },
    { title: "Attendance", url: "/employee/attendance", icon: Calendar },
    { title: "Holidays", url: "/employee/holidays", icon: Calendar1 },
    { title: "Leave", url: "/employee/leaves", icon: LucideAirVent },
    { title: "Salary", url: "/employee/salary", icon: IndianRupee },
    { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
    return (
        <Sidebar className="border-r border-sidebar-border">
            <SidebarHeader className="border-b border-sidebar-border px-6 py-5">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-sm">IT</span>
                    </div>
                    <div>
                        <h2 className="text-sidebar-foreground font-semibold text-base">IT Consulting</h2>
                        <p className="text-sidebar-foreground/60 text-xs">Employee Dashboard</p>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-sidebar-foreground/60 text-xs uppercase tracking-wider px-3 py-2">
                        Main Menu
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => {
                                const isActive = usePage().url === item.url;

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link
                                                href={item.url}
                                                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${isActive
                                                    ? "bg-sidebar-accent text-sidebar-primary font-medium"
                                                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                                                    }`}
                                            >
                                                <item.icon className="h-5 w-5" />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
