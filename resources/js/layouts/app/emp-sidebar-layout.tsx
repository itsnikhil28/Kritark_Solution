
import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/admin/sidebar";
import { AppSidebar } from "@/pages/employee/AppSidebar";
import { type SharedData } from '@/types';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePage } from "@inertiajs/react";
import { useInitials } from "@/hooks/use-initials";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EmpMenuContent } from "@/components/emp-menu-content";

export default function EmpSidebarLayout({
    children,
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const getInitials = useInitials();

    return (
        <SidebarProvider>
            <div className="min-h-screen flex w-full">
                <AppSidebar />
                <div className="flex-1 flex flex-col overflow-x-auto">
                    <header className="sticky top-0 z-10 h-16 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
                        <div className="flex h-full items-center justify-between px-6">
                            <div className="flex items-center gap-4">
                                <SidebarTrigger />
                                <div className="relative w-96 max-w-md hidden md:block">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search projects, clients, employees..."
                                        className="pl-9 bg-muted/50 border-none"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button variant="ghost" size="icon" className="relative">
                                    <Bell className="h-5 w-5" />
                                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center">
                                        3
                                    </span>
                                </Button>
                                {/* <Button variant="ghost" size="icon">
                                    <User className="h-5 w-5" />
                                </Button> */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="size-10 rounded-full p-1"
                                        >
                                            <Avatar className="size-8 overflow-hidden rounded-full">
                                                {/* <AvatarImage
                                                    src={auth.user.avatar}
                                                    alt={auth.user.name}
                                                /> */}
                                                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                    {getInitials('E')}
                                                </AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56" align="end">
                                        <EmpMenuContent user={auth.user} />
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </header>
                    <main className="flex-1 p-6 bg-background">{children}</main>
                </div>
            </div>
        </SidebarProvider>
    );
}
