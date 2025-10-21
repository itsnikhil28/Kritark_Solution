import { login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useRoute } from 'ziggy-js';
import { Rocket, Eye, HeartHandshake } from 'lucide-react';
import {
    Users,
    Clock,
    CalendarCheck,
    BarChart3,
    Wallet,
    ShieldCheck
} from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const route = useRoute();

    const getDashboardRoute = () => {
        if (auth?.user?.employee_code) {
            return route('employee.dashboard');
        } else {
            return route('admin.dashboard');
        }
    };

    return (
        <>
            <Head title="Welcome | Kritark Solution Employee Management System">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=inter:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>

            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-[#f9fafb] via-[#f3f4f6] to-[#e9ebef] dark:from-[#0f0f0f] dark:via-[#161616] dark:to-[#1a1a1a] text-[#1b1b18] lg:justify-start lg:p-0 transition-colors duration-300">

                {/* HEADER */}
                <header className="w-full bg-white/60 dark:bg-[#141414]/80 backdrop-blur-md border-b border-[#e5e5e5] dark:border-[#2a2a2a] py-4 px-8 flex justify-between items-center fixed top-0 z-50">
                    <h1 className="text-2xl font-semibold tracking-tight text-[#1b1b18] dark:text-white">
                        Kritark Solution <span className="text-[#f53003] dark:text-[#FF4433]">EMS</span>
                    </h1>

                    <nav className="flex items-center gap-4">
                        {auth.user ? (
                            <Link
                                href={getDashboardRoute()}
                                className="rounded-md border border-[#d1d1ce] bg-[#1b1b18] px-5 py-2 text-sm font-medium text-white hover:bg-black dark:border-[#3E3E3A] dark:bg-[#FF4433] dark:hover:bg-[#ff2d1d] transition"
                            >
                                Go to Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="rounded-md px-5 py-2 text-sm font-medium text-[#1b1b18] hover:text-[#f53003] dark:text-[#EDEDEC] transition"
                                >
                                    Admin Login
                                </Link>
                                <Link
                                    href={route('employee.login')}
                                    className="rounded-md border border-[#19140035] px-5 py-2 text-sm font-medium text-[#1b1b18] hover:bg-[#f53003] hover:text-white dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:bg-[#FF4433] transition"
                                >
                                    Employee Login
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                {/* HERO SECTION */}
                <section className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mt-24 lg:mt-32 px-6 lg:px-16">
                    <div className="flex-1 flex flex-col justify-center mb-10 lg:mb-0">
                        <h2 className="text-4xl lg:text-5xl font-bold mb-4 dark:text-[#EDEDEC] leading-tight">
                            Streamlining <span className="text-[#f53003] dark:text-[#FF4433]">Workforce Management</span> at Kritark Solution
                        </h2>
                        <p className="text-[#6b6a66] dark:text-[#A1A09A] mb-8 max-w-xl leading-relaxed">
                            The <strong>Kritark Employee Management System (EMS)</strong> is built to empower our organization to
                            manage employee data, attendance, performance, payroll, and communication — all in one unified platform.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                href={route('employee.login')}
                                className="rounded-md border border-[#f53003] bg-[#f53003] px-7 py-2.5 text-sm font-medium text-white hover:bg-[#d62600] dark:bg-[#FF4433] dark:hover:bg-[#ff2d1d] transition"
                            >
                                Employee Login
                            </Link>
                            <Link
                                href={route('login')}
                                className="rounded-md border border-[#1b1b18] px-7 py-2.5 text-sm font-medium text-[#1b1b18] hover:bg-[#1b1b18] hover:text-white transition dark:border-[#EDEDEC] dark:text-[#EDEDEC] dark:hover:bg-[#EDEDEC] dark:hover:text-[#1C1C1A]"
                            >
                                Admin Login
                            </Link>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 flex justify-center">
                        <img
                            src="data:image/png;base64,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"
                            alt="Kritark EMS Dashboard Preview"
                            className="w-[90%] lg:w-[80%] rounded-lg shadow-2xl h-[300px] transition-transform duration-500 ease-in-out hover:scale-110"
                        />
                    </div>
                </section>

                {/* COMPANY OVERVIEW */}
                <section className="w-full max-w-6xl mt-24 px-6 lg:px-16 text-center">
                    <h3 className="text-2xl font-semibold mb-6 dark:text-[#EDEDEC]">About Kritark Solution</h3>
                    <p className="text-[#6b6a66] dark:text-[#A1A09A] max-w-3xl mx-auto leading-relaxed text-[15px]">
                        <strong>Kritark Solution Pvt. Ltd.</strong> is a technology-driven company focused on delivering
                        innovative business solutions. Our Employee Management System is designed specifically for our
                        internal teams to enhance productivity, streamline HR operations, and build a transparent and
                        connected workplace culture.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                        <div className="bg-white dark:bg-[#181818] rounded-lg p-6 shadow-md hover:shadow-lg transition text-center">
                            <div className="flex justify-center mb-3">
                                <Rocket className="w-8 h-8 text-[#f53003] dark:text-[#FF4433]" />
                            </div>
                            <h4 className="font-semibold text-lg mb-2 text-[#f53003] dark:text-[#FF4433]">Mission</h4>
                            <p className="text-sm text-[#6b6a66] dark:text-[#A1A09A]">
                                To create a seamless digital workplace that enables growth, collaboration, and transparency for all employees.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-[#181818] rounded-lg p-6 shadow-md hover:shadow-lg transition text-center">
                            <div className="flex justify-center mb-3">
                                <Eye className="w-8 h-8 text-[#f53003] dark:text-[#FF4433]" />
                            </div>
                            <h4 className="font-semibold text-lg mb-2 text-[#f53003] dark:text-[#FF4433]">Vision</h4>
                            <p className="text-sm text-[#6b6a66] dark:text-[#A1A09A]">
                                To be a benchmark in corporate workforce management by leveraging innovation and efficiency.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-[#181818] rounded-lg p-6 shadow-md hover:shadow-lg transition text-center">
                            <div className="flex justify-center mb-3">
                                <HeartHandshake className="w-8 h-8 text-[#f53003] dark:text-[#FF4433]" />
                            </div>
                            <h4 className="font-semibold text-lg mb-2 text-[#f53003] dark:text-[#FF4433]">Values</h4>
                            <p className="text-sm text-[#6b6a66] dark:text-[#A1A09A]">
                                Integrity, teamwork, excellence, and a people-first approach in every aspect of our organization.
                            </p>
                        </div>
                    </div>

                </section>

                <section className="w-full max-w-6xl mt-24 px-6 lg:px-16">
                    <h3 className="text-2xl font-semibold mb-8 text-center dark:text-[#EDEDEC]">
                        System Capabilities
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                title: 'Employee Profiles',
                                desc: 'Centralized management of employee information, roles, and documents.',
                                icon: <Users className="w-7 h-7 text-[#f53003] dark:text-[#FF4433]" />,
                            },
                            {
                                title: 'Attendance Tracking',
                                desc: 'Monitor attendance and working hours with real-time accuracy.',
                                icon: <Clock className="w-7 h-7 text-[#f53003] dark:text-[#FF4433]" />,
                            },
                            {
                                title: 'Leave Management',
                                desc: 'Seamlessly manage leave applications, approvals, and records.',
                                icon: <CalendarCheck className="w-7 h-7 text-[#f53003] dark:text-[#FF4433]" />,
                            },
                            {
                                title: 'Performance Reviews',
                                desc: 'Evaluate employee performance with structured reviews and metrics.',
                                icon: <BarChart3 className="w-7 h-7 text-[#f53003] dark:text-[#FF4433]" />,
                            },
                            {
                                title: 'Payroll Integration',
                                desc: 'Automated payroll calculations and secure payslip generation.',
                                icon: <Wallet className="w-7 h-7 text-[#f53003] dark:text-[#FF4433]" />,
                            },
                            {
                                title: 'Secure Authentication',
                                desc: 'Role-based access control for employees and administrators.',
                                icon: <ShieldCheck className="w-7 h-7 text-[#f53003] dark:text-[#FF4433]" />,
                            },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-white dark:bg-[#181818] rounded-lg p-6 shadow-md hover:shadow-lg transition text-center"
                            >
                                <div className="flex justify-center mb-3">{item.icon}</div>
                                <h4 className="font-semibold text-lg mb-2 text-[#f53003] dark:text-[#FF4433]">
                                    {item.title}
                                </h4>
                                <p className="text-sm text-[#6b6a66] dark:text-[#A1A09A]">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>


                {/* FOOTER */}
                <footer className="w-full mt-24 py-8 bg-[#f5f5f5] dark:bg-[#121212] text-center text-sm text-[#777] dark:text-[#A1A09A]">
                    <p>© {new Date().getFullYear()} Kritark Solution Pvt. Ltd. | Employee Management System</p>
                    <p className="mt-1 text-xs">
                        Need help? Contact <a href="mailto:support@Kritarksolution.com" className="text-[#f53003] dark:text-[#FF4433] hover:underline">support@Kritarksolution.com</a>
                    </p>
                </footer>
            </div>
        </>
    );
}
