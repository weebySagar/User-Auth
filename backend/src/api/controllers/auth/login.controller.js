import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import User from "../../../models/user.model.js";

dotenv.config()

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        // user not found
        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ status: 'error', msg: 'Invalid email or password' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        // password doesn't match
        if (!isPasswordValid) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ status: 'error', msg: 'Invalid email or password' })
        }

        // signing with jwt token
        const authToken = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        const modifiedUser = {
            id: user._id,
            name: user.name,
            email: user.email
        }


        return res.status(StatusCodes.OK).json({ status: 'success', msg: 'User login successfull', token: authToken, user: modifiedUser })

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'error', msg: `Internal server error : ${error.message}` })
    }
}


export default loginUser;