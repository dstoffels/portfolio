//

declare namespace NodeJS {
	interface ProcessEnv {
		NEXT_PUBLIC_SITE_URL: string;
		BROWSERLESS_API_KEY: string;
		NGROK_AUTHTOKEN: string;
		ADMIN_PW: string;
		ADMIN_TOKEN: string;
		FB_SERVICE_ACCOUNT_KEY: string;
		FB_API_KEY: string;
		FB_AUTH_DOMAIN: string;
		FB_DB_URL: string;
		FB_PROJECT_ID: string;
		FB_STORAGE_BUCKET: string;
		FB_SENDER_ID: string;
		FB_APP_ID: string;
	}
}
