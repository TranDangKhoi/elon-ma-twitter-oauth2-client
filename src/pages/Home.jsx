import { Link } from "react-router-dom";

export default function Home() {
  const getGoogleLoginScreenUrl = () => {
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
  const isLoggedIn = localStorage.getItem("access_token");
  const googleLoginScreenUrl = getGoogleLoginScreenUrl();

  return (
    <div>
      <h1>Homepage</h1>
      {isLoggedIn ? (
        <button
          style={{
            width: "100px",
            height: "50px",
            backgroundColor: "#2c2c2c",
            color: "#fff",
            cursor: "pointer",
          }}
          onClick={() => {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("new_user");
            window.location.reload();
          }}
        >
          Logout
        </button>
      ) : (
        <Link to={googleLoginScreenUrl}>Login with Google</Link>
      )}
    </div>
  );
}
