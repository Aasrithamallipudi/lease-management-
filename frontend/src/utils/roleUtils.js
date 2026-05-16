export const ROLES = {
  ADMIN: "ADMIN",
  PROPERTY_OWNER: "PROPERTY_OWNER",
  TENANT: "TENANT",
  LEASE_MANAGER: "LEASE_MANAGER",
  DISPUTE_MANAGER: "DISPUTE_MANAGER",
};

export function roleHome(role) {
  if (role === ROLES.ADMIN) return "/admin";
  if (role === ROLES.PROPERTY_OWNER) return "/owner";
  if (role === ROLES.TENANT) return "/tenant";
  if (role === ROLES.LEASE_MANAGER) return "/lease-manager";
  if (role === ROLES.DISPUTE_MANAGER) return "/dispute-manager";
  return "/login";
}