import { User } from "@/model/user";
import { connectDB, cookieSetter, generateToken } from "@/utils/features";
import bcrypt from 'bcrypt';

const handler = async (req, res) => {
    if (req.method == 'GET') {

        cookieSetter(res, null, false);

        res.status(201).json({
            success: true,
            message: 'logged-out Successfully'
        })
    } else {
        res.status(400).json({ success: false, message: 'only POST req allowed' });
    }

}

export default handler;