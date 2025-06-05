import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";

export const Signup = (req: Request, res: Response) => {
    
    const { username , userId , email,  password} = req.body;

    if(!username || !userId || !password || !email){
        res.status(400).json({"msg": "Missing user info"});
    }
    
    const hashedPassword = bcrypt.hash(password,10);

    if(!hashedPassword){
        res.status(404).json({"msg":"Password hashing gone wrong"})
    }

    const newUser = User.create({username,userId,email, hashedPassword});

    if(!newUser){
        res.status(401).json({"msg":"Could not create new User , something wrong with us"})
    }
    

    return res.status(201).json({data:newUser , "msg":" User created successfully"});

}


export const Login = (req: Request , res: Response) => {
     
    const { userId, password } = req.body;

    if(!userId || !password){
        res.status(400).json({"msg":" Invalid Input"})
    }

    const idCheck = User.findById(userId);

    if(!idCheck){
        res.json({"msg":" User doesn't exist with the given userId"})
    }

    const passCheck = bcrypt.compare(password, idCheck.password);

    if(!passCheck){
        res.status(401).json({"msg":" InCorrect password"});
    }


    const token = jwt.sign(idCheck.id);

    if(!token){
        res.status.json({"msg":"something went wrong during jwt token signing "})
    }

    return token;


} 