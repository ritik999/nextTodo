import { User } from "@/model/user";
import { checkAuth, connectDB, cookieSetter, generateToken } from "@/utils/features";
import bcrypt from 'bcrypt';

const handler = async (req, res) => {
    if (req.method == 'GET') {
        
        const user=await checkAuth(req);
        if(!user){
            res.status(401).json({success:false,message:'login first'});
        }

        res.status(201).json({
            success: true,
            message: 'user found',
            user
        })
    } else {
        res.status(400).json({ success: false, message: 'only POST req allowed' });
    }

}

export default handler;