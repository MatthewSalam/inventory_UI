import axios from "axios";

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    timeout: 10000
});

api.interceptors.response.use(
    (r) => r,
    (err) => {
        console.error('API error:', err.response?.data || err.message);
        return Promise.reject(err);
    }
)


// JWT attachment
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;  // note 'Bearer '
  }
  return config;
});


//Protexting routes
api.interceptors.response.use(
  (response) => response,                  
  (error) => {
    if (error.response?.status === 401) {  
      console.error(error)
      localStorage.removeItem('token');     
      window.location.href = '/login';     
    }
    return Promise.reject(error);         
  }
);

export default api