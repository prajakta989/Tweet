import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/libs/prismadb';
import { type } from "os";

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    if(req.method !== 'POST' && req.method !== 'DELETE'){
        return res.status(405).end();
    }
    try{
        const {postId}= req.body;
        const {currentUser} = await serverAuth(req, res);
        if(!postId || typeof postId !== 'string'){
            throw new Error("Invalid Id");
        }
        
        const post = await prisma.post.findUnique({
            where:{
                id:postId
            }
        })

        if(!post){
            throw new Error('Invalid Id');
        }

        let updatedLikedIds = [...(post.likedIds || [])];
        if(req.method === 'POST'){
            updatedLikedIds.push(currentUser.id)
            try{
                const post = await prisma.post.findUnique({
                    where:{
                        id:postId
                    }
                })
                if(post?.userId){
                    await prisma.notification.create({
                        data:{
                            body:"Someone Liked Your Post",
                            userId:post.userId
                        }
                    })
                    await prisma.user.update({
                        where:{
                            id: post.userId
                        },
                        data:{
                            notofication:true
                        }
                    })
                }
            }
            catch(err){
                console.log(err);
                
            }
        }

        if(req.method === 'DELETE'){
            updatedLikedIds  =updatedLikedIds.filter((likedid) => likedid !== currentUser.id) 
        }

        const updatedPost = await prisma.post.update({
            where:{
                id: postId
            },
            data:{
                likedIds: updatedLikedIds
            }
        })
        return res.status(200).json(updatedPost);
    }
    catch(err){
        console.log(err);
        return res.status(400).end();   
    }
}