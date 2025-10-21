import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
const pages = import.meta.glob('./pages/**/*.{js,jsx,ts,tsx}');

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),

    resolve: (name) => {
        const file =
            `./pages/${name}.tsx` in pages ? `./pages/${name}.tsx`
                : `./pages/${name}.jsx` in pages ? `./pages/${name}.jsx`
                    : `./pages/${name}.js` in pages ? `./pages/${name}.js`
                        : null;

        if (!file) throw new Error(`Page not found: ${name}`);

        return resolvePageComponent(file, pages);
    },

    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
