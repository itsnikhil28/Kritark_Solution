import EmpLayout from '@/layouts/emp-layout'
import { Head } from '@inertiajs/react'
import { MetricCard } from '@/components/MetricCard';
import { Briefcase, DollarSign, FolderKanban, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useEffect, useState } from 'react'; 
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function dashboard({ activetasks, completedtasks, pendingtasks, productivity, pendingTasksList, salaryData }) {

    const projectStatusData = [
        { name: "Completed", value: completedtasks, color: "hsl(var(--chart-2))" },
        { name: "In Progress", value: pendingtasks, color: "hsl(var(--chart-1))" },
        { name: "Total Task", value: activetasks, color: "hsl(var(--chart-3))" },  
    ];

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        if (pendingTasksList.length > 0) {
            setIsDialogOpen(true);
        }
    }, [pendingTasksList]);

    const priorityColor = {
        Low: "bg-green-100 text-green-800",
        Medium: "bg-yellow-100 text-yellow-800",
        High: "bg-orange-100 text-orange-800",
        Urgent: "bg-red-100 text-red-800",
    };
    return (
        <EmpLayout>
            <Head title="Employee Dashboard" />
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
                        title="Total Task"
                        value={activetasks}
                        change={`+ ${activetasks} this month`}
                        changeType="positive"
                        icon={FolderKanban}
                        iconBgClass="bg-primary/10 text-primary"
                    />
                    <MetricCard
                        title="Completed Task"
                        value={completedtasks}
                        change={`+ ${completedtasks} this month`}
                        changeType="positive"
                        icon={DollarSign}
                        iconBgClass="bg-success/10 text-success"
                    />
                    <MetricCard
                        title="Pending Task"
                        value={pendingtasks}
                        change={`+ ${pendingtasks} this month`}
                        changeType="positive"
                        icon={Briefcase}
                        iconBgClass="bg-warning/10 text-warning"
                    />
                    <MetricCard
                        title="Your Productivity"
                        value={`${productivity}%`}
                        change={`+ ${productivity}% improvement`}
                        changeType="positive"
                        icon={TrendingUp}
                        iconBgClass="bg-chart-4/10 text-chart-4"
                    />
                </div>

                {/* Charts Row 1 */}
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Salary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={salaryData}>
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
                                        dataKey="Monthly Salary"
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
                            <CardTitle>Project Status Distribution</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center justify-center">
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={projectStatusData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
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
                {/* <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Client Distribution by Domain</CardTitle>
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
                                    <Bar dataKey="clients" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} />
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
                </div> */}

                {/* Project Milestones */}
                {/* <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            Upcoming Project Milestones
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {milestones.map((milestone, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-foreground">{milestone.project}</p>
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
                </Card> */}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto rounded-xl shadow-lg border border-gray-200 bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-semibold text-gray-800">
                            ⚠️ You Have {pendingtasks} Pending {pendingtasks > 1 ? "Tasks" : "Task"}
                        </DialogTitle>
                        <DialogDescription className="text-sm text-gray-600">
                            Here’s a quick look at your pending work items.
                        </DialogDescription>
                    </DialogHeader>

                    <ScrollArea className="mt-4 space-y-4">
                        {pendingTasksList && pendingTasksList.length > 0 ? (
                            pendingTasksList.map((task) => (
                                <div
                                    key={task.id}
                                    className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-200 shadow-sm"
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold text-gray-800">{task.title}</h3>
                                        <span
                                            className={`text-xs font-medium px-2 py-1 rounded-full ${priorityColor[task.priority]}`}
                                        >
                                            {task.priority}
                                        </span>
                                    </div>

                                    {task.deadline && (
                                        <p className="text-xs text-gray-500 mt-1">
                                            Deadline: {new Date(task.deadline).toLocaleDateString()}
                                        </p>
                                    )}

                                    {task.description && (
                                        <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                                            {task.description}
                                        </p>
                                    )}

                                    <div className="mt-3">
                                        <Progress value={task.progress_percentage} className="h-2" />
                                        <p className="text-xs text-gray-500 mt-1">
                                            {task.progress_percentage}% complete
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center py-4">No pending tasks found.</p>
                        )}
                    </ScrollArea>

                    <div className="mt-4 flex justify-end">
                        <Button
                            onClick={() => setIsDialogOpen(false)}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            Got it
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </EmpLayout>
    )
}
