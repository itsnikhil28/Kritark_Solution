import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useRoute } from 'ziggy-js';

interface LoginProps {
    status?: string;
}

export default function EmployeeLogin({ status }: LoginProps) {
    const route = useRoute();

    return (
        <>
            <Head title="Employee Login" />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#0f0f0f] dark:to-[#1a1a1a] px-6">
                <div className="w-full max-w-md bg-white dark:bg-[#181818] rounded-xl shadow-lg border border-gray-200 dark:border-[#2a2a2a] p-8">

                    {/* Header */}
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                            Employee Portal
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Log in with your employee credentials
                        </p>
                    </div>

                    {/* Status message */}
                    {status && (
                        <div className="mb-4 text-center text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}

                    {/* Login Form */}
                    <Form
                        method="post"
                        action={route('employee.login.store')}
                        resetOnSuccess={['password']}
                        className="space-y-6"
                    >
                        {({ processing, errors }) => (
                            <>
                                {/* Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium">
                                        Email Address
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="email"
                                        placeholder="employee@example.com"
                                        className="mt-1"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                {/* Password */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password" className="text-sm font-medium">
                                            Password
                                        </Label>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                        className="mt-1"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                {/* Remember me */}
                                {/* <div className="flex items-center space-x-3">
                                    <Checkbox id="remember" name="remember" tabIndex={3} />
                                    <Label htmlFor="remember" className="text-sm">
                                        Remember me
                                    </Label>
                                </div> */}

                                {/* Submit button */}
                                <Button
                                    type="submit"
                                    className="w-full py-3 font-medium mt-2 bg-[#f53003] hover:bg-[#e02c02] text-white transition"
                                    tabIndex={4}
                                    disabled={processing}
                                    data-test="login-button"
                                >
                                    {processing ? (
                                        <LoaderCircle className="h-4 w-4 animate-spin mr-2" />
                                    ) : null}
                                    Log in
                                </Button>

                                {/* Help Text */}
                                <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-3">
                                    Having trouble logging in? Contact your administrator.
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </>
    );
}
