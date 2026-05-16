import api from "./api";

export async function getDisputes() {
  const response = await api.get("/disputes");
  return response.data || [];
}

export async function createDispute(payload) {
  const response = await api.post("/disputes", payload);
  return response.data;
}

export async function updateDisputeStatus(id, payload) {
  const response = await api.patch("/disputes/" + id + "/status", payload);
  return response.data;
}