import api from "./api";

export async function createLeaseRequest(payload) {
  const response = await api.post("/leases/request", payload);
  return response.data;
}

export async function getLeases() {
  const response = await api.get("/leases");
  return response.data || [];
}

export async function updateLeaseStatus(id, payload) {
  const response = await api.patch("/leases/" + id + "/status", payload);
  return response.data;
}