import jwt from 'jsonwebtoken';

export const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as "Bearer <token>"
    if (!token) {
        console.log("No token provided");
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token
        console.log("Decoded user ID:", decoded.id);
        req.user = { id: decoded.id }; // Attach user info to the request
        next(); // Move to the next middleware
    } catch (error) {
        console.error("JWT verification failed:", error);
        res.status(401).json({ message: 'Unauthorized' });
    }
};
