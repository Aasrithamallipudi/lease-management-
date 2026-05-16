import api from "./api";

export async function getMyPayments() {
  const response = await api.get("/payments/my");
  return response.data || [];
}

export async function createPayment(payload) {
  const response = await api.post("/payments", payload);
  return response.data;
}