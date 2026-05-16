import api from "./api";

function normalizeAuthResponse(data, fallbackEmail) {
  const token = data?.token || data?.jwt || null;
  const user = data?.user || {
    id: data?.id || null,
    email: data?.email || fallbackEmail || "",
    role: data?.role || "TENANT",
    fullName: data?.fullName || data?.name || "",
  };

  if (!token) throw new Error("Token missing in login response");
  return { token, user };
}

export async function loginUser(payload) {
  const response = await api.post("/auth/login", payload);
  return normalizeAuthResponse(response.data, payload.email);
}

export async function signupUser(payload) {
  const response = await api.post("/auth/signup", payload);
  return normalizeAuthResponse(response.data, payload.email);
}