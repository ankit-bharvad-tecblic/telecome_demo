import { CreateUserData, Tenant } from './../types';
import { Credentials } from "../types";
import { api } from "./client";

export const AUTH_SERVICE = "/auth";
const CATALOG_SERVICE = "/catalog";

// Auth service
export const login = (credentials: Credentials) =>
  api.post(`${AUTH_SERVICE}/login`, credentials);

export const self = () => api.get(`${AUTH_SERVICE}/self`);
export const logout = () => api.post(`${AUTH_SERVICE}/logout`);

// Users
export const getUsers = (queryString: string) => api.get(`/users?${queryString}`)
export const createUser = (data : CreateUserData) => api.post(`/users`, data);
export const updateUser = (data : any) => api.patch(`/users/${data.id}`, data);

// Tenants
export const getTenants = (queryString : any) => api.get(`/tenants?${queryString}`);
export const createTenant = (data : Tenant) => api.post(`/tenants`, data);
export const updateTenant = (data : Tenant) => api.patch(`/tenants/${data.id}`, data);


