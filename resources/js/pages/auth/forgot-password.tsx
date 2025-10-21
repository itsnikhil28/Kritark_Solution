import PasswordResetLinkController from '@/actions/App/Http/Controllers/Auth/PasswordResetLinkController';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <Head title="Forgot Password" />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#0f0f0f] dark:to-[#1a1a1a] px-6">
                <div className="w-full max-w-md bg-white dark:bg-[#181818] rounded-xl shadow-lg border border-gray-200 dark:border-[#2a2a2a] p-8">

                    {/* Header */}
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                            Forgot Password
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Enter your email to receive a password reset link
                        </p>
                    </div>

                    {/* Status message */}
                    {status && (
                        <div className="mb-4 text-center text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}

                    {/* Form */}
                    <Form {...PasswordResetLinkController.store.form()} className="space-y-6">
                        {({ processing, errors }) => (
                            <>
                                {/* Email field */}
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium">
                                        Email Address
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        autoComplete="off"
                                        autoFocus
                                        placeholder="email@example.com"
                                        className="mt-1"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                {/* Submit button */}
                                <Button
                                    type="submit"
                                    className="w-full py-3 font-medium mt-2 bg-[#f53003] hover:bg-[#e02c02] text-white transition"
                                    disabled={processing}
                                    data-test="email-password-reset-link-button"
                                >
                                    {processing && (
                                        <LoaderCircle className="h-4 w-4 animate-spin mr-2" />
                                    )}
                                    Send Reset Link
                                </Button>
                            </>
                        )}
                    </Form>

                    {/* Footer link */}
                    <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                        <span>Or, return to </span>
                        <TextLink href={login()}>Log in</TextLink>
                    </div>
                </div>
            </div>
        </>
    );
}
