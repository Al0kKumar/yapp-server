import { Request, Response } from "express"
import Comment from "../models/comment.model"

export const createComment = (req: Request, res: Response) => {
   
    const { content, imageUrl } = req.body;

    const userId = req.id;

    const postId = req.params.postId;

    if(!content && !imageUrl){
        res.status(401).json({"msg":" Empty comment"})
    }


    if(content && imageUrl){
        
        const newComment = Comment.create({content,imageUrl,postId, userId});

        if(!newComment){
            res.status(403).json({"msg":"something went wrong during comment creation"})
        }

        return res.status(201).json({data: newComment, "msg":"Comment created sucessfully"})
    }

    else if(content){
        const newComment = Comment.create({content,postId, userId});

        if(!newComment){
            res.status(403).json({"msg":"something went wrong during comment creation"})
        }

        return res.status(201).json({data: newComment, "msg":"Comment created sucessfully"})
    }
    else{
        const newComment = Comment.create({imageUrl,postId, userId});

        if(!newComment){
            res.status(403).json({"msg":"something went wrong during comment creation"})
        }

        return res.status(201).json({data: newComment, "msg":"Comment created sucessfully"})
    }
}


export const getAllComment = (req: Request, res: Response) => {

}

export const getComment = (req: Request, res: Response) => {

}

export const updateComment = (req: Request, res: Response) => {

}


export const deleteComment = async (req: Request, res: Response) => {
     
    const postId = req.params.postId;

    const commentId = req.params.commentId;

    const userId = req.id ;

    const comment = await Comment.findOne({
        commentId: commentId
    })

    if(!comment){
        res.status(401).json({"msg":" Comment doesn't exist"})
    }

    await Comment.deleteOne({
        commentId: commentId
    })



    return res.status(200).json({"msg":"comment deleted successfully"})
}