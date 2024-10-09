import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export const comparePassword = (password, hash) => {
  const match =  bcrypt.compare(password, hash);
  return match
}

export const hashPassword = (password) => { 
  const hash =  bcrypt.hash(password, 10);
  // salt rounds is 10. it uses 2^10 rounds of hashing to hash the password
  return hash
}


export const createJWT = (user) => {
  const token = jwt.sign({id: user.id, username: user.username},
    process.env.JWT_SECRET,
    // {expiresIn: '1d'}
  ) // 1 day  
  return token
}

export const protect = (req, res, next) =>{
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


   try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = user;
    next()
    
   } catch (error) {
      console.log(error)
      res.status(401)
      res.json({msg : 'not valid token'})
      return  
   }
}