import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const useAuth = () => {
  const token = Cookies.get("token");
  let auth = false;
  if (token) {
    auth = jwt_decode(token);
  }
  return { auth };
};

export default useAuth;
