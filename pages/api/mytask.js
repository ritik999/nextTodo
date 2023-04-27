import { Task } from "@/model/task";
import { checkAuth, connectDB } from "@/utils/features";


const handler = async (req, res) => {
    if (req.method == 'GET') {
        await connectDB();

        const user=await checkAuth(req);

        if(!user){
            res.status(401).json({success:false,message:'login first'});
        }

       const task= await Task.find({user:user._id})
        res.json({
            success: true,
            task
        });
    }else{
        res.status(400).json({
            success:false,
            message:'only POST method is allowed'
        })
    }

}

export default handler;