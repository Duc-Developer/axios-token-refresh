import '@src/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import MainLayout from '../components/Layout/MainLayout';
import { MY_DOMAIN } from '@src/constants';
import { useTranslation } from '@src/hooks/useTranslation';

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const { locale } = router;
    const { t } = useTranslation();

    return (
        <>
            <Head>
                <title>{t('meta.title')}</title>
                <meta name="description" content={t('meta.description')} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="keywords" content={t('meta.keywords')} />
                <meta name="author" content="Duc-Developer" />
                
                {/* Open Graph Meta Tags */}
                <meta property="og:title" content={t('meta.title')} />
                <meta property="og:description" content={t('meta.description')} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`${MY_DOMAIN}${locale === 'vi' ? '/vi' : ''}/`} />
                <meta property="og:image" content={`${MY_DOMAIN}/og-image.png`} />
                <meta property="og:site_name" content="axios-token-refresh" />
                <meta property="og:locale" content={locale === 'vi' ? 'vi_VN' : 'en_US'} />
                <meta property="og:locale:alternate" content={locale === 'vi' ? 'en_US' : 'vi_VN'} />
                
                {/* Twitter Card Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={t('meta.title')} />
                <meta name="twitter:description" content={t('meta.description')} />
                <meta name="twitter:image" content={`${MY_DOMAIN}/og-image.png`} />
                
                {/* Additional SEO Meta Tags */}
                <meta name="robots" content="index, follow" />
                <meta name="language" content={locale === 'vi' ? 'Vietnamese' : 'English'} />
                <link rel="canonical" href={`${MY_DOMAIN}${locale === 'vi' ? '/vi' : ''}/`} />
                
                {/* Alternate language links for SEO */}
                <link rel="alternate" hrefLang="en" href={`${MY_DOMAIN}/`} />
                <link rel="alternate" hrefLang="vi" href={`${MY_DOMAIN}/vi/`} />
                <link rel="alternate" hrefLang="x-default" href={`${MY_DOMAIN}/`} />
                
                <meta name="google-site-verification" content="LHFpjdaEIi2WH7e-m0KUaT3lUlyMqE2dTcIpBkcEyl4" />
                <link rel="icon" href="/favicon.ico" />
                
                {/* Structured Data with locale support */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "SoftwareApplication",
                            "name": "axios-token-refresh",
                            "description": t('meta.description'),
                            "applicationCategory": "DeveloperApplication",
                            "operatingSystem": "Cross-platform",
                            "programmingLanguage": "JavaScript",
                            "inLanguage": locale === 'vi' ? 'vi' : 'en',
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