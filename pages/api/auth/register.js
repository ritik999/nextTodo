import { User } from "@/model/user";
import { connectDB, cookieSetter, generateToken } from "@/utils/features";
import bcrypt from 'bcrypt';

const handler = async (req, res) => {
    if (req.method == 'POST') {
        const { name, email, password } = req.body;

        if (!name && !email && !password) {
            res.status(400).json({ message: 'please enter all fields' });
        }

        await connectDB();
        let user = await User.findOne({ email });

        if (user) {
            res.status(400).json({ message: 'user already registered' });
        }

        const hashedPassword=await bcrypt.hash(password,10);

        user = await User.create({
            name,
            email,
            password:hashedPassword
        })

        const token = generateToken(user._id);
        cookieSetter(res, token, true);

        res.status(201).json({
            success: true,
            message: 'Registered Successfully',
            user
        })
    } else {
        res.status(400).json({ success: false, message: 'only POST req allowed' });
    }

}

export default handler;