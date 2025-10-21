import { Head, usePage } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import { SharedData, type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit as editAppearance } from '@/routes/appearance';
import EmpLayout from '@/layouts/emp-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Appearance settings',
        href: editAppearance().url,
    },
];

export default function Appearance() {
    const { auth } = usePage<SharedData>().props;
    const rendercode = (
        <>
            <Head title="Appearance settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Appearance settings"
                        description="Update your account's appearance settings"
                    />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </>
    );
    return (
        <>
            {auth.user.employee_code === undefined ? (
                <AppLayout breadcrumbs={breadcrumbs}>
                    {rendercode}
                </AppLayout>
            ) : (
                <EmpLayout>
                    {rendercode}
                </EmpLayout>
            )}
        </>
    );
}
