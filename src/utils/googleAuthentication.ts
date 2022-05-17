import axios from "axios";
import qs from "qs";
import log from "./logger";

interface GoogleTokensResult {
	access_token: string;
	expires_in: Number;
	refresh_token: string;
	scope: string;
	id_token: string;
}

interface GoogleUserResult {
	id: string;
	email: string;
	verified_email: boolean;
	name: string;
	given_name: string;
	family_name: string;
	picture: string;
	locale: string;
}

export const getGoogleOAuthTokens = async ({ code }: { code: string }): Promise<GoogleTokensResult> => {
	const url = "https://oauth2.googleapis.com/token";
	const values = {
		code,
		client_id: process.env.GOOGLE_CLIENT_ID as string,
		client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
		redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL as string,
		grant_type: "authorization_code",
	};
	try {
		const res = await axios.post<GoogleTokensResult>(url, qs.stringify(values), {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});
		return res.data;
	} catch (error: any) {
		console.error(error.response.data.error);
		log.error(error, "Failed to fetch Google Oauth Tokens");
		return error.response.data.error;
	}
};

export const getGoogleUser = async ({
	id_token,
	access_token,
}: {
	id_token: string;
	access_token: string;
}): Promise<GoogleUserResult> => {
	try {
		const res = await axios.get<GoogleUserResult>(
			`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
			{
				headers: {
					Authorization: `Bearer ${id_token}`,
				},
			},
		);
		return res.data;
	} catch (error: any) {
		console.error(error.response.data.error);
		log.error(error, "Failed to fetch Google Oauth Tokens");
		return error.response.data.error;
	}
};
