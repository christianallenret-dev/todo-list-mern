import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8000/api'
})

// REQUEST INTERCEPTOR
// This runs BEFORE every request. It attaches the access token to protected routes.
instance.interceptors.request.use((config) => {

    // Get access token from localStorage
    const token = localStorage.getItem('accessToken')

    // If token exists, attach it to request headers
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

// RESPONSE INTERCEPTOR
// If access token expires (403), automatically try to refresh it.
instance.interceptors.response.use(

    // If response is successful (2xx), just return it normally
    response => response,

    // Store the original request configuration. May be needed to retry this request later
    async error => {
        const originalRequest = error.config

        // Check:
        // 1. If server returned 403 (token expired / invalid)
        // 2. If we haven't already retried this request
        if (error.response?.status === 403 && !originalRequest._retry) {

            // Mark this request as retried. This prevents infinite refresh loops
            originalRequest._retry = true

            try {
                // Get refresh token from localStorage
                const refreshToken = localStorage.getItem('refreshToken')

                // Send refresh token to backend to get a new access token
                // This should hit your refresh endpoint
                const res = await axios.post(
                    'http://localhost:8000/api/auth/token',
                    {token: refreshToken}
                )

                // Save the new access token in localStorage
                localStorage.setItem('accessToken', res.data.accessToken)

                // Update the Authorization header of the original request
                originalRequest.headers.Authorization =
                    `Bearer ${res.data.accessToken}`

                // Retry the original request with new token
                return instance(originalRequest)
            } catch(err) {
                // If refresh fails (refresh token expired or invalid):
                // 1. Clear all stored auth data
                // 2. Redirect user to login page
                localStorage.clear()
                window.location.href = '/login'
            }
        }

        // If error is not 403 OR retry already attempted,
        // reject the promise normally
        return Promise.reject(error)
    }
)

export default instance