import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang='en'>
            <Head>
                <link
                    rel='stylesheet'
                    href='https://site-assets.fontawesome.com/releases/v6.1.2/css/all.css?fbclid=IwAR2Lefv1ZTLJsKEsnl4HGMf5XRZuPqx5yOFnFaOFbVgCiCeU87S0up6ptKU'
                />
                <link
                    rel='shortcut icon'
                    href='/favicon.png'
                    type='image/png'
                />
            </Head>

            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
