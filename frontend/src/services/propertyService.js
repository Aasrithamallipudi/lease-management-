import api from "./api";

export async function getMyProperties() {
  const response = await api.get("/properties/my");
  return response.data || [];
}

export async function getAvailableProperties() {
  const response = await api.get("/properties");
  return response.data || [];
}

export async function createProperty(payload) {
  const response = await api.post("/properties", payload);
  return response.data;
}

export async function updateProperty(id, payload) {
  const response = await api.put("/properties/" + id, payload);
  return response.data;
}

export async function deleteProperty(id) {
  const response = await api.delete("/properties/" + id);
  return response.data;
}