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


export const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA0MzhmZjQ0LTc1NGYtNDJiZC05NWI1LTUzYWFlMjBkZWMzZSIsInVzZXJuYW1lIjoidGVzdDEiLCJpYXQiOjE3MzA3ODY1NTQsImV4cCI6MTczMDc5MDE1NH0.BrQKRYK6Z4LQzSarSf1iSdfSuhk5iviTAnBnX6q_POQ'


