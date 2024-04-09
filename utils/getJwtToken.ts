import tokenKey from "@/constants/token";

const getJwtToken = () => {
  const token = sessionStorage.getItem(tokenKey);

  if (!token) {
    return null;
  }

  return token;
};

export default getJwtToken;
