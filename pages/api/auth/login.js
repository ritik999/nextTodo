import { User } from "@/model/user";
import { connectDB, cookieSetter, generateToken } from "@/utils/features";
import bcrypt from 'bcrypt';

const handler = async (req, res) => {
    if (req.method == 'POST') {
        const {email, password } = req.body;

        if (!email && !password) {
            res.status(400).json({ message: 'please enter all fields' });
        }

        await connectDB();
        let user = await User.findOne({ email }).select('+password');

        if (!user) {
            res.status(400).json({ message: 'user does not exist' });
        }

        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            res.status(400).json({success:false,message:'invalid email or password'})
        }

        const token = generateToken(user._id);
        cookieSetter(res, token, true);

        res.status(201).json({
            success: true,
            message: 'logged-in Successfully',
            user
        })
    } else {
        res.status(400).json({ success: false, message: 'only POST req allowed' });
    }

}

export default handler;