const jwt = require('jsonwebtoken')

// Middleware function to authenticate a user using a JWT
const authenticateToken = (req, res, next) => {

    // Get the Authorization header from the incoming request
    // Example of header format:
    // Authorization: Bearer <token>
    const authHeader = req.headers['authorization']

    // Extract the token from the header
    // If authHeader exists, split it by space and take the second part (the actual token)
    // If authHeader is undefined, token will also be undefined
    const token = authHeader && authHeader.split(' ')[1]

    // If no token is provided, return HTTP 401 (Unauthorized)
    // This means the client did not send authentication credentials
    if (!token) return res.sendStatus(401)

    // Verify the token using the secret key stored in environment variables
    // ACCESS_TOKEN_SECRET should match the secret used when the token was created
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

        // If verification fails (invalid or expired token),
        // return HTTP 403 (Forbidden)
        if (err) return res.sendStatus(403)

        // If token is valid, attach the decoded user payload to the request object
        // This allows other routes/middleware to access user information
        req.user = user

        // Call next() to pass control to the next middleware or route handler
        next()
    })
}

// Export the middleware function so it can be used in other files
module.exports = authenticateToken