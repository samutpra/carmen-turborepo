import { API_URL } from "@/lib/api-url"

export const fetchClusterRoles = async () => {
    const response = await fetch(`${API_URL}/api/user/role/cluster`);
    return response.json();
}

export const fetchDepartmentRoles = async () => {
    const response = await fetch(`${API_URL}/api/user/role/department`);
    return response.json();
}

export const fetchPlatformRoles = async () => {
    const response = await fetch(`${API_URL}/api/user/role/platform`);
    return response.json();
}