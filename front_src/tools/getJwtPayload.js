import base64url from "base64url";

export default function () {
  const token = localStorage.getItem("token");
  return token ? JSON.parse(base64url.decode(token.split(".")[1])) : null;
}
