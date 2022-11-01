import axios from 'axios'
import store from '../../redux/Store'
const axiosApiInstance = axios.create({});

console.log(store)
// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
    async config => {
        config.headers = {
            'Authorization': `Bearer ${store.getState()?.counter?.token}`,
           // 'Authorization': `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJjbGllbnRpZCI6Im1hc2hyZXEiLCJuYmYiOjE2NTUxMTk2NzMsImV4cCI6MTY1NTEyMzI3M30`,
            'Content-Type': 'application/json'
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use((response) => {
    return response
}, async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + 'token';
        return axiosApiInstance(originalRequest);
    }
    return Promise.reject(error);
});

export default axiosApiInstance