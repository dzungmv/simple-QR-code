/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        loader: 'default',
        domains: ['api.vietqr.io', 'vietqr.net', 'i.ibb.co'],
    },
    env: {
        FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
        FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
        FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
        FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
        FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
        FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
        FIREBASE_MEAUREMENT_ID: process.env.FIREBASE_MEAUREMENT_ID,
        FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
        IMGBB_API_KEY: process.env.IMGBB_API_KEY,
    },
};

module.exports = nextConfig;
