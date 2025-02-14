import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = process.env.REACT_APP_BASE_URL;
const api = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const token = Cookies.get('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If access token expired, attempt to refresh
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshResponse = await axios.post(`${baseURL}/api/auth/refresh`, {}, { withCredentials: true });

                if (refreshResponse.status === 200) {
                    const { accessToken } = refreshResponse.data;
                    Cookies.set('accessToken', accessToken, { expires: 1 / 24, secure: false, sameSite: 'Strict' });

                    // Update header and retry original request
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    return axios(originalRequest);
                }
            } catch (refreshError) {
                console.error('Refresh token failed:', refreshError);
                window.location.href = '/sign-in'; // Redirect to login page
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
