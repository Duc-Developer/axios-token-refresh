import localFont from 'next/font/local';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

export default function Home() {
    return (
        <div
            className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen p-4 sm:p-8 pb-20 gap-8 sm:gap-16 font-[family-name:var(--font-geist-sans)]`}
        >
            <main className="flex flex-col gap-6 sm:gap-8 flex-1 items-center sm:items-start w-full max-w-3xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2 text-center sm:text-left">axios-token-refresh</h1>
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-2xl text-center sm:text-left">
                    <b>axios-token-refresh</b> is a lightweight utility for handling token refresh logic in Axios. It integrates seamlessly with Axios
                    interceptors to automatically retry requests after token expiration. Perfect for authentication flows in modern web applications.
                </p>

                <section id="getting-started" className="w-full">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-2">Installation</h2>
                    <pre className="bg-gray-100 dark:bg-gray-900 rounded p-3 sm:p-4 text-xs sm:text-sm overflow-x-auto">
                        <code>npm install axios-token-refresh</code>
                    </pre>
                </section>

                <section id="usage" className="w-full">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-2">Basic Usage</h2>
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
});
`}
                        </code>
                    </pre>
                </section>

                <section id="api" className="w-full">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-2">API Options</h2>
                    <ul className="list-disc pl-5 sm:pl-6 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                        <li>
                            <b>refreshRequest</b>: <i>(required)</i> The function to handle token refresh, must return a Promise.
                        </li>
                        <li>
                            <b>statusCodes</b>: <i>(optional)</i> List of status codes that trigger refresh (default: <code>[401]</code>).
                        </li>
                        <li>
                            <b>shouldRetry</b>: <i>(optional)</i> Custom function to determine if refresh should occur.
                        </li>
                        <li>
                            <b>retryTimes</b>: <i>(optional)</i> Number of retry attempts (default:
                            <code>1</code>).
                        </li>
                        <li>
                            <b>onRetry</b>: <i>(optional)</i> Callback before each refresh attempt.
                        </li>
                    </ul>
                </section>

                <section id="examples" className="w-full">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-2">Links & Resources</h2>
                    <ul className="list-disc pl-5 sm:pl-6 text-sm sm:text-base">
                        <li>
                            <a
                                href="https://github.com/Duc-Developer/axios-token-refresh"
                                className="text-blue-600 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GitHub Repository
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.npmjs.com/package/axios-token-refresh"
                                className="text-blue-600 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                npm Package
                            </a>
                        </li>
                    </ul>
                </section>
            </main>
            <footer className="flex gap-4 flex-wrap items-center justify-center text-gray-500 text-xs sm:text-sm mt-8">
                © 2025 axios-token-refresh. Made with ❤️ by Duc-Developer.
            </footer>
        </div>
    );
}
