import { Task } from "@/model/task";
import { checkAuth, connectDB } from "@/utils/features";


const handler = async (req, res) => {
    await connectDB();
    
    const user=await checkAuth(req);
    
    if(!user){
        res.status(401).json({success:false,message:'login first'});
    }
    
    const taskId=req.query.id;
    
    const task= await Task.findById(taskId);
    
    if (req.method == 'PUT') {
       if(!task){
        res.status(404).json({success:false,message:'Task not found'});
       }

       task.isCompleted=!task.isCompleted;
       await task.save();

        res.json({
            success: true,
            message:'task updated successfully'
        });
    }else if(req.method=='DELETE'){
        await task.deleteOne();
        res.status(200).json({success:true,message:'task deleted successfully'})
    }
    else{
        res.status(400).json({
            success:false,
            message:'only POST method is allowed'
        })
    }

}

export default handler;