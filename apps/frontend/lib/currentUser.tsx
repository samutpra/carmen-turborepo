"use client";

export const getTenantId = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("tenant-id") || "";
  }
  return ""; 
};

export const setTenantId = (tenantid: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("tenant-id", tenantid);
  }
};

export const TenantID = typeof window !== "undefined" ? getTenantId() : "";


export const accessToken = ''
