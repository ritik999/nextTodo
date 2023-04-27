import { Task } from "@/model/task";
import { checkAuth, connectDB } from "@/utils/features";


const handler = async (req, res) => {
    if (req.method == 'POST') {
        await connectDB();

        const {title,description}=req.body;

        if(!title || !description){
            res.status(400).json({success:false,message:'please enter all fields'})
        }

        const user=await checkAuth(req);

        if(!user){
            res.status(401).json({success:false,message:'login first'});
        }

        await Task.create({
            title,
            description,
            user:user._id
        });
        res.json({
            success: true,
            message:'Task Created'
        });
    }else{
        res.status(400).json({
            success:false,
            message:'only POST method is allowed'
        })
    }

}

export default handler;