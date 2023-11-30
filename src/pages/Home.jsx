import { Link } from "react-router-dom";

export default function Home() {
  const redirectToGoogleOAuthServer = () => {
    const url = "https://accounts.google.com/o/oauth2/v2/auth";
    const query = {
      client_id: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
      response_type: "code",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
      // prompt: "consent",
    };
    const queryString = new URLSearchParams(query).toString();
    return `${url}?${queryString}`;
  };

  const googleOauthRedirectUrl = redirectToGoogleOAuthServer();

  return (
    <div>
      <h1>Homepage</h1>
      <Link to={googleOauthRedirectUrl}>Login with Google</Link>
    </div>
  );
}
