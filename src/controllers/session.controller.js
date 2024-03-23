import bcrypt from "bcrypt";
import { expressjwt } from "express-jwt";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import { createUser, getUserByEmail } from "./users.controller.js";

export const authMiddleware = expressjwt({
    algorithms: ["HS256"],
    credentialsRequired: false,
    secret: process.env.JWT_SECRET,
});
  
export async function handleLogin(req, res) {
    const { email, password } = req.body;
    
    const user = await getUserByEmail(email)
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
  
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
  
      if (!result) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
  
      const claims = { sub: user.id, email: user.email };
      const token = jwt.sign(claims, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      return res.status(200).json({ token });
    });
}
  
export async function handleSignup(req, res) {
    const { name, email, password } = req.body;
    const saltRounds = 10;
  
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
     
      try {
        const response = await createUser({ name, email, password: hash })
        return res.status(200).json(response);
      } catch {
        return res.status(500).json({ error: "Error: User not created" });
      }
    })
}