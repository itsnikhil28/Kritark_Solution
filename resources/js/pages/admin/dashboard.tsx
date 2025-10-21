import { MetricCard } from '@/components/MetricCard';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    FolderKanban,
    DollarSign,
    Users,
    TrendingUp,
    Briefcase,
    Clock,
} from "lucide-react";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

export default function Dashboard({ avgProductivity, totalTasks, totalEmployees,
    monthlySalary, completedTasks, pendingTasks, clientDomainData, revenueData,
    employeeUtilization, milestones }: any) {

    const projectStatusData = [
        { name: "Completed", value: completedTasks, color: "hsl(var(--chart-2))" },
        { name: "In Progress", value: pendingTasks, color: "hsl(var(--chart-1))" },
        { name: "Total Task", value: totalTasks, color: "hsl(var(--chart-3))" },
    ];
    return (
        <AppLayout>
            <Head title="Admin Dashboard" />
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h1>
                    <p className="text-muted-foreground">
                        Welcome back! Here's what's happening with your business today.
                    </p>
                </div>

                {/* Metric Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <MetricCard
                        title="Total Tasks"
                        value={totalTasks}
                        change={`+ ${totalTasks} this month`}
                        changeType="positive"
                        icon={FolderKanban}
                        iconBgClass="bg-primary/10 text-primary"
                    />
                    <MetricCard
                        title="Monthly Salary"
                        value={`₹ ${monthlySalary}`}
                        change={`+ ${monthlySalary} this month`}
                        changeType="positive"
                        icon={DollarSign}
                        iconBgClass="bg-success/10 text-success"
                    />
                    <MetricCard
                        title="Total Employees"
                        value={totalEmployees}
                        change={`+ ${totalEmployees} this month`}
                        changeType="positive"
                        icon={Briefcase}
                        iconBgClass="bg-warning/10 text-warning"
                    />
                    <MetricCard
                        title="Team Productivity"
                        value={`${avgProductivity}%`}
                        change={`+ ${avgProductivity}% improvement`}
                        changeType="positive"
                        icon={TrendingUp}
                        iconBgClass="bg-chart-4/10 text-chart-4"
                    />
                </div>

                {/* Charts Row 1 */}
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Monthly Salary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                                    <YAxis stroke="hsl(var(--muted-foreground))" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "hsl(var(--card))",
                                            border: "1px solid hsl(var(--border))",
                                            borderRadius: "var(--radius)",
                                        }}
                                    />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="Salary"
                                        stroke="hsl(var(--chart-1))"
                                        strokeWidth={2}
                                        dot={{ fill: "hsl(var(--chart-1))" }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Task Status Distribution</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center justify-center">
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={projectStatusData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {projectStatusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Row 2 */}
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Employee Distribution by Domain</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={clientDomainData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                    <XAxis dataKey="domain" stroke="hsl(var(--muted-foreground))" />
                                    <YAxis stroke="hsl(var(--muted-foreground))" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "hsl(var(--card))",
                                            border: "1px solid hsl(var(--border))",
                                            borderRadius: "var(--radius)",
                                        }}
                                    />
                                    <Bar dataKey="employees" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Employee Utilization Rate</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={employeeUtilization} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                                    <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "hsl(var(--card))",
                                            border: "1px solid hsl(var(--border))",
                                            borderRadius: "var(--radius)",
                                        }}
                                    />
                                    <Bar dataKey="rate" fill="hsl(var(--chart-2))" radius={[0, 8, 8, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* Project Milestones */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            Upcoming Project Milestones
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {milestones.map((milestone : any, index : number) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-foreground"><strong>Name :</strong>{milestone.project}</p>
                                            <p className="text-sm text-muted-foreground">{milestone.task}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-foreground">{milestone.deadline}</p>
                                            <p className="text-sm text-muted-foreground">{milestone.progress}% complete</p>
                                        </div>
                                    </div>
                                    <div className="w-full bg-muted rounded-full h-2">
                                        <div
                                            className="bg-primary h-2 rounded-full transition-all"
                                            style={{ width: `${milestone.progress}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
