/* eslint-disable @next/next/no-img-element */
import { useTranslation } from '@src/hooks/useTranslation';

export default function Home() {
    const { t } = useTranslation();

    return (
        <div
            className={`flex flex-col min-h-screen p-4 sm:p-8 pb-20 gap-8 sm:gap-16 font-[family-name:var(--font-geist-sans)]`}
        >
            <main className="flex flex-col gap-6 sm:gap-8 flex-1 items-center sm:items-start w-full max-w-3xl mx-auto">
                <div className="flex gap-2">
                    <a href="https://www.npmjs.com/package/axios-token-refresh">
                        <img src="https://img.shields.io/npm/v/axios-token-refresh.svg" alt="npm version" />
                    </a>
                    <a href="https://www.npmjs.com/package/axios-token-refresh">
                        <img src="https://img.shields.io/npm/dm/axios-token-refresh.svg" alt="npm downloads" />
                    </a>
                    <a href="https://github.com/Duc-Developer/axios-token-refresh/actions">
                        <img src="https://github.com/Duc-Developer/axios-token-refresh/workflows/CI/badge.svg" alt="build status" />
                    </a>
                    <a href="https://github.com/Duc-Developer/axios-token-refresh">
                        <img src="https://img.shields.io/github/stars/Duc-Developer/axios-token-refresh.svg" alt="GitHub stars" />
                    </a>
                    <a href="https://github.com/Duc-Developer/axios-token-refresh/blob/main/LICENSE">
                        <img src="https://img.shields.io/github/license/Duc-Developer/axios-token-refresh.svg" alt="license" />
                    </a>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2 text-center sm:text-left">{t('home.title')}</h1>
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 text-justify">{t('home.subtitle', { name: t('home.title') })}</p>

                <section id="getting-started" className="w-full">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-2">{t('home.installation.title')}</h2>
                    <pre className="bg-gray-100 dark:bg-gray-900 rounded p-3 sm:p-4 text-xs sm:text-sm overflow-x-auto">
                        <code>{t('home.installation.command')}</code>
                    </pre>
                </section>

                <section id="usage" className="w-full">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-2">{t('home.usage.title')}</h2>
                    <pre className="bg-gray-100 dark:bg-gray-900 rounded p-3 sm:p-4 text-xs sm:text-sm overflow-x-auto">
                        <code>
                            {`import axios from 'axios';
import registerAxiosTokenRefresh from 'axios-token-refresh';

const api = axios.create({ baseURL: '/api' });

registerAxiosTokenRefresh(api, {
  refreshRequest: async (error) => {
    // Call your refresh token API
    const res = await axios.post('/auth/refresh', { token: 'refresh-token' });
    // Attach new accessToken to header
    error.config.headers['Authorization'] = 'Bearer ' + res.data.accessToken;
    return api.request(error.config);
  },
});`}
                        </code>
                    </pre>
                </section>

                <section id="api" className="w-full">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-2">{t('home.api.title')}</h2>
                    <ul className="list-disc pl-5 sm:pl-6 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                        <li>
                            <b>refreshRequest</b>: <i>({t('common.required')})</i> {t('home.api.refreshRequest')}
                        </li>
                        <li>
                            <b>statusCodes</b>: <i>({t('common.optional')})</i> {t('home.api.statusCodes', { defaultValue: '[401]' })}
                        </li>
                        <li>
                            <b>shouldRetry</b>: <i>({t('common.optional')})</i> {t('home.api.shouldRetry')}
                        </li>
                        <li>
                            <b>retryTimes</b>: <i>({t('common.optional')})</i> {t('home.api.retryTimes', { defaultValue: '1' })}
                        </li>
                        <li>
                            <b>onRetry</b>: <i>({t('common.optional')})</i> {t('home.api.onRetry')}
                        </li>
                    </ul>
                </section>

                <section id="examples" className="w-full">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-2">{t('home.links.title')}</h2>
                    <ul className="list-disc pl-5 sm:pl-6 text-sm sm:text-base">
                        <li>
                            <a
                                href="https://github.com/Duc-Developer/axios-token-refresh"
                                className="text-blue-600 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {t('home.links.github')}
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.npmjs.com/package/axios-token-refresh"
                                className="text-blue-600 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {t('home.links.npm')}
                            </a>
                        </li>
                    </ul>
                </section>
            </main>
            <footer className="flex gap-4 flex-wrap items-center justify-center text-gray-500 text-xs sm:text-sm mt-8">
                {t('footer.copyright')}
            </footer>
        </div>
    );
}
