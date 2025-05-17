import '@src/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import MainLayout from '../components/Layout/MainLayout';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>axios-token-refresh: Effortless Axios Token Refresh Handling</title>
                <meta name="description" content="A lightweight npm package for handling token refresh and authentication flows with Axios. Seamlessly retry requests after token expiration." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="keywords" content="axios, token, refresh, authentication, npm, package, javascript, typescript" />
                <meta name="author" content="Duc-Developer" />
                <meta property="og:title" content="axios-token-refresh" />
                <meta property="og:description" content="Effortless Axios token refresh handling for modern web apps." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://your-domain.com/" />
                <meta property="og:image" content="https://your-domain.com/og-image.png" />
                <meta name="google-site-verification" content="LHFpjdaEIi2WH7e-m0KUaT3lUlyMqE2dTcIpBkcEyl4" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MainLayout>
                <Component {...pageProps} />
            </MainLayout>
        </>
    );
}
