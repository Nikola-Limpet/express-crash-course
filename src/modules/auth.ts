import jwt from 'jsonwebtoken';


export const createJWT = (user) => {
  const token = jwt.sign({id: user.id, username: user.username},
    process.env.JWT_SECRET,
    {expiresIn: '1d'}
  ) // 1 day  
  return token
}

export const protect = (req, res) =>{
  const bearer = req.headers.authorization;
   // Bearer token is basically a token that is sent in the header of the request

   if(!bearer) {
     res.status(401)
     res.json({msg : 'Not authorized'})
     return 
   }

   const [,token] = bearer.split(' ')
   
   if (!token) {
     res.status(401)
     res.json({msg : 'Not valid token'})
     return 
   }
}