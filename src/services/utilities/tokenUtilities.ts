export function base64Decode(str: string): string {
    return atob(str);
}

export function decodeJWT(token: string): any {
  const [header, payload, signature] = token?.split(".");
  const decodedPayload = base64Decode(payload);
  return JSON.parse(decodedPayload);
}


export const isAuthenticated = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken !== null;
};

export const getUserIdFromToken = () : string =>{
  const accessToken = localStorage.getItem("accessToken");
  if(!accessToken) return null;
  const decodedToken = decodeJWT(accessToken);
  return decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
}

export const getFullNameFromToken = () : string =>{
  const accessToken = localStorage.getItem("accessToken");
  if(!accessToken) return null;
  const decodedToken = decodeJWT(accessToken);
  return decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
}

export const logout = () => {
  localStorage.removeItem("accessToken")
}