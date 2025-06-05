import { Request, Response } from "express";
import Post from "../models/post.model";

export const createPost = (req: Request,res: Response) => {
    const userId = req.id;
    const { content , imageUrl } = req.body;

    if(!content && !imageUrl){
        res.status(401).json({"msg":"Empty post"})
    }

    if(content && imageUrl){
        const newPost = Post.create({content,userId,imageUrl});

        if(!newPost){
            res.status(401).json({"msg":" could not create post"})
        }

        return res.status(201).json({data: newPost, "msg": "Post created sucessfully"});
    }

    else if(imageUrl){
        const newPost = Post.create({imageUrl,userId});

        if(!newPost){
            res.status(401).json({"msg":" could not create post"})
        }

        return res.status(201).json({data: newPost, "msg": "Post created sucessfully"});
    }

    else{
        const newPost = Post.create({content,userId});

        if(!newPost){
            res.status(401).json({"msg":" could not create post"})
        }

        return res.status(201).json({data: newPost, "msg": "Post created sucessfully"});
    }
}

export const deletePost = (req: Request, res: Response) => {

}

export const getAllPost = (req: Request, res: Response) => {

}

export const getPost = (req: Request, res: Response) => {

}

export const updatePost = (req: Request, res: Response) => {

}