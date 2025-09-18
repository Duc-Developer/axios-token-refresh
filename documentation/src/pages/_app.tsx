import '@src/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import MainLayout from '../components/Layout/MainLayout';
import { MY_DOMAIN } from '@src/constants';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>axios-token-refresh: Automatic Token Refresh for Axios HTTP Client</title>
                <meta name="description" content="A lightweight npm package for handling token refresh and authentication flows with Axios. Seamlessly retry requests after token expiration. Perfect for JWT and OAuth implementations." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="keywords" content="axios, token, refresh, authentication, npm, package, javascript, typescript, JWT, OAuth, interceptor, retry" />
                <meta name="author" content="Duc-Developer" />
                
                {/* Open Graph Meta Tags */}
                <meta property="og:title" content="axios-token-refresh: Automatic Token Refresh for Axios HTTP Client" />
                <meta property="og:description" content="Lightweight utility for handling token refresh logic in Axios. Automatically retry requests after token expiration with seamless integration." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`${MY_DOMAIN}/`} />
                <meta property="og:image" content={`${MY_DOMAIN}/og-image.png`} />
                <meta property="og:site_name" content="axios-token-refresh" />
                
                {/* Twitter Card Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="axios-token-refresh: Automatic Token Refresh for Axios" />
                <meta name="twitter:description" content="Lightweight utility for handling token refresh logic in Axios. Perfect for authentication flows." />
                <meta name="twitter:image" content={`${MY_DOMAIN}/og-image.png`} />
                
                {/* Additional SEO Meta Tags */}
                <meta name="robots" content="index, follow" />
                <meta name="language" content="English" />
                <link rel="canonical" href={`${MY_DOMAIN}/`} />
                
                <meta name="google-site-verification" content="LHFpjdaEIi2WH7e-m0KUaT3lUlyMqE2dTcIpBkcEyl4" />
                <link rel="icon" href="/favicon.ico" />
                
                {/* Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "SoftwareApplication",
                            "name": "axios-token-refresh",
                            "description": "A lightweight utility for handling token refresh logic in Axios",
                            "applicationCategory": "DeveloperApplication",
                            "operatingSystem": "Cross-platform",
                            "programmingLanguage": "JavaScript",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "USD"
                            },
                            "author": {
                                "@type": "Person",
                                "name": "Duc-Developer"
                            },
                            "downloadUrl": "https://www.npmjs.com/package/axios-token-refresh",
                            "codeRepository": "https://github.com/Duc-Developer/axios-token-refresh"
                        })
                    }}
                />
            </Head>
            <MainLayout>
                <Component {...pageProps} />
            </MainLayout>
        </>
    );
}
