import PostMessage from '../models/postMessage.js'


export const getPosts = async (req, res) => {
    try{
        const postMessage = await PostMessage.find();
        res.status(200).json(postMessage)
    }
    catch{
        res.status(404).json({message: error.message})
    }
}

export const createPost = async (req,res)=>{
    const post = req.body;
    const newPost = new PostMessage(post)

    try{
        await newPost.save(201).json(newPost);
        res.status
    }
    catch(error) {
        res.status(409).json({message: error.message})
    }
}