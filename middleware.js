const jwt=require('jsonwebtoken');
const JWT_SECRET = "so what's your secret";

module.exports={
    auth:(req,res,next)=>{
        const authheader=req.headers.authorization;
        if(!authheader)
        {
            return res.status(403).json({msg:"Please Login to Submit the code"})
        
        }
        try {
            // Extract the token from the Authorization header
            const token = authheader;
        
            // Verify the token
            const decoded = jwt.verify(token, JWT_SECRET );
            // Attach the decoded payload to the request object
            req.user = decoded;
        
            // Move to the next middleware
            next();
          } catch (error) {
            return res.status(401).json({ error: 'Invalid token' });
          }
    }
}