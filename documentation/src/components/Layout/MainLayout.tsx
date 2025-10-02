import Link from 'next/link';
import React from 'react';
import LanguageSwitcher from '../LanguageSwitcher';
import { useTranslation } from '@src/hooks/useTranslation';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = React.useState(false);
    const {t} = useTranslation();

    return (
        <div className="min-h-screen bg-white dark:bg-[#111] flex">
            {/* Sidebar for desktop/tablet */}
            <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:w-64 md:flex md:flex-col bg-gray-50 dark:bg-[#18181b] border-r border-gray-200 dark:border-gray-800 p-6 z-20">
                <Link href="/" className="mb-8 font-bold text-xl text-gray-900 dark:text-white">
                    axios-token-refresh
                </Link>
                <nav className="space-y-2">
                    <Link href="/#getting-started" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600">
                        {t('nav.gettingStarted')}
                    </Link>
                    <Link href="/#usage" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600">
                        {t('nav.usage')}
                    </Link>
                    <Link href="/#api" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600">
                        {t('nav.api')}
                    </Link>
                    <Link href="/example" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600">
                        {t('nav.examplePage')}
                    </Link>
                </nav>
            </aside>

            {/* Sidebar for mobile */}
            <div className="md:hidden">
                <button
                    className="fixed top-2 left-4 z-30 bg-gray-200 dark:bg-gray-800 p-2 rounded focus:outline-none"
                    onClick={() => setOpen(true)}
                    aria-label="Open navigation"
                >
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                {open && (
                    <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setOpen(false)}>
                        <aside
                            className="absolute left-0 top-0 h-full w-64 bg-gray-50 dark:bg-[#18181b] border-r border-gray-200 dark:border-gray-800 p-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="mb-6 text-gray-700 dark:text-gray-300" onClick={() => setOpen(false)} aria-label="Close navigation">
                                ✕
                            </button>
                            <div className="mb-8 font-bold text-xl text-gray-900 dark:text-white">axios-token-refresh</div>
                            <nav className="space-y-2">
                                <Link
                                    href="/#getting-started"
                                    className="block text-gray-700 dark:text-gray-300 hover:text-blue-600"
                                    onClick={() => setOpen(false)}
                                >
                                    {t('nav.gettingStarted')}
                                </Link>
                                <Link
                                    href="/#usage"
                                    className="block text-gray-700 dark:text-gray-300 hover:text-blue-600"
                                    onClick={() => setOpen(false)}
                                >
                                    {t('nav.usage')}
                                </Link>
                                <Link
                                    href="/#api"
                                    className="block text-gray-700 dark:text-gray-300 hover:text-blue-600"
                                    onClick={() => setOpen(false)}
                                >
                                    {t('nav.api')}
                                </Link>
                                <Link
                                    href="/example"
                                    className="block text-gray-700 dark:text-gray-300 hover:text-blue-600"
                                    onClick={() => setOpen(false)}
                                >
                                    {t('nav.examplePage')}
                                </Link>
                            </nav>
                        </aside>
                    </div>
                )}
            </div>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 md:ml-64">
                {/* Header */}
                <header className="sticky top-0 z-10 bg-white/80 dark:bg-[#111]/80 border-b border-gray-200 dark:border-gray-800 px-4 sm:px-6 py-4 flex items-center justify-between gap-4 backdrop-blur">
                    <div className="flex flex-1 items-center justify-between">
                        <div className="ml-12 md:ml-0 font-semibold text-lg text-gray-900 dark:text-white">Documentation</div>

                        <Link
                            href="https://github.com/Duc-Developer/axios-token-refresh"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline text-blue-400 hover:text-blue-300 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            GitHub
                        </Link>
                    </div>
                    <LanguageSwitcher />
                </header>
                {/* Content */}
                <div className="p-2 sm:p-6 max-w-4xl w-full mx-auto">{children}</div>
            </main>
        </div>
    );
}
