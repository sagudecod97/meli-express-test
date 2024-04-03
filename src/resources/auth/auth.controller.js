import fetch from "node-fetch";
import {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  BASE_URL_API,
  BASE_URL_OAUTH,
} from "../../utils/constants.utils";

export const initiateOauthFlow = (req, res) => {
  const { code } = req.query;

  if (code) {
    return res.redirect(`/api/auth/mercadolibre/callback/${code}`);
  }

  const redirectUrl = `${BASE_URL_OAUTH}/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
  res.redirect(redirectUrl);
};

export const authorizationResponse = async (req, res) => {
  try {
    const { code } = req.params;

    const requestBody = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: code,
      redirect_uri: REDIRECT_URI,
    });

    const request = await fetch(`${BASE_URL_API}/oauth/token`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: requestBody,
    });

    const response = await request.json();

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: `Error fetching token info: ${error}` });
  }
};
