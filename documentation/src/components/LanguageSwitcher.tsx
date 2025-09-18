import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';

export default function LanguageSwitcher() {
    const router = useRouter();
    const { locale, asPath } = router;
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' }
    ];

    const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                aria-label="Change language"
            >
                <span>{currentLanguage.flag}</span>
                <span className="hidden sm:inline">{currentLanguage.name}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setIsOpen(false)}
                    />
                    
                    {/* Dropdown */}
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-20">
                        {languages.map((language) => (
                            <Link
                                key={language.code}
                                href={asPath}
                                locale={language.code}
                                className={`flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors first:rounded-t-md last:rounded-b-md ${
                                    locale === language.code 
                                        ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
                                        : 'text-gray-700 dark:text-gray-300'
                                }`}
                                onClick={() => setIsOpen(false)}
                            >
                                <span className="text-lg">{language.flag}</span>
                                <span>{language.name}</span>
                                {locale === language.code && (
                                    <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}