import { createContext, useState } from "react"

// Create a global authentication context.
export const AuthContext = createContext()

// AuthProvider manages authentication state and provides it to the app.
export const AuthProvider = ({children}) => {

    // Initialize authentication state based on whether an access token exists.
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem('accessToken')
    )

    // Store tokens and mark user as authenticated.
    const login = (accessToken, refreshToken) => {
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        setIsAuthenticated(true)
    }

    // Clear stored data and mark user as unauthenticated.
    const logout = () => {
        localStorage.clear()
        setIsAuthenticated(false)
    }

    // Provide authentication state and functions to child components.
    return(
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}