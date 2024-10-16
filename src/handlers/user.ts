
import prisma from "../db";
import { hashPassword, createJWT, comparePassword } from "../modules/auth";


export const createNewUer = async (req, res, next) => {

  try {
    const user = await prisma.user.create({
      data : {
        username : req.body.username,
        password :await hashPassword(req.body.password)
      }
    })
    const token = createJWT(user);
    res.send({ token })
  } catch (error) {
    error.type = 'input'
    next(error)

  }
}

export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where:  {
      username: req.body.username
    } 
  })

  const isValid = await comparePassword(req.body.password, user.password)

  if (!isValid) {
    res.status(401)
    res.json({message: "nope"})
    return
  }

  const token = createJWT(user)
  res.json({ token })

}

