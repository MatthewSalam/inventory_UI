import api from "./axiosInstance";

export const registerStaff = (payload) => api.post('/staff/register', payload);
export const staffLogin = (payload) => {
  const form = new URLSearchParams();
  form.append('username', payload.username);
  form.append('password', payload.password);

  return api.post('/auth/login', form);   // Axios auto‑sets correct headers
};

export const createCategory = (payload) => {api.post('/categories/', payload)}
export const createRole = (payload) => {api.post('/roles/', payload)}
export const createProduct = (payload) => {api.post('products/', payload)}
export const createSupplier = (payload) => {api.post('/suppliers/', payload)}
export const createUser = (payload) => {api.post('/users/', payload)}
export const createOrderDetail = (payload) => {api.post('/orderdetails/', payload)}